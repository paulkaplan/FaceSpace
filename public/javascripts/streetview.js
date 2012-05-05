var panorama, panoOptions;
$(document).ready( function() {
  var fenway = new google.maps.LatLng(42.345573,-71.098326);

  // Note: constructed panorama objects have visible: true
  // set by default.
  panoOptions = {
    position: fenway,
    heading: 120,
    addressControlOptions: {
      position: google.maps.ControlPosition.BOTTOM
    },
    linksControl: false,
    panControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    enableCloseButton: false
  };

  panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"), panoOptions);
});