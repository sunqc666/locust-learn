import AdminEditOrgCtrl from './AdminEditOrgCtrl';

import coreModule from 'grafana-7.3.6/public/app/core/core_module';
import { NavModelSrv } from 'grafana-7.3.6/public/app/core/core';

class AdminHomeCtrl {
  navModel: any;

  /** @ngInject */
  constructor(navModelSrv: NavModelSrv) {
    this.navModel = navModelSrv.getNav('admin');
  }
}

coreModule.controller('AdminEditOrgCtrl', AdminEditOrgCtrl);
coreModule.controller('AdminHomeCtrl', AdminHomeCtrl);
