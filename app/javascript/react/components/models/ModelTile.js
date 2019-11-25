import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { fetchData } from './../../../modules/fetchData'

const SelectTile = props => {

  const [modeler, setModeler] = useState({})
  let modelerId = props.model["modeler_id"]

  const storeData = (body) =>{
    setModeler(body.modeler)
  }
  useEffect(() => {
    fetchData(`/api/v1/modelers/${modelerId}`, storeData)
  }, [])

  return (
    <div>
      <div className="row tile">
        <div className="columns small-6 large-6 name">
          <Link to={`/models/${props.model["id"]}`}>
            <strong>{props.model.name}</strong>
          </Link>
        </div>
        <div className="columns small-2 large-2 scale">
          {props.model.scale}
        </div>
        <div className="columns small-12 large-4 modeler">
          {modeler.first_name} {modeler.last_name}
        </div>
        <div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default SelectTile
