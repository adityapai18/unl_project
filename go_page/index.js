const setDestAndRouteMarker = (startCoords) => {
  var coords = sessionStorage.getItem("dest-loc");
  var loc_name = sessionStorage.getItem("dest-name");
  if (coords) {
    var marker = new UnlSdk.Marker().setLngLat(coords.split(",")).addTo(map);
    getRouteArray(startCoords, coords);
    document.getElementById('destination').value = loc_name;
    sessionStorage.removeItem("dest-loc");
    sessionStorage.removeItem("dest-name");
  }
};
const getRouteArray = async (startCoords, endCoords) => {
  console.log(startCoords , endCoords)
  var apiRes = await fetch(
    "https://api.unl.global/v1/routing?format=coordinates",
    {
      body: JSON.stringify({
        mode: "fast",
        waypoints: [
          { type: "point", coordinates: `${startCoords.longitude}, ${startCoords.latitude}` },
          { type: "point", coordinates: endCoords },
        ],
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Unl-Api-Key": "biuV9WvyeSBKpj2sKcNrQklQbIcy8bbm",
        "X-Unl-Vpm-Id": "02ff70f8-88ad-42cd-be58-9af7e7574cb9",
      },
      method: "POST",
    }
  );
  var response = await apiRes.json();
  document.getElementById("eta").innerHTML = "ETA is " + Number(response.overview.duration / 60).toPrecision(2) + " mins";
  if (response.overview.linestring) {
    var pathArray = [];
    response.overview.linestring.map(val=>{
      pathArray.push(val.split(','));
    })
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: pathArray,
        },
      },
    });
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#888",
        "line-width": 8,
      },
    });
  }
};

// const getTime = async (startCoords , endCoords ,mode) =>{
//   var apiRes = await fetch(
//     "https://api.unl.global/v1/routing?format=coordinates",
//     {
//       body: JSON.stringify({
//         mode: "fast",
//         waypoints: [
//           { type: "point", coordinates: `${startCoords.longitude}, ${startCoords.latitude}` },
//           { type: "point", coordinates: endCoords },
//         ],
//         transportMode:mode
//       }),
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-Unl-Api-Key": "biuV9WvyeSBKpj2sKcNrQklQbIcy8bbm",
//         "X-Unl-Vpm-Id": "02ff70f8-88ad-42cd-be58-9af7e7574cb9",
//       },
//       method: "POST",
//     }
//   );
//   var res = await apiRes.json();
//   console.log(res)
//   return res.overview.duration;
// }
