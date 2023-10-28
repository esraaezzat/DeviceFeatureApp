
export class Place{
    constructor(title, imageUri, location, id){
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address
        this.location = {lat: location.lat, lng: location.lng} // has obj of Longitude and latitude lines ex: {lat: 890.252, lng: 56.144}
        this.id = id;
    }
}