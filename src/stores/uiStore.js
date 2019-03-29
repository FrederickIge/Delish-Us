import { observable, action,computed, autorun } from "mobx";
import preventDefault from "../utils/eventListeners"
import { enableBodyScroll } from 'body-scroll-lock';

class UiStore {
 

  constructor(root) {
  }

  @observable drawerState = false; //ui

  @observable mapView = true;  //ui

  @observable hideMobileMap = true;  //ui

  @observable showModal = false;  //ui

  @action //ui
  toggleDrawer = () => {
    if(window.innerWidth <= 992){
    this.drawerState = !this.drawerState
    }
  }

  handleHide = () => { //ui
   
    window.addEventListener('touchmove', preventDefault, { passive: false });
    this.toggleDrawer();
    this.showModal = false;
  }

  handleShow = async () => { //ui
    window.removeEventListener('touchmove', preventDefault); 
    this.toggleDrawer();
    this.showModal = true;
  }


  @action 
  toggleView = () => {
    this.mapView = !this.mapView;
    if(this.mapView){
      window.scrollTo(0,0);
     
      window.addEventListener('touchmove', preventDefault, { passive: false });
    }
    else if(!this.mapView){
      window.scrollTo(0,0);
      enableBodyScroll(this.targetElement);
      window.removeEventListener('touchmove', preventDefault);
    }
  }


}

export default UiStore;