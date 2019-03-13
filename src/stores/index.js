import { configure } from 'mobx';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import SessionStore from './sessionStore';
import UserStore from './userStore';
import fireStore from './fireStore';
import spotStore from './spotStore';

const browserHistory = createBrowserHistory();

const routingStore = new RouterStore();

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.fireStore= new fireStore(this);
    this.routingStore = new RouterStore(this);
    this.spotStore = new spotStore(this);
  }
}


const rootStore = new RootStore();

export default rootStore;