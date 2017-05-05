class DashBoardService {
  /*@ngInject*/
  constructor($http, url, imageService) {
    //setup dependency injections
    this.$http = $http;
    this.url = url;
    this.imageService = imageService;
    //setup config appIdOpenWeather
    this.appIdOpenWeather = "dc43a32905fc26a66d43b16b6640b63e";
    this.dayName = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado");
    this.monName = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Agosto", "Outubro", "Novembro", "Dezembro");
    //setup default values for estate and cities services
    this.setupDefaultValues();
  }

  setupDefaultValues() {
    this.defaultEstate = "Santa Catarina";
    this.defaultCity = "Blumenau";
  }

  /**
   * Retrieves brazilian estates based on it's geonameId: 3469034
   */
  getEstates() {
    return this.$http({
        url: this.url.geoNames,
        method: 'GET',
        params: {
          geonameId: 3469034
        }
      })
      .then(response => this.setDefaultData(response.data.geonames, this.defaultEstate, 'adminName1'));
  }

  /**
   * Retrieves cities based on the estate's geonameId
   * @param {Integer} geonameId - geonameId from the selected estate
   */
  getCities([{ geonameId }]) {
    return this.$http({
        url: this.url.geoNames,
        method: 'GET',
        params: {
          geonameId
        }
      })
      .then(response => this.setDefaultData(response.data.geonames, this.defaultCity, 'name'));
  }

  /**
   * Transform the items change the selected item by default
   * @param {Array} items - array of items which could be an estate or a city
   * @param {String} defaultData - the default name which will be the selected item by default
   * @param {String} prop - the prop for matching the correct data property
   */
  setDefaultData(items, defaultData, prop) {
    items.forEach(item => item.ticked = item[prop] === defaultData);
    if (!items.some(item => item.ticked)) items[0].ticked = true;
    return items;
  }

  /**
   * Get weather data about this week
   * @param {String} cityName - city name that will be extracted from the city object selected by the user 
   * @param {String} units - the units used for changing weather the units will bee celsius, fahreheint
   * @param {Integer} cnt - quantity of days with weather data will bee generated (16 is the limit)
   * @param {String} countryCode - country code 
   * @param {String} lang - wich language should be used for retrieving data
   */
  getForecast([{ name: cityName }], units = 'metric', cnt = 7, countryCode = 'bra', lang = 'pt') {
    return this.$http({
        url: this.url.openWeather,
        method: 'GET',
        params: {
          q: cityName + ',' + countryCode,
          cnt,
          units,
          lang,
          appid: this.appIdOpenWeather
        }
      })
      .then(response => this.buildForecastCard(response.data.list));
  }

  /**
   * Build data for showing to the user a card with the weather information
   * @param {*} items 
   */
  buildForecastCard(items) {
    items.forEach(item => {
      let date = new Date(item.dt * 1000)
      item.temp.media = ((item.temp.min + item.temp.max) / 2).toFixed(2);
      item.realDate = date;
      item.date = this.dayName[date.getDay()] + ', ' + this.monName[date.getMonth()] + " de " + date.getFullYear();
      item.dayName = this.dayName[date.getDay()];
      item.weather = item.weather[0];
      item.icon = 'http://openweathermap.org/img/w/' + item.weather.icon + '.png';
      item.mainImage = this.imageService.getContentImage(item.weather.main, '.jpg');
    });
    return items;
  }

  /**
   * Build data for showing to the user a card with the whole week information
   * @param {array} forecastItems - items from this week forecast
   */
  getWeekForecast(forecastItems) {
    let weekMin = 0;
    let weekMax = 0;
    let weekMinMedia = 0;
    let weekMaxMedia = 0;

    forecastItems.forEach(item => {
      weekMin += item.temp.min;
      weekMax += item.temp.max;
    })

    weekMinMedia = weekMin / forecastItems.length;
    weekMaxMedia = weekMax / forecastItems.length;

    return {
      week: true,
      date: 'Esta semana',
      mainImage: this.imageService.getContentImage(),
      icon: this.imageService.getContentImage('weekend'),
      weather: {
        description: 'média da semana'
      },
      temp: {
        min: weekMinMedia.toFixed(2),
        max: weekMaxMedia.toFixed(2),
        media: ((weekMinMedia + weekMaxMedia) / 2).toFixed(2)
      }
    };
  }

  /**
   * Build data for showing to the user a card with the sugestions for the weekend accordingly
   * with the weather
   * @param {array} weekendItems 
   */
  buildSugestionCardData(weekendItems) {
    let weekendMin = 0;
    let weekendMax = 0;
    let weekendMedia = 0;
    let rainQuantity = 0;

    weekendItems.forEach(item => {
      weekendMin += item.temp.min;
      weekendMax += item.temp.max;
      rainQuantity += item.rain ? item.rain : 0;
    })

    weekendMedia = (((weekendMin / weekendItems.length) + (weekendMax / weekendItems.length)) / 2).toFixed(2);
    console.log('rainQuantity', rainQuantity);
    return {
      title: 'Sugestões para o final de semana',
      info: "O final de semana " +
        (rainQuantity > 10 ? 'estará chuvoso' : (rainQuantity > 2 ? 'estará com pequenas changes de chuva' : 'estará sem chances de chuva')) +
        (weekendMedia > 25 ? ' e o clima estará calor.' : (weekendMedia < 10 ? ' e o clima estará frio.' : ' e o clima estará ameno.')),
      sugestion: "Sugerimos que você " +
        (weekendMedia > 20 ? ' vista uma roupa leve' : (weekendMedia < 10 ? ' vista um casaco' : ' fique a vontade')) +
        (rainQuantity > 10 ? ' e vá curtir um cinema.' : (rainQuantity > 2 ? ' e vá jantar fora.' : ' e vá curtir uma praia.')),
      image: rainQuantity > 10 ? this.imageService.getContentImage('cinema') : (rainQuantity > 2 ? this.imageService.getContentImage('jantar') : this.imageService.getContentImage('praia')),
      image2: this.imageService.getContentImage('vidadeturista'),
      imageTip: rainQuantity > 10 ? 'cinema' : (rainQuantity > 2 ? 'jantar' : 'praia'),
      nameImage: rainQuantity > 10 ? 'Uaau!' : (rainQuantity > 2 ? 'Tamo junto' : 'Isso que é vida')
    }

  }  
}

export default DashBoardService;