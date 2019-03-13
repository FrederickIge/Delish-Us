import {observable, action, computed} from 'mobx';
import firebase from 'firebase';

const db = firebase.firestore().collection("spots");

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


}

export default fireStore;
