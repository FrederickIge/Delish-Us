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
  
  @observable runTour = false;

  @observable startTour = () => {
    this.runTour = true
  }

  @observable tourSteps 

  @observable DesktopTourSteps = [
    {
      content: "User Guide",
      placement: "center",
      target: "#desktop-map-card",
      title: "How to use Delish-Us"
    },
    {
      content: "Check out the map to see spots saved by other users",
      placement: "left",
      target: "#desktop-map-card",
      title: "The Spot Map"
    },
    {
      content: "You can re-center the map to your current location",
      placement: "auto",
      target: "#dektop-recenter",
      title: "The Spot Map"
    },
    {
      content: "Information about a selectd spot will be displayed here",
      placement: "right",
      target: "#dashbaord-details-wrapper",
      title: "Spot Detail"
    },    
    {
      content: "Don't see your favorite spot? Search it up and add it to the map!",
      placement: "bottom",
      target: "#desktop-search",
      title: "Spot Search"
    },
    {
      content: "See check spots saved by your friends and family",
      placement: "bottom",
      target: "#users-link",
      title: "Users Page"
    }
  ]

  @observable mobileTourSteps = [
    {
      content: "User Guide",
      placement: "center",
      target: "body",
      title: "How to use Delish-Us"
    },
    {
      content: "Check out the map to see spots saved by other users",
      placement: "auto ",
      target: "#mobile-map",
      title: "The Spot Map"
    },
    {
      content: "You can re-center the map to your current location",
      placement: "auto",
      target: "#mobile-recenter",
      title: "The Spot Map"
    },
    {
      content: "Don't see your favorite spot? Search it up and add it to the map!",
      placement: "auto",
      target: "#mobile-search",
      title: "Spot Detail"
    },    
    {
      content: "See check spots saved by your friends and family",
      placement: "bottom",
      target: "#users-link",
      title: "Users Page"
    }
  ]

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

  goToUserHideModal = () =>{ 
    window.addEventListener('touchmove', preventDefault, { passive: false });
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