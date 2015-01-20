import gMaps from '../utils/gMaps';
export default class GeocoderService {

    constructor() {
        console.info('in GeocoderService constructor....');
    }

    getLocations(address) {
        return  new Promise((resolve, reject) => {
            var geocoder = new gMaps.Geocoder();
            return geocoder.geocode( {'address': address, 'region': 'us', componentRestrictions: {country: 'US'}}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results);
                } else {
                    throw Error('Geocode was not successful for the following reason: '+ status);
                }
            });
        });
    }
}