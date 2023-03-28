import React, { FC } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { DashNavButton } from 'grafana-7.3.6/public/app/features/dashboard/components/DashNav/DashNavButton';
import { addCustomRightAction } from 'grafana-7.3.6/public/app/features/dashboard/components/DashNav/DashNav';
import { DashboardModel } from 'app/features/dashboard/state';
import { EnterpriseStoreState } from '../../types';
import { setDrawerOpen } from '../state/reducers';
import AnalyticsDrawer from './AnalyticsDrawer';

interface Props {
  dashboard: DashboardModel;
  isDrawerOpen: boolean;
  setDrawerOpen: typeof setDrawerOpen;
}

const getStyles = stylesFactory(() => ({
  analyticsButton: css`
    padding-left: 10px;
  `,
}));

export const AnalyticsContent: FC<Props> = ({ dashboard, isDrawerOpen, setDrawerOpen }) => {
  const styles = getStyles();

  return (
    dashboard?.id && (
      <>
        <span className={styles.analyticsButton}>
          <DashNavButton
            classSuffix="info-circle"
            tooltip="Dashboard insights"
            icon="info-circle"
            onClick={() => {
              setDrawerOpen(true);
            }}
          />
        </span>
        {isDrawerOpen && <AnalyticsDrawer dashboard={dashboard} />}
      </>
    )
  );
};

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    isDrawerOpen: state.metaAnalytics.isDrawerOpen,
  };
}

const mapDispatchToProps = {
  setDrawerOpen,
};

export const initAnalyticsDrawer = () => {
  addCustomRightAction({
    show: () => true,
    component: connect(mapStateToProps, mapDispatchToProps)(AnalyticsContent),
    index: -1,
  });
};
