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
    // clearAllBodyScrollLocks();
  
    this.openDrawer();
    this.modalState = false;
    window.scrollTo(0, 0);
    document.body.style.overflowY = "auto";
  }

  showModal = () => { 
    window.removeEventListener('touchmove', preventDefault); 
    // this.targetElement = document.querySelector('#modal');
    // disableBodyScroll(this.targetElement);
   this.modalState = true;
    this.closeDrawer();
    
  }

  @action 
  toggleView = () => {
    this.mapView = !this.mapView;
    if(this.mapView){
      // window.scrollTo(0,0);
      // enableBodyScroll(this.targetElement);
      // window.addEventListener('touchmove', preventDefault, { passive: false });
    }
    else if(!this.mapView){
      // window.scrollTo(0,0);
      // disableBodyScroll(this.targetElement);
      // window.removeEventListener('touchmove', preventDefault);
    }
  }


}

export default UiStore;