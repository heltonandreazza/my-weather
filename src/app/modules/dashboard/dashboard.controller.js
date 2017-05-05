class DashboardCtrl {
  /*@ngInject*/
  constructor(dashboardService, multiSelectLabels, imageService, storageService) {
    //initialize dependency injections
    this.dashboardService = dashboardService;
    this.multiSelectLabels = multiSelectLabels;
    this.imageService = imageService;
    this.storageService = storageService;
    //initialize controller variables
    this.input = {};
    this.favorite = 'dashboard.favorite';
    this.forecastItems = [];
    this.weekendItems = [];

    this.activate();
  }

  /**
   * Initialize controller
   */
  activate() {
    this.backgroundImage = this.imageService.getContentImage();
    this.loadEstates()
      .then(() => this.loadCities(this.input.estate.filter(o => o.ticked)))
      .then(() => this.loadFavorite())
      .then(() => this.loadForecast(this.input.city.filter(o => o.ticked)));
  }

  /**
   * Load estates data for multiselect
   */
  loadEstates() {
    return this.dashboardService.getEstates()
      .then(estates => this.input.estate = estates)
  }

  /**
   * Load cities data for multiselect based on a given estate
   */
  loadCities(estate, loadForecast = false) {
    return this.dashboardService.getCities(estate)
      .then(cities => {
        this.input.city = cities;
        if (loadForecast) this.loadForecast(this.input.city.filter(o => o.ticked));
      });
  }

  /**
   * Load search data, estate and city, saved by the user as his favorite
   */
  loadFavorite() {
    let favorite = this.storageService.getProperty(this.favorite);
    if (favorite) this.input = favorite;
  }

  /**
   * Save search data, estate and city in the localstorage so it can be loaded later 
   */
  saveFavorite() {
    this.storageService.setProperty(this.favorite, this.input);
  }

  /**
   * Get data to show a card with given informations about weather of every day
   * @param {array} city - array with selected cities, in this cause will be only one
   */
  loadForecast(city) {
    this.dashboardService.getForecast(city)
      .then(forecastItems => {
        this.forecastItems = forecastItems;
        //get weekends items
        this.weekendItems = forecastItems.filter(o => {
          if (o.realDate.getDay() > 4 || o.realDate.getDay() === 0) return o;
        });
        //build chart
        this.buildChartjs(this.forecastItems);
        //add week card
        this.forecastItems.push(this.dashboardService.getWeekForecast(this.forecastItems));
        //build sugestion card
        this.sugestionCard = this.dashboardService.buildSugestionCardData(this.weekendItems);
      })
  }

  /**
   * Build line ChsrtJs with forecast items
   * @param {array} - array with forecast objects
   */
  buildChartjs(forecastItems) {
    let labels = forecastItems.map(item => item.dayName);
    let maxData = forecastItems.map(item => item.temp.max);
    let minData = forecastItems.map(item => item.temp.min);

    var ctx = document.getElementById("lineChart");
    var scatterChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: "Mínima",
            backgroundColor: "rgba(51,122,183,0.4)",
            borderColor: "rgba(51,122,183,1)",
            borderCapStyle: 'butt',
            data: minData,
          }, {
            label: "Máxima",
            backgroundColor: "rgba(255,15,15,0.4)",
            borderColor: "rgba(255,15,15,1)",
            borderCapStyle: 'butt',        
            data: maxData,
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Gráfico de variação de temperatura'
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 50,
              min: -20,
              stepSize: 10
            }
          }]
        }
      }
    });
  }
}

export default DashboardCtrl;