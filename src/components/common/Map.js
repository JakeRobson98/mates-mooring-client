import * as React from 'react'
import { render } from 'react-dom';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from './GeocoderControl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

var MAPBOX_TOKEN = 'pk.eyJ1IjoiamFrZXJvYnNvbiIsImEiOiJjbGgwOXVteWkwNDFvM3BvMXNkY29zeWp1In0.IhZAYjeZbCnW-cW2s7I1gw'

function MyMap(props) {
  const [viewState, setViewState] = React.useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10
  });

  const mapRef = useRef(null)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      mapRef.current?.flyTo({ center: [position.coords.longitude, position.coords.latitude] })
    });
  }, [])

  function handleMap(evt) {
    console.log(props)

    setViewState(evt.viewState)
    if (!props.viewMap) {
      props.updateLatLong(evt.viewState.latitude, evt.viewState.longitude)
    }
  }

  return (
    <>
      <Map
        {...viewState}
        onMove={evt => handleMap(evt)}
        style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
      >
      {
        !props.viewMap? 
        <Marker
          draggable={false}
          latitude={viewState.latitude}
          longitude={viewState.longitude}
        ></Marker>
      :(
        props?.markers?.map((marker, index) => (
          <Marker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            draggable={false}
          />
        ))
      )
      }
        

      

        <GeolocateControl></GeolocateControl>
        <NavigationControl></NavigationControl>
        {/* <GeocoderControl mapboxAccessToken={{MAPBOX_TOKEN}} position='top-right'/> */}
      </Map>
    </>

  );
}

export default MyMap;