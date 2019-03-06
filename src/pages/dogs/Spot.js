class Spot {
    constructor(place) {
        this.name = place.name;
        this.address = place.formatted_address;
        this.rating = place.rating;
        this.image = place.photos[0].getUrl();
    }
}

export default Spot;