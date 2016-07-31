export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',
  // see `.ember-cli` following Urls will point to 'http://laguardiaairport.com/wp-json/ch-weather/v1/weather/current' when run with `ng server --prod`
  weatherUrl: '/wp-json/ch-weather/v1/weather/current',
  alertsUrl: '/wp-json/lga-alerts/v1/alerts',
  parkingUrl: '/wp-json/lga-parking/v1/lots'
};
