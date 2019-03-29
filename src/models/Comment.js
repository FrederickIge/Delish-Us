class Comment {
    constructor(doc) {
   
      this.id = doc.id;
      this.userName = doc.data().userName; 
      this.timeCreated = doc.data().timeCreated;
      this.userId = doc.data().userId;
      this.spotId = doc.data().spotId;
      this.comment = doc.data().comment;
      console.log(this)
    }
  }
  
  export default Comment;
  