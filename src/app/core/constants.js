export default angular
  .module('app.core.constants', [])
  /**
   * Sets the Multiselect labels to Portuguese language.
   */
  .constant('multiSelectLabels', {
    selectAll: 'Marcar Todos',
    selectNone: 'Desmarcar Todos',
    reset: 'Restaurar',
    search: 'Digite para pesquisar...',
    nothingSelected: 'Nenhum item selecionado'
  })
  .constant('url', {
    geoNames: "http://www.geonames.org/childrenJSON",
    openWeather: "http://api.openweathermap.org/data/2.5/forecast/daily"
  })
  .name;