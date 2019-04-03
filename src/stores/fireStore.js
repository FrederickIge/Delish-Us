import { action} from 'mobx';
import firebase from 'firebase';

const spots = firebase.firestore().collection("spots");
const users = firebase.firestore().collection("users");
const comments = firebase.firestore().collection("comments");

class fireStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    
  }

  @action
  async fetchAllSpots(){
    try {
      return await spots.get();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async fetchSingleSpot(docId){
    try {
      return await spots.doc(docId).get();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async fetchSpotsByUserId(userId){
    try {
      return await spots.where("userId", "==", userId).get();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async postSpot(payload){
    try {
      return await spots.add(payload);
    } catch(err) {
      alert(err);
    }
  }

  @action
  async deleteSpot(docId){
    try {
      return await spots.doc(docId).delete();
    } catch(err) {
      alert(err);
    }
  }

  @action
  async findLikedBy(googlePlaceId){
    try {

      let nameList = []

      let spotList = await spots.where("googlePlaceId", "==", googlePlaceId).get();

      await this.newMethod(spotList, nameList);

      return  nameList;

    } catch(err) {
      alert(err);
    }
  }

  async newMethod(spotList, nameList) {
    await Promise.all(spotList.docs.map(async (doc) => {
      let userId = doc.data().userId;
      let user = await users.doc(userId).get();
      nameList.push(

       {
         userName: user.data().displayName,
         userId:user.id
        }


        );
    }));
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
  async getCommentsByGooglePlaceId(id){
    console.log(id)
    try {
     return await comments.where("googlePlaceId", "==", id).orderBy("timeCreated", "asc").get();
    
    } catch(err) {
      console.log(err);
    }
  }

  @action
  async getAllUsers(){
    console.log()
    try {
     return await users.get();
    
    } catch(err) {
      console.log(err);
    }
  }

  @action
  async getUserById(userId){
    console.log()
    try {
     return await users.doc(userId).get();
    
    } catch(err) {
      console.log(err);
    }
  }

  @action
  async getUserSpots(userId){
    try {
     return await spots.where("userId", "==", userId).get();
    
    } catch(err) {
      console.log(err);
    }
  }

  @action
  async getUserComments(userId){
    try {
     return await comments.where("userId", "==", userId).get();
    
    } catch(err) {
      console.log(err);
    }
  }


}

export default fireStore;
