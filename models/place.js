
class Place{
    constructor(title, imageUri, address, location){
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location // has obj of Longitude and latitude lines ex: {lat: 890.252, lng: 56.144}
        this.id = new Date().toString() + Math.random().toString();
    }
}