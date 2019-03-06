import { observable, action, computed } from "mobx";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS} from "../constants/mapConstants";
import Spot from "../pages/dogs/Spot";

class spotStore {

  @observable
  googleDetailsService;

  @observable
  selectedSpot = { };

  @observable
  mapGeolocation = DEFAULT_GEOLOCATION;

  @observable
  gmapsLoaded = false;

  // when spot it clicked 
  @action
  async selectSpot(address) {

    let results = await geocodeByAddress(address);

    let latLng = await getLatLng(results[0]);

    this.mapGeolocation.center = latLng;

    this.selectedSpot = await this.getSpotDetails(results[0].place_id);
    console.log(this.selectedSpot);

  }

  //requesting spot details
  @action
  getSpotDetails(placeID) {
    var request = { placeId: placeID, fields: GOOGLE_DETAILS_FIELDS };

    return new Promise( (resolve, reject) => {
      this.googleDetailsService.getDetails(request, (place, status) => {


        resolve(new Spot(place));


      });
    });

  }

}

export default spotStore;
