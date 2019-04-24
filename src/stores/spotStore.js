/* eslint-disable no-undef */
import { observable, action,computed, extendObservable ,set} from "mobx";
import { DEFAULT_GEOLOCATION, GOOGLE_DETAILS_FIELDS } from "../constants/mapConstants";
import Spot from "../models/Spot";
import firebase from 'firebase';
import Geopoint from "../models/Geopoint";
import { toast } from 'react-toastify';



class spotStore {
 
  constructor(root) {
    this.root = root;
    this.targetElement = document.querySelector('#root');
  }

  @observable googlePlacesService;

  @observable selectedSpot = {};

  @observable mapGeolocation = DEFAULT_GEOLOCATION;

  @observable gmapsLoaded = false;

  @observable requestOptions;

  @observable allSpots = [];

  @observable showAllSpots = true;

  @observable alreadySaved = true;

  @observable selectedGeopoint;

  @observable likedBy = [];

  @observable userGeoLocation = {};

  @observable maps = null;

  @observable map = null;

  @observable mapZoom = 11
  
  @observable savedGeolocation;

  apiIsLoaded(map, maps){
    
    this.googlePlacesService = new maps.places.PlacesService(map);
    this.maps = maps
    this.map = map
    this.gmapsLoaded = true;
  }

  @action
  async selectSearchedSpot(geopoint) {
    this.selectedGeopoint = new Geopoint(geopoint);
    this.selectedSpot = await this.loadSpotDetails();
    this.moveMapToSelectedSpot();
    this.alreadySaved = this.checkifSaved();
    this.findLikedBy();
    this.root.uiStore.openDrawerDelayed();
    this.root.commentStore.getCommentsByGooglePlaceId();
  }

  @action
  async getRandomSpot() {
    let randomSpot = this.allSpots[Math.floor(Math.random() * this.allSpots.length)];
    // await this.selectExistingSpot(randomSpot);
    this.selectedGeopoint = randomSpot;
    this.selectedSpot = await this.loadSpotDetails();
    this.alreadySaved = this.checkifSaved();
    this.root.uiStore.openDrawerDelayed();
    this.findLikedBy();
    this.root.commentStore.getCommentsByGooglePlaceId();
    this.moveMapToSelectedSpot();
  }

  @action
  async selectExistingSpot(spot) {
    this.selectedGeopoint = spot;
    this.selectedSpot = await this.loadSpotDetails();
    this.alreadySaved = this.checkifSaved();
    this.root.uiStore.openDrawer();
    this.findLikedBy();
    this.root.commentStore.getCommentsByGooglePlaceId();
  }

  @action
  async selectExistingSpotMobile(spot) {
    console.log(spot)
    this.selectedGeopoint = spot;
    this.selectedSpot = await this.loadSpotDetails();
    this.alreadySaved = this.checkifSaved();
    this.root.uiStore.openDrawerDelayed();
    this.findLikedBy();
    this.root.commentStore.getCommentsByGooglePlaceId();
  }


 
  @action
  async getAllSpots() {
    let querySnapshot = await this.root.fireStore.fetchAllSpots();
    this.displaySpots(querySnapshot);
  }

  @action
  async saveSpot() {
    let payload = this.prepareSpotPayload();
    let docRef = await this.root.fireStore.postSpot(payload);
    await this.displayNewSpot(docRef);
    toast("Spot Saved !");
    this.alreadySaved = this.checkifSaved();
    this.root.commentStore.getCommentsByGooglePlaceId();
    this.findLikedBy();
  }

  @action
  async deleteSpot() {
    let key = this.selectedSpot.key;
    await this.root.fireStore.deleteSpot(this.selectedSpot.key);
    toast("Spot Deleted !");
    this.allSpots.splice(this.allSpots.findIndex((spot) => spot.key === key), 1);  
    this.selectedSpot = {};
    this.alreadySaved = false;
  
  }

  displaySpots(querySnapshot) {
    querySnapshot.forEach((doc) => {
      let geopoint = new Geopoint(doc);

      if (this.allSpots.find(x => x.key === doc.id)){

      }else{
        this.allSpots.push(geopoint);
      }

    });
  }

  prepareSpotPayload() {
    return {
      name: this.selectedSpot.name,
      latLng: new firebase.firestore.GeoPoint(this.selectedSpot.lat, this.selectedSpot.lng),
      googlePlaceId: this.selectedSpot.googlePlaceId,
      userId: this.root.sessionStore.authUser.uid
    };
  }


  @action
  async displayNewSpot(docRef) {
    let doc = await this.root.fireStore.fetchSingleSpot(docRef.id)
    this.allSpots.push(new Geopoint(doc));
    this.selectedSpot.key = docRef.id;
    set(this.selectedSpot, { "key" : docRef.id})

  }

  async loadSpotDetails() {
    this.requestOptions = this.prepareRequest();
    return await this.fetchGooglePlaceDetails();
  }

  moveMapToSelectedSpot() { 
    this.mapGeolocation = { lat: this.selectedSpot.lat, lng: this.selectedSpot.lng };
    this.mapZoom = 14
  }

  prepareRequest() {
    return { placeId: this.selectedGeopoint.googlePlaceId, fields: GOOGLE_DETAILS_FIELDS };
  }

  @action
  fetchGooglePlaceDetails() {
    return new Promise((resolve) => {
      let SpotCreationCallback = (place) => {
        resolve(Spot(place, this.selectedGeopoint)) 
      }
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
    return this.allSpots.filter((element) => element.userId === this.root.sessionStore.authUser.uid );
  }

  async findLikedBy() {
    this.likedBy = await this.root.fireStore.findLikedBy(this.selectedSpot.googlePlaceId);
  }

  recenterMap = () => {
    this.mapGeolocation = this.savedGeolocation;
    this.mapZoom = 11;
  }

}

export default spotStore;
