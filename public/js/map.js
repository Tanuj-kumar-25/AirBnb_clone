
// maptilersdk.accessToken = mapToken;

maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which the SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: [77.7064, 28.9845], // starting position [lng, lat]
    zoom: 14 // starting zoom
});