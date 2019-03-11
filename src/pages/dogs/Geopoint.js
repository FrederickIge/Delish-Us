class Geopoint {
    constructor(name, latLng, googlePlaceId, key, userId) {
     
        this.name = name;
        this.lat = latLng._lat
        this.lng = latLng._long
        this.googlePlaceId = googlePlaceId;
        this.key = key;
        this.userId = userId;
      
    }
}

export default Geopoint;