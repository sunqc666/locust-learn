import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SlideDown } from 'grafana-7.3.6/public/app/core/components/Animations/SlideDown';
import EmptyListCTA from 'grafana-7.3.6/public/app/core/components/EmptyListCTA/EmptyListCTA';
import { AddDataSourcePermissions, State as AddState } from './AddDataSourcePermissions';
import { DataSourcePermissionsList } from './DataSourcePermissionsList';
import { AclTarget } from 'grafana-7.3.6/public/app/types/acl';
import { loadDataSource } from 'grafana-7.3.6/public/app/features/datasources/state/actions';
import {
  addDataSourcePermission,
  disableDataSourcePermissions,
  enableDataSourcePermissions,
  loadDataSourcePermissions,
  removeDataSourcePermission,
} from './state/actions';
import { EnterpriseStoreState } from '../types';
import { NavModel } from '@grafana/data';
import { getRouteParamsId } from 'grafana-7.3.6/public/app/core/selectors/location';
import PageHeader from 'grafana-7.3.6/public/app/core/components/PageHeader/PageHeader';
import { getNavModel } from 'grafana-7.3.6/public/app/core/selectors/navModel';
import { getDataSourceLoadingNav } from 'grafana-7.3.6/public/app/features/datasources/state/navModel';
import { DataSourcePermission } from '../types';
import { InfoBox } from '@grafana/ui';

export interface Props {
  navModel: NavModel;
  permissions: DataSourcePermission[];
  enabled: boolean;
  isDefault: boolean;
  pageId: number;
  addDataSourcePermission: typeof addDataSourcePermission;
  enableDataSourcePermissions: typeof enableDataSourcePermissions;
  disableDataSourcePermissions: typeof disableDataSourcePermissions;
  loadDataSourcePermissions: typeof loadDataSourcePermissions;
  loadDataSource: typeof loadDataSource;
  removeDataSourcePermission: typeof removeDataSourcePermission;
}

interface State {
  isAdding: boolean;
}

export class DataSourcePermissions extends PureComponent<Props, State> {
  state: State = {
    isAdding: false,
  };

  componentDidMount() {
    this.fetchDataSource();
    this.fetchDataSourcePermissions();
  }

  async fetchDataSourcePermissions() {
    const { pageId, loadDataSourcePermissions } = this.props;

    return await loadDataSourcePermissions(pageId);
  }

  async fetchDataSource() {
    const { pageId, loadDataSource } = this.props;

    return await loadDataSource(pageId);
  }

  onOpenAddPermissions = () => {
    this.setState({
      isAdding: true,
    });
  };

  onEnablePermissions = () => {
    const { pageId, enableDataSourcePermissions } = this.props;
    enableDataSourcePermissions(pageId);
  };

  onDisablePermissions = () => {
    const { pageId, disableDataSourcePermissions } = this.props;

    disableDataSourcePermissions(pageId);
  };

  onAddPermission = (state: AddState) => {
    const { pageId, addDataSourcePermission } = this.props;
    const data = {
      permission: state.permission,
    };

    if (state.type === AclTarget.Team) {
      addDataSourcePermission(pageId, Object.assign(data, { teamId: state.teamId }));
    } else if (state.type === AclTarget.User) {
      addDataSourcePermission(pageId, Object.assign(data, { userId: state.userId }));
    }
  };

  onRemovePermission = (item: DataSourcePermission) => {
    this.props.removeDataSourcePermission(item.datasourceId, item.id);
  };

  onCancelAddPermission = () => {
    this.setState({
      isAdding: false,
    });
  };

  render() {
    const { permissions, enabled, navModel, isDefault } = this.props;
    const { isAdding } = this.state;
    const isPermissionsEnabled = enabled;

    return (
      <div>
        <PageHeader model={navModel} />
        <div className="page-container page-body">
          <div className="page-action-bar">
            <h3 className="page-sub-heading">Permissions</h3>
            <div className="page-action-bar__spacer" />
            {isPermissionsEnabled && [
              <button
                key="add-permission"
                className="btn btn-success pull-right"
                onClick={this.onOpenAddPermissions}
                disabled={isAdding}
              >
                Add Permission
              </button>,
              <button
                key="disable-permissions"
                className="btn btn-danger pull-right"
                onClick={this.onDisablePermissions}
              >
                Disable Permissions
              </button>,
            ]}
          </div>
          {isDefault && (
            <InfoBox title="Warning!">
              <p>
                Enabling permissions on the default data source makes it unavailable for users not listed in the
                permissions. Panels using default data source will return an error for that users.
              </p>
            </InfoBox>
          )}
          {!isPermissionsEnabled ? (
            <EmptyListCTA
              title="Permissions not enabled for this data source."
              buttonTitle="Enable"
              buttonIcon="unlock"
              onClick={this.onEnablePermissions}
              proTip="Only admins will be able to query the data source after you enable permissions."
              proTipLink="http://docs.grafana.org/permissions/datasource_permissions/"
              proTipLinkTitle="Learn more"
            />
          ) : (
            <div>
              <SlideDown in={isAdding}>
                <AddDataSourcePermissions
                  onAddPermission={state => this.onAddPermission(state)}
                  onCancel={this.onCancelAddPermission}
                />
              </SlideDown>
              <DataSourcePermissionsList items={permissions} onRemoveItem={item => this.onRemovePermission(item)} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: EnterpriseStoreState) {
  const dataSourceId = getRouteParamsId(state.location);
  const dataSourceLoadingNav = getDataSourceLoadingNav('permissions');

  return {
    navModel: getNavModel(state.navIndex, `datasource-permissions-${dataSourceId}`, dataSourceLoadingNav),
    pageId: getRouteParamsId(state.location),
    permissions: state.dataSourcePermission.permissions,
    enabled: state.dataSourcePermission.enabled,
    isDefault: state.dataSources.dataSource.isDefault,
  };
}

const mapDispatchToProps = {
  addDataSourcePermission,
  enableDataSourcePermissions,
  disableDataSourcePermissions,
  loadDataSourcePermissions,
  loadDataSource,
  removeDataSourcePermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSourcePermissions);
