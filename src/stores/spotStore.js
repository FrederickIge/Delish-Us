import { observable, action,computed, autorun } from "mobx";
import { DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS } from "../constants/mapConstants";
import Spot from "../models/Spot";
import firebase from 'firebase';
import Geopoint from "../models/Geopoint";
import { toast } from 'react-toastify';


class spotStore {
 
  constructor(root) {
    autorun(() => root.sessionStore.authUser ? this.userId = root.sessionStore.authUser.uid : null);
    this.fireStore = root.fireStore
  }

  @observable googlePlacesService;

  @observable selectedSpot = { };

  @observable mapGeolocation = DEFAULT_GEOLOCATION;

  @observable gmapsLoaded = false;

  @observable requestOptions;

  @observable googlePlaceId;

  @observable allSpots = [];

  @observable userId; 

  @observable showAllSpots = true;

  @observable alreadySaved = true;

  @observable selectedGeopoint;

  @observable drawerState = false;

  @observable mapView = true;

  @observable likedBy = []

  @action
  async selectSearchedSpot(geopoint) {
    this.selectedGeopoint = new Geopoint(geopoint);
    this.selectedSpot = await this.loadSpotDetails();
    this.moveMapToSelectedSpot();
    this.alreadySaved = this.checkifSaved();
    this.toggleDrawer();
  }

  @action
  async getRandomSpot() {
    let randomSpot = this.allSpots[Math.floor(Math.random() * this.allSpots.length)];
    await this.selectExistingSpot(randomSpot);
    this.moveMapToSelectedSpot();
  }

  @action
  async selectExistingSpot(spot) {
    console.log("select")
    this.selectedGeopoint = spot;
    this.selectedSpot = await this.loadSpotDetails();
    this.alreadySaved = this.checkifSaved();
    this.toggleDrawer();
    this.findLikedBy()
  }
 
  @action
  async getAllSpots() {
    let querySnapshot = await this.fireStore.fetchAllSpots();
    this.displaySpots(querySnapshot);
  }

  @action
  async saveSpot() {
    let payload = this.prepareSpotPayload();
    let docRef = await this.fireStore.postSpot(payload);
    await this.displayNewSpot(docRef);
    toast("Spot Saved !");
    this.alreadySaved = this.checkifSaved();
  }

  @action
  async deleteSpot() {
    let key = this.selectedSpot.key;
    await this.fireStore.deleteSpot(this.selectedSpot.key);
    toast("Spot Deleted !");
    this.allSpots.splice(this.allSpots.findIndex((spot) => spot.key === key), 1);  
    this.selectedSpot = {};
    this.alreadySaved = false;
  }

  displaySpots(querySnapshot) {
    querySnapshot.forEach((doc) => {
      let geopoint = new Geopoint(doc);
      this.allSpots.push(geopoint);
    });
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
    let doc = await this.fireStore.fetchSingleSpot(docRef.id)
    this.allSpots.push(new Geopoint(doc));
    this.selectedSpot.key = doc.id;
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

  checkifSaved() {
     return  0 <= this.currentUserSpots.findIndex(item => item.googlePlaceId === this.selectedGeopoint.googlePlaceId);
  }

  @computed get uniqueSpotsByGooglePlaceIds() {
    return this.allSpots.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.googlePlaceId === elem.googlePlaceId) }) === index);
  }

  @computed get currentUserSpots() {
    return this.allSpots.filter((element) => element.userId === this.userId );
  }
  
  @action
  toggleDrawer = () => {
    if(window.innerWidth <= 992){
    this.drawerState = !this.drawerState
    }
  }

  @action
  toggleView = () => {
    this.mapView = !this.mapView;
  }

  async findLikedBy() {
     this.likedBy = await this.fireStore.findLikedBy(this.selectedSpot.googlePlaceId);
  }

}

export default spotStore;
