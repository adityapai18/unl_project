var sharedMarker;
window.onload = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.loc;
  if (value) {
    const sharedLoc = window.atob(value).split(",");
    var popup = new UnlSdk.Popup({ offset: 25 }).setText("Shared Location");
    sharedMarker = new UnlSdk.Marker()
      .setLngLat(sharedLoc)
      .setPopup(popup)
      .addTo(map);
    var htmlVal = document.getElementById("navBarButton").innerHTML;
    document.getElementById("navBarButton").innerHTML =
      '<button onclick="routeToSharedLoc()" class="h-[24px] w-[24px] mr-3 text-blue-500"><span class="material-symbols-outlined "> assistant_direction </span></button>' +
      htmlVal;
  }
  var res = await fetch("http://localhost:5000/admin/reports/list", {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiJpN2NkeTA4MWptIiwiaWF0IjoxNjY4Njg5ODg0LCJleHAiOjE2NjkyODk4ODR9.ud2hjSxBDx33iVRTdJ6IYV_WA_mFqWAJN1wzPwd3FPE",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        select: ["lat", "long", "type"],
      },
      isCountOnly: false,
    }),
  });
  var response = await res.json();
  var potholeArr = [];
  var manholeArr = [];
  var accArr = [];
  var lightArr = [];
  response.data.data.map((val) => {
    if (val.type === "pothole") {
      potholeArr.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [val.long, val.lat],
        },
        properties: {},
      });
      var popup = new UnlSdk.Popup({ offset: 25 }).setText("pothole");
      new UnlSdk.Marker({
        color: "#6fd1e2",
      })
        .setLngLat([val.long, val.lat])
        .setPopup(popup)
        .addTo(map);
    }
    if (val.type === "manholes") {
      manholeArr.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [val.long, val.lat],
        },
        properties: {},
      });
      var popup = new UnlSdk.Popup({ offset: 25 }).setText("manhole");
      new UnlSdk.Marker({
        color: "#0e6fc6",
      })
        .setLngLat([val.long, val.lat])
        .setPopup(popup)
        .addTo(map);
    }
    if (val.type === "accidents") {
      accArr.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [val.long, val.lat],
        },
        properties: {},
      });
      var popup = new UnlSdk.Popup({ offset: 25 }).setText("accident");
      new UnlSdk.Marker({
        color: "#f77c5e",
      })
        .setLngLat([val.long, val.lat])
        .setPopup(popup)
        .addTo(map);
    }
    if (val.type === "streetlights") {
      lightArr.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [val.long, val.lat],
        },
        properties: {},
      });
      var popup = new UnlSdk.Popup({ offset: 25 }).setText("streetlight");
      new UnlSdk.Marker({
        color: "#f7d25e",
      })
        .setLngLat([val.long, val.lat])
        .setPopup(popup)
        .addTo(map);
    }
  });
  map.on(
    "load",
    function () {
      // Add an image to use as a custom marker
      // map.loadImage(
      //   "../assets/pothole.png",
      //   function (error, image) {
      //     if (error) throw error;
      //     map.addImage("custom-marker", image);
      // Add a GeoJSON source with 15 points
      map.addSource("potholes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: potholeArr,
        },
      });
      map.addSource("streetlight", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: lightArr,
        },
      });
      map.addSource("accident", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: accArr,
        },
      });
      map.addSource("manhole", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: manholeArr,
        },
      });
      // map.addLayer({
      //   id: "conferences",
      //   type: "symbol",
      //   source: "conferences",
      //   layout: {
      //     "icon-image": "custom-marker",
      //     // get the year from the source's "year" property
      //     // "text-field": ["get", "year"],
      //     // "text-font": ["Fira GO Regular"],
      //     // "text-offset": [0, 1.25],
      //     // "text-anchor": "top",
      //   },
      // });
    }
    // );
  );
};
const routeToSharedLoc = () => {
  var coords = sharedMarker.getLngLat();
  if (coords) {
    sessionStorage.setItem("dest-loc", coords.lng + "," + coords.lat);
    sessionStorage.setItem("dest-name", "Shared Location");
    window.location.href = "../go_page/";
  }
};
