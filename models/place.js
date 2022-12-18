export class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = { lat: location.lat, lng: location.lng }; // {lat: 0.141, lng: 127.11}
    this.id = new Date().toString() + Math.random().toString();
  }
}
