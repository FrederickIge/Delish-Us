import { RouterStore } from 'mobx-react-router';

import SessionStore from './sessionStore';
import UserStore from './userStore';
import FireStore from './fireStore';
import spotStore from './spotStore';
import UiStore from './uiStore'
import CommentStore from './commentStore'

class RootStore {
  constructor() {
    this.fireStore= new FireStore(this);
    this.spotStore = new spotStore(this);
    this.commentStore = new CommentStore(this);
    

    this.sessionStore = new SessionStore(this);
    this.uiStore = new UiStore(this);
    this.userStore = new UserStore(this);
    this.routingStore = new RouterStore(this);
  }
}


const rootStore = new RootStore();

export default rootStore;