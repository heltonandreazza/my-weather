/**
 * Service that keeps data in the local storage
 */
class StorageService {
  /*@ngInject*/
  constructor() {
  }

  setProperty(prop, value) {
    if(window.localStorage)
      localStorage.setItem(prop, JSON.stringify(value));
  }

  getProperty(prop) {
    if(window.localStorage)
      return JSON.parse(localStorage.getItem(prop));
  }
}

export default StorageService;