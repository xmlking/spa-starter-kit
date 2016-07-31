// The file for the current environment will overwrite this one during build
// Different environments can be found in config/environment.{dev|prod}.ts
// The build system defaults to the dev environment

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  weatherUrl: '/assets/data/weather.json',
  alertsUrl: '/assets/data//alerts.json',
  parkingUrl: '/assets/data//lots.json'
};
