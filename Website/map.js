const map = new L.map("map", { zoomControl: false }).setView(
  [40.75, -73.92],
  11.5
);
// const censusTractLayers = L.layerGroup().addTo(map);
const allGeojson = "../Data/NoiseCount_CensusTract.geojson";
const dayTimeGeojson = "../Data/NoiseCount_Day.geojson";
const nightTimeGeojson = "../Data/NoiseCount_Night.geojson";
const janGeojson = "../Data/Jan.geojson";
const febGeojson = "../Data/Feb.geojson";
const marGeojson = "../Data/Mar.geojson";
const aprGeojson = "../Data/Apr.geojson";
const mayGeojson = "../Data/May.geojson";
const junGeojson = "../Data/Jun.geojson";
const julGeojson = "../Data/Jul.geojson";
const augGeojson = "../Data/Aug.geojson";
const sepGeojson = "../Data/Sep.geojson";
const octGeojson = "../Data/Oct.geojson";
const novGeojson = "../Data/Nov.geojson";
const decGeojson = "../Data/Dec.geojson";

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{userName}/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    maxZoom: 15,
    scrollWheelZoom: false,
    doubleClickZoom: true,
    userName: "cloudlun",
    id: "cl2eq8ceb000a15o06rah6zx5",
    accessToken:
      "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw",
  }
).addTo(map);

L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

function censusTractColor(d) {
  return d > 50000000000
    ? "#dc2c18"
    : d > 15000000000
    ? "#ff5a00"
    : d > 10000000000
    ? "#ffac00"
    : d > 5000000000
    ? "#ffd53e"
    : "#fff8a5";
}
function mapStyle(features) {
  return {
    fillColor: censusTractColor(features.properties.noise_count),
    fillOpacity: 0.7,
    color: "white",
    weight: 0.05,
    opacity: 1,
  };
}
function mapingRanderHandler(file) {
  let polygonLayers = L.layerGroup().addTo(map);
  d3.json(file).then((polygon) => {
    console.log(polygon);
    const censusTract = L.geoJSON(polygon, {
      style: mapStyle,
    });
    polygonLayers.addLayer(censusTract);
  });
}

mapingRanderHandler(allGeojson);

d3.selectAll("#time-button").on("click", function () {
  clickValue = this.value;
  if (clickValue == "All") {
    mapingRanderHandler(allGeojson);
  }
  if (clickValue == "Daytime") {
    mapingRanderHandler(dayTimeGeojson);
  }
  if (clickValue == "Nighttime") {
    mapingRanderHandler(nightTimeGeojson);
  }
});





function monthMapsHandler() {
  const month = [
    janGeojson,
    febGeojson,
    marGeojson,
    aprGeojson,
    mayGeojson,
    junGeojson,
    julGeojson,
    augGeojson,
    sepGeojson,
    octGeojson,
    novGeojson,
    decGeojson,
  ];
  let mf = 0;
  let monthFramesInterval = setInterval(monthFramesRender, 1500);
  function monthFramesRender(){
    mapingRanderHandler(month[mf]);
    mf += 1
    if (mf === month.length) clearInterval(monthFramesInterval);
    d3.select('.day').on('click', function() {
      clearInterval(monthFramesInterval)
      mapingRanderHandler(dayTimeGeojson)
    })
    d3.select('.night').on('click', function() {
      clearInterval(monthFramesInterval)
      mapingRanderHandler(nightTimeGeojson)
    })
    d3.select('.backToAll').on('click', function() {
      clearInterval(monthFramesInterval)
      mapingRanderHandler(allGeojson)
    })
  }

}


// d3.csv("../Data/noiseGeo.csv").then((data) => {
//   data.forEach((d) => {
//     d["latitude"] = +d["latitude"];
//     d["longitude"] = +d["longitude"];
//   });
//   for (let i = 0; i < 10000; i++) {
//     addMarker(data[i]);
//   }
// });
