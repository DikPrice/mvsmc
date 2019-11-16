import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { fetchData } from './../../modules/fetchData'

const ModelPrintTile = props => {
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

  if (redirect){
    return < Redirect to='/models' />
  }

  let goBack = (event) => {
    event.preventDefault()
    setRedirect(true)
  }

  let displayParas
  if (model.description){
    let paras = model.description.split("\n")
    displayParas = paras.map(para => {
      return(<p>{para}</p>)
    })
  }

  return (
    <>
      <div className="print-panel">
        <div className="event-card">
          <img src="./../../card-backdrop.jpg"/>
          <div className="title">
            {model.name}
          </div>
          <div className="details">
            {modeler.first_name} {modeler.last_name}<br />
            {model.source}<br />
            {model.scale}
          </div>
          <div className="description">
            {displayParas}
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="button" onClick={goBack}>Go Back</button>
      </div>
    </>
  )
}

export default ModelPrintTile
