import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { fetchData } from './../../modules/fetchData'

const ModelShowTile = props => {
  const [model , setModel] = useState({})
  const [modeler, setModeler] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [redirect, setRedirect] = useState(false)

  let modelId = props.match.params.id

  const storeData = (body) =>{
    setModel(body.model)
    setModeler(body.modeler)
    setCurrentUser(body.user)
  }
  useEffect(() => {
    fetchData(`/api/v1/models/${modelId}`, storeData)
  }, [])

  if (redirect){
    return < Redirect to='/models' />
  }

  let goBack = (event) => {
    event.preventDefault()
    setRedirect(true)
  }

  return (
    <div className="submission-panel">
      <div className="submission-display">
        <div className="row">
          <div className="event-card">
            <div className="rows columns title">
              {model.name}
            </div>
            <div className="rows columns details">
              {modeler.first_name} {modeler.last_name}<br />
              {model.source}<br />
              {model.scale}
            </div>
            <div className="rows columns description">
              {model.description}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="meta-panel">
            <div className="columns small-12 medium-4">
              <div className="meta">
              </div>
            </div>
            <div className="columns small-12 medium-4">
              <div className="meta">
              </div>
            </div>
            <div className="columns small-12 medium-4">
              <div className="meta">
                <button className="button" onClick={goBack}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelShowTile
