import { observable, action,computed, autorun } from "mobx";
import { DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS } from "../constants/mapConstants";
import Spot from "../models/Spot";
import firebase from 'firebase';
import Geopoint from "../models/Geopoint";
const db = firebase.firestore();

class spotStore {
  sessionStore
  constructor(rootStore) {
    // this.rootStore = rootStore
    // this.userId = rootStore.sessionStore.authUser.uid
    // autorun(() => root.sessionStore.authUser ? this.userId = root.sessionStore.authUser.uid : null)
    console.log(rootStore.sessionStore.authUser)
  }

  @observable googlePlacesService;

  @observable selectedSpot = {};

  @observable mapGeolocation = DEFAULT_GEOLOCATION;

  @observable gmapsLoaded = false;

  @observable requestOptions;

  @observable googlePlaceId;

  @observable allSpots = [];

  @observable userId; 

  @observable showAllSpots = true;

  @observable alreadySaved = true;

  @observable selectedGeopoint;
 
  @action
  async getAllSpots() {
    let querySnapshot = await db.collection("spots").get()
    this.displaySpots(querySnapshot);
  }

  displaySpots(querySnapshot) {
    querySnapshot.forEach((doc) => {
      let geopoint = new Geopoint(doc);
      this.allSpots.push(geopoint);
    });
  }

  @action
  async saveSpot() {
    let payload = this.prepareSpotPayload();
    let docRef = await db.collection("spots").add(payload);
    await this.displayNewSpot(docRef);
    this.alreadySaved = this.checkifSaved();
  }

  prepareSpotPayload() {
    return {
      name: this.selectedSpot.name,
      latLng: new firebase.firestore.GeoPoint(this.selectedSpot.lat, this.selectedSpot.lng),
      googlePlaceId: this.selectedSpot.googlePlaceId,
      userId: this.userId
    };
  }

  async displayNewSpot(docRef) {
    let doc = await db.collection("spots").doc(docRef.id).get();
    this.allSpots.push(new Geopoint(doc));
    this.selectedSpot.key = doc.id
  }

  @action
  async selectSearchedSpot(geopoint) {
    this.selectedGeopoint = new Geopoint(geopoint)
    this.selectedSpot = await this.loadSpotDetails();
    this.moveMapToSelectedSpot();
    this.alreadySaved = this.checkifSaved();
  }

  @action
  async selectExistingSpot(spot) {
    this.selectedGeopoint = spot
    this.selectedSpot = await this.loadSpotDetails();
    this.alreadySaved = this.checkifSaved();
  }

  async loadSpotDetails() {
    this.requestOptions = this.prepareRequest();
    return await this.fetchGooglePlaceDetails();
  }

  moveMapToSelectedSpot() {
    this.mapGeolocation.center = { lat: this.selectedSpot.lat, lng: this.selectedSpot.lng };
  }

  prepareRequest() {
    return { placeId: this.selectedGeopoint.googlePlaceId, fields: GOOGLE_DETAILS_FIELDS };
  }

  @action
  fetchGooglePlaceDetails() {
    return new Promise((resolve) => {
      let SpotCreationCallback = (place) => {resolve(new Spot(place, this.selectedGeopoint)) }
      this.googlePlacesService.getDetails(this.requestOptions, SpotCreationCallback);
    });
  }

  @action
  async deleteSpot() {
    let key = this.selectedSpot.key;
    await db.collection("spots").doc(key).delete();
    this.allSpots.splice(this.allSpots.findIndex((spot) => spot.key == key), 1);  
    this.selectedSpot = {};
    this.alreadySaved = false;
  }

  checkifSaved() {
     return  0 <= this.currentUserSpots.findIndex(item => item.googlePlaceId === this.selectedGeopoint.googlePlaceId)
  }

  @computed get uniqueSpotsByGooglePlaceIds() {
    return this.allSpots.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.googlePlaceId === elem.googlePlaceId) }) === index)
  }

  @computed get currentUserSpots() {
    return this.allSpots.filter((element) => element.userId === this.userId )
  }

}

export default spotStore;
