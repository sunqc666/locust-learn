import { AnyAction, combineReducers } from 'redux';
import { CleanUp, cleanUpAction } from '../actions/cleanUp';
import sharedReducers from 'app/core/reducers';
import alertingReducers from 'grafana-7.3.6/public/app/features/alerting/state/reducers';
import teamsReducers from 'grafana-7.3.6/public/app/features/teams/state/reducers';
import apiKeysReducers from 'grafana-7.3.6/public/app/features/api-keys/state/reducers';
import foldersReducers from 'grafana-7.3.6/public/app/features/folders/state/reducers';
import dashboardReducers from 'grafana-7.3.6/public/app/features/dashboard/state/reducers';
import exploreReducers from 'grafana-7.3.6/public/app/features/explore/state/reducers';
import pluginReducers from 'grafana-7.3.6/public/app/features/plugins/state/reducers';
import dataSourcesReducers from 'grafana-7.3.6/public/app/features/datasources/state/reducers';
import usersReducers from 'grafana-7.3.6/public/app/features/users/state/reducers';
import userReducers from 'grafana-7.3.6/public/app/features/profile/state/reducers';
import organizationReducers from 'grafana-7.3.6/public/app/features/org/state/reducers';
import ldapReducers from 'grafana-7.3.6/public/app/features/admin/state/reducers';
import templatingReducers from 'grafana-7.3.6/public/app/features/variables/state/reducers';
import importDashboardReducers from 'grafana-7.3.6/public/app/features/manage-dashboards/state/reducers';

const rootReducers = {
  ...sharedReducers,
  ...alertingReducers,
  ...teamsReducers,
  ...apiKeysReducers,
  ...foldersReducers,
  ...dashboardReducers,
  ...exploreReducers,
  ...pluginReducers,
  ...dataSourcesReducers,
  ...usersReducers,
  ...userReducers,
  ...organizationReducers,
  ...ldapReducers,
  ...templatingReducers,
  ...importDashboardReducers,
};

const addedReducers = {};

export const addReducer = (newReducers: any) => {
  Object.assign(addedReducers, newReducers);
};

export const createRootReducer = () => {
  const appReducer = combineReducers({
    ...rootReducers,
    ...addedReducers,
  });

  return (state: any, action: AnyAction): any => {
    if (action.type !== cleanUpAction.type) {
      return appReducer(state, action);
    }

    const { stateSelector } = action.payload as CleanUp<any>;
    const stateSlice = stateSelector(state);
    recursiveCleanState(state, stateSlice);

    return appReducer(state, action);
  };
};

export const recursiveCleanState = (state: any, stateSlice: any): boolean => {
  for (const stateKey in state) {
    if (!state.hasOwnProperty(stateKey)) {
      continue;
    }

    const slice = state[stateKey];
    if (slice === stateSlice) {
      state[stateKey] = undefined;
      return true;
    }

    if (typeof slice === 'object') {
      const cleaned = recursiveCleanState(slice, stateSlice);
      if (cleaned) {
        return true;
      }
    }
  }

  return false;
};
