import { getFilteredVariables, getVariables, getVariableWithName } from '../../app/features/variables/state/selectors';
import { StoreState } from '../../app/types';
import { TemplateSrvDependencies } from 'grafana-7.3.6/public/app/features/templating/template_srv';

export const getTemplateSrvDependencies = (state: StoreState): TemplateSrvDependencies => ({
  getFilteredVariables: filter => getFilteredVariables(filter, state),
  getVariableWithName: name => getVariableWithName(name, state),
  getVariables: () => getVariables(state),
});
