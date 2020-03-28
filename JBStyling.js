var mymap = L.map('mapid').setView([47.5301, -122.0326], 13);
var bindstring = "Issaquah";
var mapClickState = 0;
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

function plotdraggablepoint() {
  var locationfield = document.getElementById("locationfield");
  var latitude, longitude;
  if (document.getElementById("locationfield2").value != 0 && document.getElementById("locationfield3").value != 0) {
    latitude = document.getElementById("locationfield2").value;
    longitude = document.getElementById("locationfield3").value;
  } else {
    latitude = 47.5301;
    longitude = -122.0326;
  }
  mymap.setView([latitude, longitude], 13);
  bindstring = locationfield.value;
  var marker = L.marker([latitude, longitude], {
    riseOnHover: true,
    draggable: true
  }).addTo(mymap);
  marker.bindTooltip(bindstring, {
    className: 'tooltipclass'
  }).openTooltip();
  var circle = L.circle([latitude, longitude], 100, {
    riseOnHover: true
  }).addTo(mymap);
}

function startRuler() {
  // firstPlotted = false;
  // secondPlotted = false;
  //
  // function onMapClick(event) {
  //   let marker = L.marker(event.latlng, {
  //     draggable: true,
  //     title: "Ruler point",
  //     alt: "Ruler point",
  //     riseOnHover: true
  //   });
  // }

  // Add ruler source code here
}

var circle = L.circle([47.6163, -122.0356], 600, {
  riseOnHover: true
}).addTo(mymap);
circle.on({
  mousedown: function() {
    if (mapClickState === 0) {
      mymap.on('mousemove', function(e) {
        circle.setLatLng(e.latlng);
      });
      mapClickState = 1;
    } else if (mapClickState === 1) {
      mapClickState = 0;
      mymap.removeEventListener('mousemove');
    }
  }
});

// Close sidebar when ESC pressed
document.onkeydown = function(event) {
  event = event || window.event;
  if (event.keyCode == 27) {
    document.getElementById("slider").checked = false;
  }
};
