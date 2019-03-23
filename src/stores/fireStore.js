import {observable, action, computed} from 'mobx';
import firebase from 'firebase';
import { Then } from 'react-if';

const db = firebase.firestore().collection("spots");
const users = firebase.firestore().collection("users");

class fireStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  async fetchAllSpots(){
    try {
      return await db.get();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async fetchSingleSpot(docId){
    try {
      return await db.doc(docId).get();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async postSpot(payload){
    try {
      return await db.add(payload);
    } catch(err) {
      alert(err);
    }
  }

  @action
  async deleteSpot(docId){
    try {
      return await db.doc(docId).delete();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async findLikedBy(googlePlaceId){
    try {
      let nameList = []
      let spotList = await db.where("googlePlaceId", "==", googlePlaceId).get();
      await Promise.all(spotList.docs.map(async doc => {
       let userId = doc.data().userId 
       let user = await users.doc(userId).get();
       nameList.push(user.data().displayName)
      }))
      return  [...new Set(nameList)];
    } catch(err) {
      alert(err);
    }
  }


}

export default fireStore;
