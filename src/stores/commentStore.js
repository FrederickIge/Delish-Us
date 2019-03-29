import { observable, action,computed, autorun } from "mobx";
import preventDefault from "../utils/eventListeners"
import { enableBodyScroll } from 'body-scroll-lock';

class CommentStore {
 

  constructor(root) {
    console.log(root)
    this.spotStore = root.spotStore;
    this.fireStore = root.fireStore;
  }

  @observable comments = [];

  getCommentsByGooglePlaceId = async() => {
    this.comments = [];
    let data = await this.fireStore.getCommentsByGooglePlaceId(this.spotStore.selectedSpot.googlePlaceId);
    if(!data.empty){
      data.forEach((doc) => {
        let comment = new Comment(doc)
        this.comments.push(comment)
      });
    
    }
    this.getfirstComment();
    
  }

  getfirstComment(){
    console.log(this.comments)
    if(this.comments[0]){
      this.firstComment = this.comments[0].comment
      this.firstComment=  this.firstComment.substr(0, 80 - 1) + (this.firstComment.length > 80 ? '...' : '');
    }else{
      this.firstComment = "";
    }
  }


}

export default CommentStore;