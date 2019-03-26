import { action} from 'mobx';
import firebase from 'firebase';

const db = firebase.firestore().collection("spots");
const users = firebase.firestore().collection("users");
const comments = firebase.firestore().collection("comments");

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

  @action
  async postComment(comment){
    try {
      let result =  await comments.add(comment);
       return  await comments.doc(result.id).get();
    } catch(err) {
      alert(err);
    }
  }

  // @action
  // async deleteComment(comment){
  //   try {
  //     let result =  await comments.add(comment);
  //      return  await comments.doc(result.id).get();
  //   } catch(err) {
  //     alert(err);
  //   }
  // }

  @action
  async getCommentsBySpotId(spotId){
    console.log(spotId)
    try {
     return await comments.where("spotId", "==", spotId).orderBy("timeCreated", "asc").get();
    
    } catch(err) {
      console.log(err);
    }
  }


}

export default fireStore;
