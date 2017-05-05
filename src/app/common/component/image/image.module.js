import ImageService from './image.service';

export default angular
  .module('app.common.image', [])
  .service('imageService', ImageService)
  .name;