const shareLocation = (marker) => {
  // navigator.share({url:do});
  var coords = marker.getLngLat();

  var loc = coords.lng.toString() + "," + coords.lat.toString();
  loc = window.btoa(loc);
  if (window.location.protocol != "https:") {
    navigator.share({
      url: window.location.origin + "/landing_page/?loc=" + loc,
    });
  } else {
    navigator.share({
      url: window.location.origin + "/unl_project/landing_page/?loc=" + loc,
    });
  }

  // console.log(window.location.origin);
};
