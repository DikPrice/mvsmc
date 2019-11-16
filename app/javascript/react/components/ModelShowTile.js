import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { fetchData } from './../../modules/fetchData'
import { deleteData } from './../../modules/deleteData'

const ModelShowTile = props => {
  const [model , setModel] = useState({})
  const [modeler, setModeler] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState([])

  let modelId = props.match.params.id

  const setSuccessState = (body) =>{
    setRedirect(true)
  }
  const setErrorState = (body) =>{
    setErrors(body)
  }
  const storeData = (body) =>{
    setModel(body.model)
    setModeler(body.modeler)
    setCurrentUser(body.user)
  }
  useEffect(() => {
    fetchData(`/api/v1/models/${modelId}`, storeData)
  }, [])
  const deleteModel= (event) => {
    event.preventDefault()
    deleteData(`/api/v1/models/${modelId}`, setSuccessState, setErrorState)
  }

  if (redirect){
    return < Redirect to='/models' />
  }

  let goBack = (event) => {
    event.preventDefault()
    setRedirect(true)
  }

  let printView = (event) => {
    let printPath = `/models/${modelId}/print`
    event.preventDefault()
    return < Redirect to={printPath} />
  }

  let deleteEntry
  if (currentUser){
    if (currentUser["role"] >= 3){
      deleteEntry = <button className="button" onClick={deleteModel}>Delete</button>
    }
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
                <button className="button" onClick={printView}>Print</button>
                <button className="button" onClick={goBack}>Go Back</button>
                {deleteEntry}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelShowTile
