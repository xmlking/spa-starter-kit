import gMaps from '../utils/gMaps';
import {PROVIDER_SEARCH_PARAMS, PROVIDER_SEARCH_GEOLOCATION} from '../services/ProviderService';
let scope = Symbol('scope', true);
let state = Symbol('state', true);

export default class ProviderMapController {

  constructor($scope, $state) {
    this[scope] = $scope;
    this[state] = $state;

    // TADA: gm-center/gm-bounds are for 2-way binding
    this.center = PROVIDER_SEARCH_GEOLOCATION;
    this.zoom = 13;
    this.bounds = this.getBounds($scope.providers);

    this.mapInitOptions = {
      zoom: this.zoom,
      center: this.bounds.getCenter(),
      mapTypeId: gMaps.MapTypeId.ROADMAP,
      panControl: false,
      zoomControlOptions: {
        style: gMaps.ZoomControlStyle.LARGE,
        position: gMaps.ControlPosition.RIGHT_BOTTOM
      }
    };

    this.markerOptions = {
      selected: {
        icon: 'common/images/hospital.png'
      },
      notselected: {
        icon: 'common/images/hospital_H_S_8x_2.png'
      },
      mouseover: {
        icon: 'common/images/hospital_H_search_L_8x_2.png'
      },
      mouseout: {
        icon: 'common/images/hospital_H_S_8x_2.png'
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

  getBounds (providers) {
    var bounds = new gMaps.LatLngBounds();
      for (let provider of providers) {
          for (let address of provider.addresses) {
              if(address.ADR_CANC_DT === '9999-12-31' && address.distance < PROVIDER_SEARCH_PARAMS.radius) {
                  bounds.extend(new gMaps.LatLng(address.LAT_NBR, address.LONG_NBR));
              }
          }
      }
    return bounds;
  }

  onProviderClick(provider, marker) {
    this.selectedProvider = provider;
    PROVIDER_SEARCH_GEOLOCATION.latLng =  new gMaps.LatLng(provider.addresses[0].LAT_NBR, provider.addresses[0].LONG_NBR);
    //TODO this.zoom = 16;
    this[scope].markerEvents = [
      {
        event: 'openinfowindow',
        ids: [provider.id]
      },
      {
        event: 'activatemarker',
        ids: [provider.id]
      }
    ];
    this[state].go('providers.search.detail',{ providerId: provider.id });
  }
  activateMarker(marker){
    if(this.selectedMarker) {
      this.selectedMarker.setIcon(this.markerOptions.notselected.icon);
    }
    this.selectedMarker = marker;
    marker.setIcon(this.markerOptions.selected.icon);
  }


  onMouseOver(provider, marker) {
      console.log('onMouseOver');
//        marker.setIcon(this.markerOptions.mouseover.icon);
//        this[scope].markerEvents = [
//            {
//                event: 'openmouseoverinfowindow',
//                ids: [provider.id]
//            }
//        ];
  }

  onMouseOut(provider, marker) {
      console.log('onMouseOut');
//        marker.setIcon(this.markerOptions.mouseout.icon);
//        this[scope].markerEvents = [
//            {
//                event: 'closemouseoverinfowindow',
//                ids: [provider.id]
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
      { title: `${provider.FST_NM} ${provider.MDL_NM || ''} ${provider.LST_NM}`, animation: gMaps.Animation.DROP },
      this.markerOptions.notselected
    );
  }

}
