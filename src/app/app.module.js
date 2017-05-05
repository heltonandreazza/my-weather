import '../assets/sass/style.scss';
import '../assets/plugins/AdminLTE/AdminLTE.css';
import core from './core/core.module';
import common from './common/common.module';
import modules from './modules/modules.module';

function requireAll(r) { r.keys().forEach(r); };
//caching all .jpn or .png files into the template-cache
requireAll(require.context('ng-cache!../assets/img/', true, /\.(jpg|png)$/));
//caching all .html into the template-cache
requireAll(require.context('ng-cache!./', true, /\.html$/));

angular
  .module('app', [
    core,
    common,
    modules
  ])