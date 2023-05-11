import * as React from 'react'
import { render } from 'react-dom';
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from './GeocoderControl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

var MAPBOX_TOKEN = 'pk.eyJ1IjoiamFrZXJvYnNvbiIsImEiOiJjbGgwOXVteWkwNDFvM3BvMXNkY29zeWp1In0.IhZAYjeZbCnW-cW2s7I1gw'

function MyMap(props) {

    const [viewState, setViewState] = React.useState({
        latitude: -33.83,
        longitude: 151.27,
        zoom: 10
    });

    const mapRef = useRef(null)

    const markerRef = useRef(null)


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            mapRef.current?.flyTo({ center: [position.coords.longitude, position.coords.latitude] })
        });
    }, [])

    function handleMap(evt) {
        setViewState(evt.viewState)
        if (!props.viewMap) {
          var layers = mapRef.current?.getMap().queryRenderedFeatures(mapRef.current.project([evt.viewState.longitude, evt.viewState.latitude]))
          var inWater = layers.some(e=>e.layer.id === 'water')
          // console.log(inWater)
          props.updateLatLong(evt.viewState.latitude, evt.viewState.longitude, inWater)
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
                    !props.viewMap ?
                        <Marker
                            draggable={false}
                            latitude={viewState.latitude}
                            longitude={viewState.longitude}
                            ref={markerRef}
                        ></Marker>
                        : (
                            props?.markers?.map((marker, index) => (
                                <Marker
                                    key={index}
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    draggable={false}
                                    onClick={e => {
                                      e.originalEvent.stopPropagation();
                                      mapRef.current?.flyTo({ center: [marker.longitude, marker.latitude] })
                                      props.handleSelectedMarker(marker)
                                    }}
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