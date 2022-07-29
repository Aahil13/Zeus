class Location {
  constructor() {
    this.getPosition();
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition(this.getCoords, this.error);
  }

  set getCoords(position) {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  }

  error(err) {
    console.error(err);
  }
}


export default function () {
  getCoords;
}
