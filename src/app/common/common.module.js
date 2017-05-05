import component from './component/component.module';
import storage from './storage/storage.module';

export default angular
  .module('app.common', [
    component,
    storage
  ])
  .name;