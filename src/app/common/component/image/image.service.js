class ImageService {
  /*@ngInject*/
  constructor($cacheFactory, $templateCache) {
    this.$templateCache = $templateCache;
    this.defaultUrl = 'default';
  }

  /**
   * Get the content base64 image from the cached image module based on it's key and extension
   * @param {String} key - the image's name
   * @param {String} ext - the image's extension
   * @return {String} - A base64 string representing the image
   */
  getContentImage(key, ext = '.jpg') {
    if(!key) return;
    
    key = key.toLowerCase();
    return this.$templateCache.get(key + ext) ?
      this.$templateCache.get(key + ext).replace("module.exports = ", "").replace(/['"]+/g, '') :
      this.$templateCache.get(this.defaultUrl + ext).replace("module.exports = ", "").replace(/['"]+/g, '');
  }
}

export default ImageService;