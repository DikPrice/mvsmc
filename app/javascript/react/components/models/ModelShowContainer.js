import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { fetchData } from './../../../modules/fetchData'
import EditModelTile from './EditModelTile'
import ModelShowTile from './ModelShowTile'

const ModelShowContainer = props => {

  const [model , setModel] = useState({})
  const [modeler, setModeler] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [showComponent, setShowComponent] = useState ("show")
  const [redirect, setRedirect] = useState("")
  const [errors, setErrors] = useState([])

  let modelId = props.match.params.id

  const storeData = (body) =>{
    setModel(body.model)
    setModeler(body.modeler)
    setCurrentUser(body.user)
  }
  useEffect(() => {
    fetchData(`/api/v1/models/${modelId}`, storeData)
  }, [])

  const editModel = (event) => {
    event.preventDefault()
    setShowComponent("edit")
  }
  const showUpdatedModel = (updatedModel) =>{
    setModel(updatedModel)
    setShowComponent("show")
  }

  let component
  if (showComponent === "show"){
    component = <ModelShowTile
    key={modelId}
    model={model}
    modeler={modeler}
    currentUser={currentUser}
    editModel={editModel}
    />
  } else {
    component = <EditModelTile
      key={modelId}
      model={model}
      modeler={modeler}
      showUpdatedModel={showUpdatedModel}
    />
  }

  return (
    <div className="submission-panel">
      {component}
    </div>
  )
}

export default ModelShowContainer
