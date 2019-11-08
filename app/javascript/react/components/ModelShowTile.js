import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const ModelShowTile = props => {
  const [model , setModel] = useState({})
  const [modeler, setModeler] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [redirect, setRedirect] = useState(false)

  let modelId = props.match.params.id

  useEffect(() => {fetch(`/api/v1/models/${modelId}`, {
    credentials: 'same-origin',
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setModel(body.model)
      setModeler(body.modeler)
      setCurrentUser(body.user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

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
