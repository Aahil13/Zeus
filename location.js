function getPosition() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function getCoordinates() {
  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  } catch (err) {
    console.error(err.message);
  }
}

await getCoordinates();
