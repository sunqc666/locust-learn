import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { NavModel } from '@grafana/data';
import Page from 'grafana-7.3.6/public/app/core/components/Page/Page';
import EmptyListCTA from 'grafana-7.3.6/public/app/core/components/EmptyListCTA/EmptyListCTA';
import { ReportList } from './ReportsList';
import { NoRenderingInfoBox } from './NoRenderingInfoBox';
import { getNavModel } from 'grafana-7.3.6/public/app/core/selectors/navModel';
import { getReports, deleteReport } from './state/actions';
import { EnterpriseStoreState, Report } from '../types';
import config from 'grafana-7.3.6/public/app/core/config';
import { LinkButton } from '@grafana/ui';
import { isExpired } from '../utils';
import { UnavailableFeatureInfoBox } from './UnavailableFeatureInfoBox';

export interface Props {
  navModel: NavModel;
  reports: Report[];
  searchQuery: string;
  reportCount: number;
  hasFetched: boolean;

  getReports: typeof getReports;
  deleteReport: typeof deleteReport;
}

export class ReportsListPage extends PureComponent<Props> {
  componentDidMount(): void {
    this.props.getReports();
  }

  deleteReport = (report: Report) => {
    this.props.deleteReport(report.id);
  };

  renderList() {
    const { reports, reportCount } = this.props;
    const { rendererAvailable } = config;

    if (isExpired()) {
      return (
        <>
          <UnavailableFeatureInfoBox
            message="Creating new reports is not available with an expired license.
              Existing reports continue to be processed but you need to update your license to create a new one."
          />
          {reportCount > 0 && <ReportList reports={reports} deleteReport={this.deleteReport} />}
        </>
      );
    }

    return (
      <>
        {!rendererAvailable && <NoRenderingInfoBox variant="error" />}
        {reportCount > 0 ? (
          <>
            <div className="page-action-bar">
              <div className="gf-form gf-form--grow">
                <div className="page-action-bar__spacer" />
                <LinkButton variant="primary" href="reports/new" disabled={!rendererAvailable}>
                  New report
                </LinkButton>
              </div>
            </div>
            <ReportList reports={reports} deleteReport={this.deleteReport} />
          </>
        ) : (
          rendererAvailable && (
            <EmptyListCTA
              title="You haven't created any reports yet."
              buttonIcon="envelope"
              buttonLink="reports/new"
              buttonTitle=" New report"
              proTip=""
              proTipLink=""
              proTipLinkTitle=""
              proTipTarget="_blank"
            />
          )
        )}
      </>
    );
  }

  render() {
    const { hasFetched, navModel } = this.props;

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={!hasFetched}>{this.renderList()}</Page.Contents>
      </Page>
    );
  }
}

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    navModel: getNavModel(state.navIndex, 'reports-list'),
    reports: state.reports.reports,
    hasFetched: state.reports.hasFetchedList,
    searchQuery: state.reports.searchQuery,
    reportCount: state.reports.reportCount,
  };
}

const mapDispatchToProps = {
  getReports,
  deleteReport,
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(ReportsListPage));
