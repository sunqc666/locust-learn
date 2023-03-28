import React, { PureComponent } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { css } from 'emotion';
import { GrafanaTheme, NavModel, SelectableValue, TimeRange, urlUtil } from '@grafana/data';
import {
  Button,
  LinkButton,
  Input,
  TextArea,
  Form,
  Field,
  InputControl,
  ModalsController,
  Legend,
  FieldSet,
  stylesFactory,
  withTheme,
  HorizontalGroup,
  Themeable,
  TimeRangeInput,
} from '@grafana/ui';

import { DashboardPicker } from 'grafana-7.3.6/public/app/core/components/Select/DashboardPicker';
import Page from 'grafana-7.3.6/public/app/core/components/Page/Page';
import { getRouteParamsId } from 'grafana-7.3.6/public/app/core/selectors/location';
import { getNavModel } from 'grafana-7.3.6/public/app/core/selectors/navModel';
import { config } from 'grafana-7.3.6/public/app/core/config';
import { ReportScheduling } from './ReportScheduling';
import { ReportOptionsPicker } from './ReportOptionsPicker';
import { createReport, loadReport, sendTestEmail, updateReport } from './state/actions';
import {
  EnterpriseStoreState,
  ReportOptions,
  ReportDTO,
  Report,
  ReportFormData,
  SchedulingOptions,
  SchedulingData,
} from '../types';
import { validateMultipleEmails } from '../utils/validators';
import { SendTestEmailModal } from './SendTestEmailModal';
import { clearReportState, updateReportProp } from './state/reducers';
import { parseRange, getRange } from '../utils/time';
import { isExpired } from '../utils';

interface OwnProps extends Themeable {}

interface ConnectedProps {
  report: Report;
  navModel: NavModel;
  reportId?: number;
  isLoading: boolean;
}

interface DispatchProps {
  loadReport: typeof loadReport;
  clearReportState: typeof clearReportState;
  updateReport: typeof updateReport;
  createReport: typeof createReport;
  updateReportProp: typeof updateReportProp;
  sendTestEmail: typeof sendTestEmail;
}

export type Props = DispatchProps & ConnectedProps & OwnProps;

/**
 * Move hour and minute from time to schedule
 * @param scheduleData
 */
const getSchedule = (scheduleData = {} as SchedulingData): SchedulingOptions => {
  const { time, ...schedule } = scheduleData;
  return { ...schedule, ...time };
};

export class ReportPage extends PureComponent<Props> {
  componentDidMount() {
    const { loadReport, reportId } = this.props;
    if (reportId) {
      loadReport(reportId);
    }
  }

  componentWillUnmount() {
    this.props.clearReportState();
  }

  onDashboardChange = (dashboard: SelectableValue<number>) => {
    const { report, updateReportProp } = this.props;
    if (dashboard) {
      updateReportProp({
        ...report,
        dashboardId: dashboard.id,
        dashboardName: dashboard.label as string,
      });
    } else {
      updateReportProp({
        ...report,
        dashboardId: 0,
        dashboardName: '',
      });
    }
  };

  onOptionsChange = (options: ReportOptions) => {
    const { report, updateReportProp } = this.props;
    updateReportProp({
      ...report,
      options: { ...report.options, ...options },
    });
  };

  onTimeRangeChange = (timeRange: TimeRange) => {
    const { report, updateReportProp } = this.props;
    updateReportProp({
      ...report,
      options: { ...report.options, timeRange: parseRange(timeRange.raw) },
    });
  };

  /**
   * Get the report data before sending to the api
   * @param formData
   */
  getReportData(formData: ReportFormData): ReportDTO {
    const { report } = this.props;
    const { dashboardId, options } = report;
    const { name, replyTo, recipients, message } = formData;
    const schedule = getSchedule(formData.schedule);
    return {
      name,
      recipients,
      dashboardId: dashboardId!,
      replyTo,
      message,
      schedule,
      options,
    };
  }

  submitForm = (formData: ReportFormData) => {
    const { createReport, updateReport, reportId } = this.props;
    const createOrUpdate = reportId ? updateReport : createReport;
    const reportData = this.getReportData(formData);
    const reportDto: ReportDTO = {
      id: reportId,
      ...reportData,
    };

    createOrUpdate(reportDto);
  };

  sendTestEmail = (formData: ReportFormData) => (email: string, useEmailsFromReport: boolean) => {
    const reportData = this.getReportData(formData);
    const recipients = useEmailsFromReport ? reportData.recipients : email;

    return sendTestEmail({ ...reportData, recipients });
  };

  getPreviewUrl() {
    const { report } = this.props;
    const { name, dashboardId, options } = report;

    if (!dashboardId) {
      return undefined;
    }

    const { from, to } = getRange(options.timeRange).raw;

    const params: any = {
      title: name,
      from: from.valueOf(),
      to: to.valueOf(),
    };

    if (options.orientation) {
      params.orientation = options.orientation;
    }
    if (options.layout) {
      params.layout = options.layout;
    }

    return urlUtil.appendQueryToUrl(`api/reports/render/pdf/${dashboardId}`, urlUtil.toUrlParams(params));
  }

  render() {
    const { navModel, report, reportId, isLoading, theme } = this.props;
    const { message, name, recipients, replyTo, schedule, dashboardId, dashboardName, options } = report;
    const timeRange = getRange(options.timeRange);
    const heading = reportId ? `Edit ${name}` : 'New report';
    const dashboardSelected = (dashboardId ?? 0) > 0;
    const currentDashboard = dashboardSelected ? { value: dashboardId, label: dashboardName } : undefined;
    const previewUrl = this.getPreviewUrl();
    const styles = getStyles(theme);

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={Boolean(isLoading && reportId)}>
          <Legend className={styles.header}>{heading}</Legend>
          <Form onSubmit={this.submitForm} validateOn="onBlur">
            {({ register, errors, control, formState, getValues, watch }) => {
              return (
                <>
                  <Field label="Report name" required invalid={!!errors.name} error="Name is required">
                    <Input
                      type="text"
                      id="name"
                      defaultValue={name}
                      name="name"
                      ref={register({ required: true })}
                      placeholder="System status report"
                    />
                  </Field>
                  <Field label="Source dashboard" required invalid={!!errors.dashboardId} error="Dashboard is required">
                    <InputControl
                      name="dashboardId"
                      control={control}
                      as={DashboardPicker}
                      onSelected={(dashboard: SelectableValue) => {
                        this.onDashboardChange(dashboard);
                        // We need to manually set the form value for the form to trigger validation on change
                        control.setValue('dashboardId', dashboard?.id, true);
                      }}
                      defaultValue={currentDashboard?.value}
                      currentDashboard={currentDashboard}
                      rules={{ required: true }}
                      isClearable
                    />
                  </Field>
                  <Field label="Recipients" required invalid={!!errors.recipients} error={errors.recipients?.message}>
                    <TextArea
                      id="recipients"
                      name="recipients"
                      ref={register({
                        required: 'Recipients are required',
                        validate: val => validateMultipleEmails(val) || 'Invalid email',
                      })}
                      placeholder="name@company.com;another.name@company.com"
                      defaultValue={recipients}
                    />
                  </Field>
                  <Field label="Reply to">
                    <Input
                      id="replyTo"
                      name="replyTo"
                      ref={register}
                      placeholder="your.address@company.com - optional"
                      type="email"
                      defaultValue={replyTo}
                    />
                  </Field>
                  <Field label="Message">
                    <TextArea
                      id="message"
                      name="message"
                      placeholder={message}
                      rows={10}
                      ref={register}
                      defaultValue={message}
                    />
                  </Field>

                  <Field
                    label="Time range"
                    description="Generate report with the data from specified time range. If custom time range is empty the time range from the report's dashboard is used."
                  >
                    <TimeRangeInput value={timeRange} onChange={this.onTimeRangeChange} clearable />
                  </Field>

                  <ReportScheduling control={control} watch={watch} schedulingOptions={schedule} />

                  <FieldSet label="PDF Styling">
                    <ReportOptionsPicker options={options} onChange={this.onOptionsChange} />
                  </FieldSet>

                  <HorizontalGroup spacing="md">
                    <Button type="submit" size="md" variant="primary">
                      Save
                    </Button>

                    <LinkButton
                      href={previewUrl}
                      size="xs"
                      target="_blank"
                      variant="secondary"
                      disabled={!config.rendererAvailable || !formState.isValid || isExpired()}
                    >
                      Preview PDF
                    </LinkButton>
                    <ModalsController>
                      {({ showModal, hideModal }) => (
                        <Button
                          disabled={!formState.isValid || isExpired()}
                          size="xs"
                          variant="secondary"
                          onClick={e => {
                            e.preventDefault();
                            showModal(SendTestEmailModal, {
                              onDismiss: hideModal,
                              onSendTestEmail: this.sendTestEmail(getValues({ nest: true })),
                              emails: getValues().recipients,
                            });
                          }}
                        >
                          Send test email
                        </Button>
                      )}
                    </ModalsController>
                  </HorizontalGroup>
                </>
              );
            }}
          </Form>
        </Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps> = (state: EnterpriseStoreState) => {
  const reportId = getRouteParamsId(state.location) as number;
  return {
    navModel: getNavModel(state.navIndex, 'reports-list'),
    report: state.reports.report,
    isLoading: state.reports.isLoading,
    reportId,
  };
};

const mapActionsToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  updateReport,
  loadReport,
  createReport,
  clearReportState,
  updateReportProp,
  sendTestEmail,
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    header: css`
      font-size: ${theme.typography.heading.h2};
    `,
  };
});

export default connect(mapStateToProps, mapActionsToProps)(withTheme(ReportPage));
