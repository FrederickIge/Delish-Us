class Spot {
  constructor(place, spot) {
    this.name = place.name;
    this.address = place.formatted_address;
    this.rating = place.rating;
    this.image = place.photos[0].getUrl();

    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();

    this.userId = spot.userId;
    this.key = spot.key;
    this.googlePlaceId = spot.googlePlaceId;
  }
}

export default Spot;
