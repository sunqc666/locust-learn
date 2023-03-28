import { MultiVariableBuilder } from './multiVariableBuilder';
import { DataSourceVariableModel, VariableRefresh } from 'grafana-7.3.6/public/app/features/variables/types';

export class DatasourceVariableBuilder<T extends DataSourceVariableModel> extends MultiVariableBuilder<T> {
  withRefresh(refresh: VariableRefresh) {
    this.variable.refresh = refresh;
    return this;
  }

  withRegEx(regex: any) {
    this.variable.regex = regex;
    return this;
  }
}
