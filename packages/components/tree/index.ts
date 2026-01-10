export * from './src/props';
export * from './src/types';
import { withInstall } from '@amu-ui/utils';
import Tree from './src/tree.vue';
import './src/style.css';

export const AmuTree = withInstall(Tree);
export default AmuTree;
