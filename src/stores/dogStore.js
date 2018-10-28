import {observable, action, computed} from 'mobx';


class dogStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  currentDog = null;


}

export default dogStore;
