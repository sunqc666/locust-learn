import coreModule from 'grafana-7.3.6/public/app/core/core_module';
import { provideTheme } from 'grafana-7.3.6/public/app/core/utils/ConfigProvider';

export function react2AngularDirective(name: string, component: any, options: any) {
  coreModule.directive(name, [
    'reactDirective',
    reactDirective => {
      return reactDirective(provideTheme(component), options);
    },
  ]);
}
