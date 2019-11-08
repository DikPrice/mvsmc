import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMapsContainer = props => {

  const style = {
    width: '750px',
    height: '60vh',
    margin: '10px',
  }

  return(
    <div>
      <Map
        google={props.google}
        initialCenter={props.center}
        defaultZoom={props.zoom}
        style={style}>

        <Marker
          name={'MVSMC'}
          position={{
            lat: 42.81083333,
            lng: -70.87166667
          }}
        />
      </Map>
    </div>
  )
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDO3llKxY58ckwDleWJZLGnEU0fbJ4xmGs"
})(GoogleMapsContainer)
