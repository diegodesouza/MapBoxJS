window.onload = function() {

  L.mapbox.accessToken = 'pk.eyJ1IjoiZGllZ29kZXNvdXphIiwiYSI6InRiNEE5Y3cifQ.5ZBGsIEWYBVOo5FZpW6V9w';
  window.map = L.mapbox.map('map', null, { minZoom: 1 });

  var layers = {
    "Street map": L.mapbox.tileLayer('diegodesouza.l5g73djj'),
    "Satellite": L.mapbox.tileLayer('diegodesouza.l5gbd6e0')
  };

  layers["Street map"].addTo(map);
  L.control.layers(layers).addTo(map);

  L.control.scale({imperial: false, position: "bottomright"}).addTo(map);

  <!-- //remove attribution displayed on the map -->
  map.addControl(L.mapbox.infoControl({position: "bottomleft"}));
  map.removeControl(map.attributionControl)

  map.setView([42.3583333, -71.0636], 15);
}

window.onLoad = function() {
  setupMap();

  var marker = L.marker(markers.features[0].geometry.coordinates.reverse(),
    {title: markers.features[0].properties.description });
  marker.addTo(map);

  function onSuccess(position) {
    marker.setLatLng([position.coordinates.latitude, position.coordinates.longitude]);
  }

  function onError(error) {
    console.log("Position error: ", error.code, error.message);
  }

  window.watchId = navigator.geolocation.watchPosition(onSucess, onError,
  {maximumAge: 0, timeout: 6000, enableHighAccuracy: true});

  var layer = L.geoJson(markers, {
    pointTolayer: function(feature, LatLng) {
      return L.marker(LatLng, {
        title: "hello world",
        'marker-color': '#f86767'
      });
    },
    onEachFeature: function (feature, Layer) {
      Layer.bindPopup(feature.properties.title)
    }

  });

  layer.addTo(map);

};
