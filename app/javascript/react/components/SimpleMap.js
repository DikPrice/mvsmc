import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const SimpleMap = props => {

  return (
    <div style={{ height: '100px', width: '200px'}}>
      <Map
        google={props.google}
        defaultCenter={props.lat, props.lng}
        defaultZoom={props.zoom}
      />
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDO3llKxY58ckwDleWJZLGnEU0fbJ4xmGs"
})(SimpleMap);
