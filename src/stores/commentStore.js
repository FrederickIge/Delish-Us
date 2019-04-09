import { observable } from "mobx";
import Comment from "../models/Comment";

class CommentStore {

  constructor(root) {
    this.root = root;
  }

  @observable comments = [];

  @observable firstComment;

  getCommentsByGooglePlaceId = async() => {
    this.comments = [];
    let data = await this.root.fireStore.getCommentsByGooglePlaceId(this.root.spotStore.selectedSpot.googlePlaceId);
    console.log(data)
    if(!data.empty){
    
      data.forEach((doc) => {
        let comment = new Comment(doc)
        this.comments.push(comment)
      });
      console.log(this.comments)
    }
    this.getfirstComment();
    
  }

  getfirstComment(){
 
    if(this.comments[0]){
      this.firstComment = this.comments[0].comment
      this.firstComment=  this.firstComment.substr(0, 80 - 1) + (this.firstComment.length > 80 ? '...' : '');
    }else{
      this.firstComment = "";
    }
  }


}

export default CommentStore;