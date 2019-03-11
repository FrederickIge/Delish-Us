import { observable, action,computed, autorun } from "mobx";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS } from "../constants/mapConstants";
import Spot from "../pages/dogs/Spot";


class spotStore {

  constructor(root) {
    autorun(() => {
      if (root.sessionStore.authUser) {
        this.userId = root.sessionStore.authUser.uid;
      }
    });
  }

  @observable googlePlacesService;

  @observable selectedSpot = {};

  @observable  mapGeolocation = DEFAULT_GEOLOCATION;

  @observable gmapsLoaded = false;

  @observable requestOptions;

  @observable selectedSpotLatLng;

  @observable googlePlaceId;

  @observable allSpots = [];

  @observable userId 

  @observable displayedSpots = [];

  @observable showAllSpots = true;

  @computed get uniqueSpotsByGooglePlaceIds() {
    return this.allSpots.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.googlePlaceId === elem.googlePlaceId) }) === index)
  }

  @computed get currentUserSpots() {
    return this.allSpots.filter((element) => element.userId === this.userId )
  }

  @action
  async selectSearchedSpot(address) {
    await this.getGoogleGeoData(address);
    this.moveMapToSelectedSpot();
    this.selectedSpot = await this.loadSpotDetails();
  }

  @action
  async selectExistingSpot() {
    this.selectedSpot = await this.loadSpotDetails();
  }

  async getGoogleGeoData(address) {
    let [first] = await geocodeByAddress(address);
    return await this.fetchGeoData(first);
  }

  async fetchGeoData(first){
    this.googlePlaceId = first.place_id;
    this.selectedSpotLatLng = await getLatLng(first);
  }

  moveMapToSelectedSpot() {
    this.mapGeolocation.center = this.selectedSpotLatLng;
  }

  async loadSpotDetails() {
    this.requestOptions = this.prepareRequest();
    return await this.fetchGooglePlaceDetails();
  }

  prepareRequest() {
    return { placeId: this.googlePlaceId, fields: GOOGLE_DETAILS_FIELDS };
  }

  @action
  fetchGooglePlaceDetails() {
    return new Promise((resolve) => {
      let SpotCreationCallback = (place) => { resolve(new Spot(place, this.selectedSpotLatLng)) }
      this.googlePlacesService.getDetails(this.requestOptions, SpotCreationCallback);
    });
  }
}

export default spotStore;
