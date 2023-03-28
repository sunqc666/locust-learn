import './dashboard_loaders';
import './ReactContainer';
import { applyRouteRegistrationHandlers } from './registry';
import { contextSrv } from 'grafana-7.3.6/public/app/core/services/context_srv';

// Pages
import LdapPage from 'grafana-7.3.6/public/app/features/admin/ldap/LdapPage';
import UserAdminPage from 'grafana-7.3.6/public/app/features/admin/UserAdminPage';
import { LoginPage } from 'grafana-7.3.6/public/app/core/components/Login/LoginPage';

import config from 'grafana-7.3.6/public/app/core/config';
import { ILocationProvider, route } from 'angular';
// Types
import { DashboardRouteInfo } from 'app/types';
import { SafeDynamicImport } from '../core/components/DynamicImports/SafeDynamicImport';

/** @ngInject */
export function setupAngularRoutes($routeProvider: route.IRouteProvider, $locationProvider: ILocationProvider) {
  $locationProvider.html5Mode(true);

  // Routes here are guarded both here and server side for react-container routes or just on the server for angular
  // ones. That means angular ones could be navigated to in case there is a client side link some where.

  const importDashboardPage = () =>
    SafeDynamicImport(import(/* webpackChunkName: "DashboardPage" */ '../features/dashboard/containers/DashboardPage'));

  $routeProvider
    .when('/', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'page-dashboard',
      routeInfo: DashboardRouteInfo.Home,
      reloadOnSearch: false,
      resolve: {
        component: importDashboardPage,
      },
    })
    .when('/d/:uid/:slug', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'page-dashboard',
      routeInfo: DashboardRouteInfo.Normal,
      reloadOnSearch: false,
      resolve: {
        component: importDashboardPage,
      },
    })
    .when('/d/:uid', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'page-dashboard',
      reloadOnSearch: false,
      routeInfo: DashboardRouteInfo.Normal,
      resolve: {
        component: importDashboardPage,
      },
    })
    .when('/dashboard/:type/:slug', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'page-dashboard',
      routeInfo: DashboardRouteInfo.Normal,
      reloadOnSearch: false,
      resolve: {
        component: importDashboardPage,
      },
    })
    .when('/dashboard/new', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'page-dashboard',
      routeInfo: DashboardRouteInfo.New,
      reloadOnSearch: false,
      resolve: {
        roles: () => (contextSrv.hasEditPermissionInFolders ? [contextSrv.user.orgRole] : ['Admin']),
        component: importDashboardPage,
      },
    })
    .when('/d-solo/:uid/:slug', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'dashboard-solo',
      routeInfo: DashboardRouteInfo.Normal,
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "SoloPanelPage" */ '../features/dashboard/containers/SoloPanelPage')
          ),
      },
    })
    .when('/d-solo/:uid', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'dashboard-solo',
      routeInfo: DashboardRouteInfo.Normal,
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "SoloPanelPage" */ '../features/dashboard/containers/SoloPanelPage')
          ),
      },
    })
    .when('/dashboard-solo/:type/:slug', {
      template: '<react-container />',
      //@ts-ignore
      pageClass: 'dashboard-solo',
      routeInfo: DashboardRouteInfo.Normal,
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "SoloPanelPage" */ '../features/dashboard/containers/SoloPanelPage')
          ),
      },
    })
    .when('/dashboard/import', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "DashboardImport"*/ 'grafana-7.3.6/public/app/features/manage-dashboards/DashboardImportPage')
          ),
      },
    })
    .when('/datasources', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "DataSourcesListPage"*/ 'grafana-7.3.6/public/app/features/datasources/DataSourcesListPage')
          ),
      },
    })
    .when('/datasources/edit/:id/', {
      template: '<react-container />',
      reloadOnSearch: false, // for tabs
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(
              /* webpackChunkName: "DataSourceSettingsPage"*/ '../features/datasources/settings/DataSourceSettingsPage'
            )
          ),
      },
    })
    .when('/datasources/edit/:id/dashboards', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "DataSourceDashboards"*/ 'grafana-7.3.6/public/app/features/datasources/DataSourceDashboards')
          ),
      },
    })
    .when('/datasources/new', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "NewDataSourcePage"*/ '../features/datasources/NewDataSourcePage')
          ),
      },
    })
    .when('/dashboards', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "DashboardListPage"*/ 'grafana-7.3.6/public/app/features/search/components/DashboardListPage')
          ),
      },
    })
    .when('/dashboards/folder/new', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "NewDashboardsFolder"*/ 'grafana-7.3.6/public/app/features/folders/components/NewDashboardsFolder')
          ),
      },
    })
    .when('/dashboards/f/:uid/:slug/permissions', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "FolderPermissions"*/ 'grafana-7.3.6/public/app/features/folders/FolderPermissions')
          ),
      },
    })
    .when('/dashboards/f/:uid/:slug/settings', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "FolderSettingsPage"*/ 'grafana-7.3.6/public/app/features/folders/FolderSettingsPage')
          ),
      },
    })
    .when('/dashboards/f/:uid/:slug', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "DashboardListPage"*/ 'grafana-7.3.6/public/app/features/search/components/DashboardListPage')
          ),
      },
    })
    .when('/dashboards/f/:uid', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "DashboardListPage"*/ 'grafana-7.3.6/public/app/features/search/components/DashboardListPage')
          ),
      },
    })
    .when('/explore', {
      template: '<react-container />',
      reloadOnSearch: false,
      //@ts-ignore
      pageClass: 'page-explore',
      resolve: {
        roles: () => (config.viewersCanEdit ? [] : ['Editor', 'Admin']),
        component: () => SafeDynamicImport(import(/* webpackChunkName: "explore" */ 'grafana-7.3.6/public/app/features/explore/Wrapper')),
      },
    })
    .when('/a/:pluginId/', {
      // Someday * and will get a ReactRouter under that path!
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "AppRootPage" */ 'grafana-7.3.6/public/app/features/plugins/AppRootPage')),
      },
    })
    .when('/org', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "OrgDetailsPage" */ '../features/org/OrgDetailsPage')),
      },
    })
    .when('/org/new', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () => SafeDynamicImport(import(/* webpackChunkName: "NewOrgPage" */ 'grafana-7.3.6/public/app/features/org/NewOrgPage')),
      },
    })
    .when('/org/users', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "UsersListPage" */ 'grafana-7.3.6/public/app/features/users/UsersListPage')),
      },
    })
    .when('/org/users/invite', {
      template: '<react-container/>',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "UserInvitePage" */ 'grafana-7.3.6/public/app/features/org/UserInvitePage')),
      },
    })
    .when('/org/apikeys', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        roles: () => ['Editor', 'Admin'],
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "ApiKeysPage" */ 'grafana-7.3.6/public/app/features/api-keys/ApiKeysPage')),
      },
    })
    .when('/org/teams', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        roles: () => (config.editorsCanAdmin ? [] : ['Editor', 'Admin']),
        component: () => SafeDynamicImport(import(/* webpackChunkName: "TeamList" */ 'grafana-7.3.6/public/app/features/teams/TeamList')),
      },
    })
    .when('/org/teams/new', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        roles: () => (config.editorsCanAdmin ? [] : ['Admin']),
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "CreateTeam" */ 'grafana-7.3.6/public/app/features/teams/CreateTeam')),
      },
    })
    .when('/org/teams/edit/:id/:page?', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        roles: () => (config.editorsCanAdmin ? [] : ['Admin']),
        component: () => SafeDynamicImport(import(/* webpackChunkName: "TeamPages" */ 'grafana-7.3.6/public/app/features/teams/TeamPages')),
      },
    })
    .when('/profile', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "UserProfileEdit" */ 'grafana-7.3.6/public/app/features/profile/UserProfileEdit')),
      },
    })
    .when('/profile/password', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "ChangePasswordPage" */ 'grafana-7.3.6/public/app/features/profile/ChangePasswordPage')
          ),
      },
    })
    .when('/profile/select-org', {
      template: '<react-container/>',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "SelectOrgPage" */ 'grafana-7.3.6/public/app/features/org/SelectOrgPage')),
      },
    })
    // ADMIN
    .when('/admin', {
      templateUrl: 'public/app/features/admin/partials/admin_home.html',
      controller: 'AdminHomeCtrl',
      controllerAs: 'ctrl',
      reloadOnSearch: false,
    })
    .when('/admin/settings', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "AdminSettings" */ 'grafana-7.3.6/public/app/features/admin/AdminSettings')),
      },
    })
    .when('/admin/upgrading', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () => SafeDynamicImport(import('grafana-7.3.6/public/app/features/admin/UpgradePage')),
      },
    })
    .when('/admin/users', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "UserListAdminPage" */ 'grafana-7.3.6/public/app/features/admin/UserListAdminPage')),
      },
    })
    .when('/admin/users/create', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "UserCreatePage" */ 'grafana-7.3.6/public/app/features/admin/UserCreatePage')),
      },
    })
    .when('/admin/users/edit/:id', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () => UserAdminPage,
      },
    })
    .when('/admin/orgs', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "AdminListOrgsPage" */ 'grafana-7.3.6/public/app/features/admin/AdminListOrgsPage')),
      },
    })
    .when('/admin/orgs/edit/:id', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "AdminEditOrgPage" */ 'grafana-7.3.6/public/app/features/admin/AdminEditOrgPage')),
      },
    })
    .when('/admin/stats', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "ServerStats" */ 'grafana-7.3.6/public/app/features/admin/ServerStats')),
      },
    })
    .when('/admin/ldap', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () => LdapPage,
      },
    })
    // LOGIN / SIGNUP
    .when('/login', {
      template: '<react-container/>',
      //@ts-ignore
      pageClass: 'login-page sidemenu-hidden',
      resolve: {
        component: () => LoginPage,
      },
    })
    .when('/invite/:code', {
      template: '<react-container/>',
      //@ts-ignore
      pageClass: 'sidemenu-hidden',
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "SignupInvited" */ 'grafana-7.3.6/public/app/features/users/SignupInvited')),
      },
    })
    .when('/verify', {
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "VerifyEmailPage" */ 'grafana-7.3.6/public/app/core/components/Signup/VerifyEmailPage')
          ),
      },
      // @ts-ignore
      pageClass: 'login-page sidemenu-hidden',
    })
    .when('/signup', {
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "SignupPage" */ 'grafana-7.3.6/public/app/core/components/Signup/SignupPage')),
      },
      // @ts-ignore
      pageClass: 'login-page sidemenu-hidden',
    })
    .when('/user/password/send-reset-email', {
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(
              /* webpackChunkName: "SendResetMailPage" */ 'grafana-7.3.6/public/app/core/components/ForgottenPassword/SendResetMailPage'
            )
          ),
      },
      // @ts-ignore
      pageClass: 'login-page sidemenu-hidden',
    })
    .when('/user/password/reset', {
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(
              /* webpackChunkName: "ChangePasswordPage" */ 'grafana-7.3.6/public/app/core/components/ForgottenPassword/ChangePasswordPage'
            )
          ),
      },
      //@ts-ignore
      pageClass: 'login-page sidemenu-hidden',
    })
    .when('/dashboard/snapshots', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "SnapshotListPage" */ 'grafana-7.3.6/public/app/features/manage-dashboards/SnapshotListPage')
          ),
      },
    })
    .when('/plugins', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "PluginListPage" */ 'grafana-7.3.6/public/app/features/plugins/PluginListPage')),
      },
    })
    .when('/plugins/:pluginId/', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "PluginPage" */ '../features/plugins/PluginPage')),
      },
    })
    .when('/plugins/:pluginId/page/:slug', {
      templateUrl: 'public/app/features/plugins/partials/plugin_page.html',
      controller: 'AppPageCtrl',
      controllerAs: 'ctrl',
      reloadOnSearch: false,
    })
    .when('/alerting', {
      redirectTo: '/alerting/list',
    })
    .when('/alerting/list', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "AlertRuleList" */ 'grafana-7.3.6/public/app/features/alerting/AlertRuleList')),
      },
    })
    .when('/alerting/notifications', {
      template: '<react-container />',
      reloadOnSearch: false,
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "NotificationsListPage" */ 'grafana-7.3.6/public/app/features/alerting/NotificationsListPage')
          ),
      },
    })
    .when('/alerting/notification/new', {
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "NewNotificationChannel" */ 'grafana-7.3.6/public/app/features/alerting/NewNotificationChannelPage')
          ),
      },
    })
    .when('/alerting/notification/:id/edit', {
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(
            import(/* webpackChunkName: "EditNotificationChannel"*/ 'grafana-7.3.6/public/app/features/alerting/EditNotificationChannelPage')
          ),
      },
    })
    .otherwise({
      template: '<react-container />',
      resolve: {
        component: () =>
          SafeDynamicImport(import(/* webpackChunkName: "ErrorPage" */ 'grafana-7.3.6/public/app/core/components/ErrorPage/ErrorPage')),
      },
    });

  applyRouteRegistrationHandlers($routeProvider);
}
