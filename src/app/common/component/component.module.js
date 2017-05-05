import image from './image/image.module';
import myMultiselect from './my-multiselect/my-multiselect';
import spinner from './spinner/spinner.module';

export default angular
  .module('app.common.component', [
    image,
    myMultiselect,
    spinner
  ])
  .name;