mapboxgl.accessToken = 'pk.eyJ1IjoidmlrdG9ybTE4MSIsImEiOiJjbDBtdWI3b3IxYWNuM2xvYWJzNzQyeTkyIn0.eXFuDCWOigRsdOARXQZZ6w';

//Generate the map
let map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/viktorm181/cl0qyv1j5006t14pkb9ds73ia",
    center: [-71.104081, 42.365554],
    zoom: 14,
});

const marker = new mapboxgl.Marker();
marker.setLngLat([-71.093729, 42.359244]).addTo(map);


//Layer elements
    const layerList = document.getElementById('menu');
    const inputs = layerList.getElementsByTagName('input');
//Layer selection event
    for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
    };
}
//Current coordinates
// TODO: replace with api data
    const busStops = [
        [-71.093729, 42.359244],
        [-71.094915, 42.360175],
        [-71.0958, 42.360698],
        [-71.099558, 42.362953],
        [-71.103476, 42.365248],
        [-71.106067, 42.366806],
        [-71.108717, 42.368355],
        [-71.110799, 42.369192],
        [-71.113095, 42.370218],
        [-71.115476, 42.372085],
        [-71.117585, 42.373016],
        [-71.118625, 42.374863],
    ];


    // counter here represents the index of the current bus stop
var counter = 0;

function reset(){
    clearTimeout(move());
    counter = 0;
    marker.setLngLat(busStops[counter]);
}
function move() {
    //disable the button
    document.getElementById('MIT_path').disabled = true;
    // Use counter to access bus stops in the array busStops
    loop = true;
    if (loop) {
        setTimeout(() => {
            if (counter >= busStops.length) return;
            marker.setLngLat(busStops[counter]);
            counter++;
            move();
        }, 500);
    }
    document.getElementById('MIT_path').disabled = false;
}
