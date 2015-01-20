import GeoLocation from '../models/GeoLocation';

let q = Symbol('q', true);
let http = Symbol('http', true);
let _window = Symbol('_window', true);

export function TelizeRestangular(Restangular) {
    'use strict';
    return Restangular.withConfig( (RestangularConfigurer) => {
        RestangularConfigurer.setBaseUrl('http://www.telize.com'); //http://ipinfo.io
        RestangularConfigurer.setDefaultRequestParams();
        RestangularConfigurer.setJsonp(true);
        RestangularConfigurer.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
    });
}

export class GeolocationService {

    constructor($q, $http, $window, TelizeRestangular) {
        console.info('in GeoIPService constructor....');

        this[q] = $q;
        this[http] = $http;
        this[_window] = $window;
        this.TelizeRestangular = TelizeRestangular;
        this.cachedGeolocation = null;
    }

    getGeolocation(refresh = false) {
        let promise = new Promise((resolve, reject) => {
            if (this.cachedGeolocation && refresh === false) {
                resolve(this.cachedGeolocation);
            } else {
                this.getGeolocationByIp()
                .then( geoLoc => {
                    this.cachedGeolocation = geoLoc;
                    resolve(geoLoc);
                })
                .catch( err1 => {
                    console.log('error with getGeolocationByIp(), will try getGeolocationByHtml5()',err1);
                    this.getGeolocationByHtml5()
                        .then( geoLoc => {
                            this.cachedGeolocation = geoLoc;
                            resolve(geoLoc);
                        })
                        .catch( err2 => {
                            console.log('error with getGeolocationByHtml5(), default to SF',err2);
                            resolve(new GeoLocation(37.7577,-122.4376, 'San Francisco, CA', '94110'));
                        });
                });
            }
        });
        return promise; //this[q].when(promise);
    }

    getGeolocationByIp() {
        return this.TelizeRestangular.all('geoip').customGET().then(geoInfo => {
            if(!geoInfo.hasOwnProperty('postal_code')) {
                throw Error('Geolocation has not enough accuracy');
            }
            return new GeoLocation(geoInfo.latitude, geoInfo.longitude,  geoInfo.city +', '+ geoInfo.region_code, geoInfo.postal_code);
        });
    }

    getGeolocationByHtml5(){
        return new Promise((resolve, reject) => {
            if ( this[_window].navigator &&  this[_window].navigator.geolocation) {
                this[_window].navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve (new GeoLocation(position.coords.latitude, position.coords.longitude, '', ''));
                    },
                    error => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                reject( new Error('You have rejected access to your location'));
                                break;
                            case error.POSITION_UNAVAILABLE:
                                reject( new  Error('Unable to determine your location'));
                                break;
                            case error.TIMEOUT:
                                reject( new  Error('Service timeout has been reached'));
                                break;
                            default:
                                reject( new  Error('default error'));
                        }
                    });
            } else {
                reject( new  Error('Browser does not support location services'));
            }
        });
    }

}