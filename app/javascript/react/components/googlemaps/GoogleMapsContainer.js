import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

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
        style={style}
      />
    </div>
  )
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDO3llKxY58ckwDleWJZLGnEU0fbJ4xmGs"
})(GoogleMapsContainer)
