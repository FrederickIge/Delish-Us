class Geopoint {
    constructor(doc) {
        if (doc.exists) {
            this.name = doc.data().name;
            this.lat = doc.data().latLng._lat
            this.lng = doc.data().latLng._long
            this.googlePlaceId = doc.data().googlePlaceId;
            this.key = doc.id;
            this.userId = doc.data().userId;
        }
        else {
            this.name = doc.name;
            this.googlePlaceId = doc.placeId;
        }

    }
}

export default Geopoint;