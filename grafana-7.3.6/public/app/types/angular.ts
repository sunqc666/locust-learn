import { IScope } from 'grafana-7.3.6/public/app/types/angular';

export interface Scope extends IScope {
  [key: string]: any;
}
