class Spot {
    constructor(place, latLng, userId) {
        this.name = place.name;
        this.address = place.formatted_address;
        this.rating = place.rating;
        this.image = place.photos[0].getUrl();
        this.lat = latLng.lat
        this.lng = latLng.lng
        this.userId = userId;
    }
}




export default Spot;