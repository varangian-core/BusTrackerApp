# BusTrackerApp

### Title
Basic bus tracker app that shows the path of common bus routes around MIT area.

### Description
Simple bus tracker with Mapbox GL JS. The marker animates smoothly
between stops and the route line is drawn on the map. Use the speed
slider to control playback and the play/pause toggle during the animation.
Bus stop data is loaded from the public MBTA API on page load. Each stop
is now shown with a marker and popup containing the stop name. A new
button lets you fetch the most recent bus position from the MBTA
vehicles API.

### How to Run

Clone this repository and open `index.html` in your browser. For convenience the
Mapbox access token is embedded directly in `mapanimation.js`, so no additional
configuration is needed. The page will fetch live bus stop data from the MBTA
API when the map loads.

### Roadmap to Future Improvements
This application will likely be restructured as a component for React App.

### License

MIT License. Reference information under the License document.
