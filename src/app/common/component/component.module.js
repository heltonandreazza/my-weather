//forked from http://isteven.github.io/angular-multi-select/#/main
import myMultiselect from './my-multiselect/my-multiselect';

import image from './image/image.module';
import spinner from './spinner/spinner.module';

export default angular
  .module('app.common.component', [
    image,
    myMultiselect,
    spinner
  ])
  .name;