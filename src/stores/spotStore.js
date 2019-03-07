import { observable, action, computed } from "mobx";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS } from "../constants/mapConstants";
import Spot from "../pages/dogs/Spot";

class spotStore {

  @observable
  googlePlacesService;

  @observable
  selectedSpot = {};

  @observable
  mapGeolocation = DEFAULT_GEOLOCATION;

  @observable
  gmapsLoaded = false;

  @observable
  requestOptions

  @action
  async selectSpot(address) {
    let { latLng, googlePlaceId } = await this.getGoogleGeoData(address);
    this.moveMapToSpot(latLng);
    await this.loadSpotDetails(googlePlaceId);
  }

  async getGoogleGeoData(address) {
    let [first] = await geocodeByAddress(address);
    return this.fetchGeoData(first);
  }

  async fetchGeoData(first){
    let googlePlaceId = first.place_id;
    let latLng = await getLatLng(first);
    return { latLng, googlePlaceId }
  }

  moveMapToSpot(latLng) {
    this.mapGeolocation.center = latLng;
  }

  async loadSpotDetails(googlePlaceId) {
    this.requestOptions = this.prepareRequest(googlePlaceId);
    this.selectedSpot = await this.fetchGooglePlaceDetails();
  }

  prepareRequest(googlePlaceId) {
    return { placeId: googlePlaceId, fields: GOOGLE_DETAILS_FIELDS };
  }

  @action
  fetchGooglePlaceDetails() {
    return new Promise((resolve) => {
      let SpotCreationCallback = (place) => {resolve(new Spot(place))}
      this.googlePlacesService.getDetails(this.requestOptions, SpotCreationCallback);
    });
  }








}

export default spotStore;
