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
  async fetchAllSpots() {
  
      return await spots.get().then(snapshot =>{
        return snapshot
      }).catch((error)=>{
        console.log(error);
      });

  }

  @action
  async fetchSingleSpot(docId) {
 
      return await spots.doc(docId).get().then(snapshot =>{
        return snapshot
      }).catch((error)=>{
        console.log(error);
      });

  }

  @action
  async fetchSpotsByUserId(userId) {
  
      return await spots.where('userId', '==', userId).get().then(snapshot =>{
        return snapshot
      }).catch((error)=>{
        console.log(error);
      });

  }

  @action
  async postSpot(payload) {
  
      return await spots.add(payload).then(snapshot =>{
        return snapshot
      }).catch((error)=>{
        console.log(error);
      });

  }

  @action
  async deleteSpot(docId) {
   
      return await spots.doc(docId).delete().then(snapshot =>{
        return snapshot
      }).catch((error)=>{
        console.log(error);
      });

  }

  @action
  async findLikedBy(googlePlaceId) {
 
      let nameList = [];

      let spotList = await spots.where('googlePlaceId', '==', googlePlaceId).get();

      await this.newMethod(spotList, nameList);

      return nameList;

  }

  async newMethod(spotList, nameList) {
    await Promise.all(
      spotList.docs.map(async doc => {
        let userId = doc.data().userId;
        let user = await users.doc(userId).get();
        nameList.push({
          userName: user.data().displayName,
          userId: user.id
        });
      })
    );
  }

  @action
  async postComment(comment) {
  
      let result = await comments.add(comment);
      return await comments.doc(result.id).get().then(snapshot =>{
        return snapshot
      }).catch((error)=>{
        console.log(error);
      });

  }

  @action
  async deleteComment(id) {
  
      return await comments
        .doc(id)
        .delete()
        .then(snapshot => {
          return snapshot;
        })
        .catch(error => {
          console.log(error);
        });

  }

  @action
  async getCommentsByGooglePlaceId(id) {
    return await comments
      .where('googlePlaceId', '==', id)
      .orderBy('timeCreated', 'asc')
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action
  async getAllUsers() {
    return await users
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action
  async getUserById(userId) {
    return await users
      .doc(userId)
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action
  async getUserSpots(userId) {
    return await spots
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .catch(error => {
        console.log(error);
      });
  }

  @action
  async getUserComments(userId) {
    return await comments
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        return snapshot;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default fireStore;
