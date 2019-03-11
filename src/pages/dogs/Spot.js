class Spot {
    constructor(place, latLng) {
        console.log(place)
        this.name = place.name;
        this.address = place.formatted_address;
        this.rating = place.rating;
        this.image = place.photos[0].getUrl();
        this.lat = latLng.lat
        this.lng = latLng.lng
    }
}




export default Spot;