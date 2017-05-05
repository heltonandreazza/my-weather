import storageService from './storage.service';

export default angular
  .module('app.common.storage', [])
  .service('storageService', storageService)
  .name;