import gMaps from '../utils/gMaps';
import {PROVIDER_SEARCH_GEOLOCATION} from '../services/ProviderService';
let scope = Symbol('scope', true);

export default class ProviderMapController {

  constructor($scope) {
    this[scope] = $scope;

    // TADA: gm-center/gm-bounds are for 2-way binding
    this.center = PROVIDER_SEARCH_GEOLOCATION;
    this.zoom = 13;
    this.bounds = this.getBounds($scope.providers);

    this.mapInitOptions = {
      zoom: this.zoom,
      center: this.bounds.getCenter(),
      mapTypeId: gMaps.MapTypeId.ROADMAP
    };

    this.markerOptions = {
      selected: {
        icon: 'images/hospital.png'
      },
      notselected: {
        icon: 'images/hospital_H_S_8x_2.png'
      },
      mouseover: {
        icon: 'images/hospital_H_search_L_8x_2.png'
      },
      mouseout: {
        icon: 'images/hospital_H_S_8x_2.png'
      }
    };

    this.mouseOverInfoWindowOptions = {
      pixelOffset: new google.maps.Size(120, 110)
      // anchorPoint: new google.maps.Point(0, -29)
    };

    this.selectedProvider = $scope.providers[0];
    this.selectedMarker = undefined;


    $scope.$watch('providers', (newProviders) => {
      this.bounds = this.getBounds(newProviders);
    });

  }

  //TODO
//    getBounds (providers) {
//        var bounds = new gMaps.LatLngBounds();
//        providers.forEach( (provider) =>{
//            bounds.extend(new gMaps.LatLng(provider.location.lat,provider.location.lng));
//        });
//        return bounds;
//    }
  getBounds (providers) {
    var bounds = new gMaps.LatLngBounds();

    for ( let {location: {lat: latX},location: {lng: lngX}}  of providers ) {
      bounds.extend(new gMaps.LatLng(latX, lngX));
    }
    return bounds;
  }

  onProviderClick(provider, marker) {
    this.selectedProvider = provider;
    PROVIDER_SEARCH_GEOLOCATION.latLng =  new gMaps.LatLng(provider.location.lat,provider.location.lng);
    //TODO this.zoom = 16;
    this[scope].markerEvents = [
      {
        event: 'openinfowindow',
        ids: [provider.facilityId]
      },
      {
        event: 'activatemarker',
        ids: [provider.facilityId]
      }
    ];
  }
  activateMarker(marker){
    if(this.selectedMarker) {
      this.selectedMarker.setIcon(this.markerOptions.notselected.icon);
    }
    this.selectedMarker = marker;
    marker.setIcon(this.markerOptions.selected.icon);
  }


  onMouseOver(provider, marker) {
//        marker.setIcon(this.markerOptions.mouseover.icon);
//        this[scope].markerEvents = [
//            {
//                event: 'openmouseoverinfowindow',
//                ids: [provider.facilityId]
//            }
//        ];
  }

  onMouseOut(provider, marker) {
//        marker.setIcon(this.markerOptions.mouseout.icon);
//        this[scope].markerEvents = [
//            {
//                event: 'closemouseoverinfowindow',
//                ids: [provider.facilityId]
//            }
//        ];
  }



  markerAnimate(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }



  getProviderOpts (provider) {
    return angular.extend(
      { title: provider.facilityName, animation: gMaps.Animation.DROP },
      this.markerOptions.notselected
    );
  }

}
