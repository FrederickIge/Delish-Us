import {observable, computed} from 'mobx';
import Comment from '../models/Comment';

class CommentStore {
  constructor(root) {
    this.root = root;
  }

  @observable comments = [];

  fireStoreData;

  getCommentsByGooglePlaceId = async () => {
    this.comments = [];

    this.fireStoreData = await this.root.fireStore.getCommentsByGooglePlaceId(this.root.spotStore.selectedSpot.googlePlaceId);
console.log(this.fireStoreData)
    return this.fireStoreData.empty ? null : this.displayComments();
  };

  displayComments() {
    this.fireStoreData.forEach(doc => {
      let comment = new Comment(doc);
      this.comments.push(comment);
    });
  }

  deleteComment = async (id) =>{
    await this.root.fireStore.deleteComment(id);

    const result = this.comments.filter(comment => comment.id != id);

    this.comments = result;
  }

  @computed get hasCommented() {
    let result = this.comments.find(x => x.userId === 'pj7XQzQbVgUx2NZFtRhSK7DdY9c2');
    return result ? true : false;
  }
}

export default CommentStore;
