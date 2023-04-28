import * as React from 'react';
import { render } from 'react-dom';
import Map, { Marker } from 'react-map-gl';

var MAPBOX_TOKEN = 'pk.eyJ1IjoiamFrZXJvYnNvbiIsImEiOiJjbGgwOXVteWkwNDFvM3BvMXNkY29zeWp1In0.IhZAYjeZbCnW-cW2s7I1gw'

function MyMap() {
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 10
      });
    
      return (
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{width: "100%", height: 400}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
        </Map>
      );
}

export default MyMap;