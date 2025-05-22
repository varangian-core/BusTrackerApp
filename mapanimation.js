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

// animation control variables
let animationId = null;
let paused = false;
let progress = 0;


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

map.on('load', () => {
    map.addSource('route', {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: busStops
            }
        }
    });
    map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#888',
            'line-width': 4
        }
    });
});


// counter represents the index of the current bus stop
let counter = 0;

function reset() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    counter = 0;
    progress = 0;
    paused = false;
    marker.setLngLat(busStops[counter]);
    document.getElementById('MIT_path').disabled = false;
}

function getSpeed() {
    const el = document.getElementById('speed');
    return el ? parseFloat(el.value) : 0.01;
}

function animate() {
    if (paused) {
        animationId = null;
        return;
    }
    if (counter >= busStops.length - 1) {
        document.getElementById('MIT_path').disabled = false;
        animationId = null;
        return;
    }

    const start = busStops[counter];
    const end = busStops[counter + 1];
    progress += getSpeed();

    if (progress >= 1) {
        progress = 0;
        counter++;
    }

    const lng = start[0] + (end[0] - start[0]) * progress;
    const lat = start[1] + (end[1] - start[1]) * progress;
    marker.setLngLat([lng, lat]);

    animationId = requestAnimationFrame(animate);
}

function move() {
    document.getElementById('MIT_path').disabled = true;
    paused = false;
    if (!animationId) {
        animationId = requestAnimationFrame(animate);
    }
}

function pauseAnim() {
    paused = true;
}
