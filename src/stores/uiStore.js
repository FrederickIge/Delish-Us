import { observable, action } from "mobx";
import preventDefault from "../utils/eventListeners"
import { disableBodyScroll, enableBodyScroll,clearAllBodyScrollLocks } from 'body-scroll-lock';

class UiStore {

  constructor(root) {
    this.root = root;
    this.targetElement = document.querySelector('#modal');
  }
 
  @observable drawerState = false; 

  @observable mapView = true;  

  @observable hideMobileMap = true;  

  @observable modalState = false;  

  @action openDrawer=() =>{
      this.drawerState = true
  }

  @action closeDrawer = () => {
    this.drawerState = false;
    document.body.style.overflowY = "auto";
  }

  @action openDrawerDelayed(){
      setTimeout(() =>  this.drawerState = true, 800);
  }

  hideModal = () =>{ 
    window.addEventListener('touchmove', preventDefault, { passive: false });
    this.openDrawer();
    this.modalState = false;
    window.scrollTo(0, 0);
    document.body.style.overflowY = "auto";
  }

  showModal = () => { 
    window.removeEventListener('touchmove', preventDefault); 
    this.modalState = true;
    this.closeDrawer();
    
  }




}

export default UiStore;