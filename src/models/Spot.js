import { observable, action } from "mobx";


 
function Spot (place, spot)  {

return {
    name : place.name,
    address : place.formatted_address,
    rating : place.rating,
    image : place.photos[0].getUrl(),
    lat : place.geometry.location.lat(),
    lng : place.geometry.location.lng(),
    userId : spot.userId,
    key : spot.key? spot.key : null,
    googlePlaceId : spot.googlePlaceId
}
}

export default Spot;
