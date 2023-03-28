import coreModule from 'grafana-7.3.6/public/app/core/core_module';
import { getTemplateSrv } from './template_srv';

coreModule.factory('templateSrv', () => getTemplateSrv());
