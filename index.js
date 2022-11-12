// import UnlSdk from "unl-map-js";
// const map = new UnlSdk.Map({
//   apiKey: "biuV9WvyeSBKpj2sKcNrQklQbIcy8bbm",
//   vpmId: "02ff70f8-88ad-42cd-be58-9af7e7574cb9",
//   gridControl: true,
//   indoorMapsControl: true,
//   tilesSelectorControl: true,
//   draftShapesControl: true,
//   container: "map",
//   center: [0, 0],
//   zoom: 1,
//   minZoom: 2,
// });
// window.onload = () => {
//   navigator.geolocation.getCurrentPosition(
//     (val) => {
//       console.log(val.coords);
//     },
//     (err) => {
//       alert(err.message);
//     },
//     { enableHighAccuracy: true }
//   );
// };
function setMarkerForCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
    (loc) => {
      var popup = new UnlSdk.Popup({ offset: 25 }).setText(
        "Your Current Location"
      );
      var marker = new UnlSdk.Marker()
        .setLngLat([loc.coords.longitude, loc.coords.latitude])
        .setPopup(popup)
        .addTo(map);
      // // console.log(marker);
      console.log(loc.coords);
    },
    (err) => {
      alert(err.message);
    },
    { enableHighAccuracy: true }
  );
}
