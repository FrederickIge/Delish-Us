import { observable, action,computed, autorun } from "mobx";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS } from "../constants/mapConstants";
import Spot from "../models/Spot";
import firebase from 'firebase';
import Geopoint from "../models/Geopoint";
const db = firebase.firestore();


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

  @observable selectedSpotUserId;

  @observable alreadySaved = true;

  @action
 async getAllSpots() {
    let querySnapshot = await db.collection("spots").get()
    this.displaySpots(querySnapshot);
  }

  displaySpots(querySnapshot) {
    querySnapshot.forEach((doc) => {
      let geopoint = new Geopoint(doc.data().name, doc.data().latLng, doc.data().googlePlaceId, doc.id, doc.data().userId);
      this.allSpots.push(geopoint);
    });
  }

  @action
  async saveSpot() {
    let payload = this.prepareSpotPayload();
    let docRef = await db.collection("spots").add(payload);
    let latLng = { _lat: this.selectedSpot.lat, _long: this.selectedSpot.lng };
    let newSpot = new Geopoint(this.selectedSpot.name, latLng, this.googlePlaceId, docRef.id, this.userId);
    this.allSpots.push(newSpot);
  }

  prepareSpotPayload() {
    return {
      name: this.selectedSpot.name,
      latLng: new firebase.firestore.GeoPoint(this.selectedSpot.lat, this.selectedSpot.lng),
      googlePlaceId: this.googlePlaceId,
      userId: this.userId
    };
  }

  @computed get uniqueSpotsByGooglePlaceIds() {
    return this.allSpots.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.googlePlaceId === elem.googlePlaceId) }) === index)
  }

  @computed get currentUserSpots() {
    return this.allSpots.filter((element) => element.userId === this.userId )
  }

 checkifSaved() {
    let alreadySaved = false;
     this.currentUserSpots.forEach((element) => {
        if(element.googlePlaceId == this.googlePlaceId){
          alreadySaved = true;
        }
    })

    return alreadySaved;
  }

  @action
  async selectSearchedSpot(address) {
    await this.getGoogleGeoData(address);
    this.moveMapToSelectedSpot();
    this.selectedSpot = await this.loadSpotDetails();
  }

  @action
  async selectExistingSpot(spot) {
    this.googlePlaceId = spot.googlePlaceId
    this.selectedSpotLatLng = { lat: spot.lat, lng: spot.lng };
    this.selectedSpotUserId = spot.userId;
    this.selectedSpot = await this.loadSpotDetails();
    this.alreadySaved = this.checkifSaved();
    console.log(this.alreadySaved)
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
      let SpotCreationCallback = (place) => { resolve(new Spot(place, this.selectedSpotLatLng, this.selectedSpotUserId)) }
      this.googlePlacesService.getDetails(this.requestOptions, SpotCreationCallback);
    });
  }
}

export default spotStore;
