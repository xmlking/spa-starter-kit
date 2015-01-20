import gMaps from '../utils/gMaps';
var LatLng = gMaps.LatLng;
let _latLng = Symbol('_latLng', true);

export default class GeoLocation{
    /**
     * @param latitude
     * @param longitude
     * @param address
     * @param zip
     */
    constructor(latitude, longitude, address, zip) {
        this[_latLng] = new gMaps.LatLng(latitude, longitude);
        this.address = address;
        this.zip = zip;
    }

    get latLng() {
        return this[_latLng];
    }

    set latLng(value : LatLng) {
        this[_latLng] = value;// new google.maps.LatLng(value.lat(), value.lng());
    }
}