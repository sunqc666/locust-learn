import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Themeable, withTheme } from '@grafana/ui';
import { FieldType } from '@grafana/data';
import { DashboardModel } from 'app/features/dashboard/state';
import { AnalyticsTab } from './AnalyticsTab';
import { DashboardDailySummaryDTO } from '../api';

export interface Props extends Themeable {
  dashboard: DashboardModel;
  dailySummaries: DashboardDailySummaryDTO[];
}

class AnalyticsStatsTab extends AnalyticsTab<Props> {
  render() {
    const { dailySummaries, theme } = this.props;

    if (dailySummaries && dailySummaries.length > 0) {
      const timeRange = this.buildTimeRange();

      return (
        <AutoSizer disableHeight>
          {({ width }) => {
            if (width === 0) {
              return null;
            }

            return (
              <main style={{ width }}>
                {this.renderChart({
                  title: 'Daily query count',
                  valueField: 'queries',
                  fieldType: FieldType.number,
                  width,
                  timeRange,
                  color: '',
                  showBars: true,
                  showLines: false,
                })}
                {this.renderChart({
                  title: 'Errors last 30 days',
                  valueField: 'errors',
                  fieldType: FieldType.number,
                  width,
                  timeRange,
                  color: theme.palette.queryRed,
                  showBars: false,
                  showLines: true,
                })}
              </main>
            );
          }}
        </AutoSizer>
      );
    }

    return <span>No data.</span>;
  }
}

export default withTheme(AnalyticsStatsTab);
