import React, { useState, useEffect } from 'react'
import SelectTile from './SelectTile'

const SelectListContainer = props => {
  const [models, setModels] = useState([])
  const [sort, setSort] = useState({sort: "none"})
  const [currentUser, setCurrentUser] = useState({})

  const fetchModelList = (url) => {
    fetch(url, {
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
        setModels(body.models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    fetchModelList(`/api/v1/models?sort=${sort.sort}`)
  }, [sort])

  const handleInputChange = event => {
    let sortValue = event.currentTarget.value.toLowerCase().replace(' ', '')
    setSort({
      ...sort,
      [event.currentTarget.name]: sortValue
    })
  }

  const selectTiles = models.map(model  => {

    return(
      <SelectTile
        key={model.id}
        model={model}
        eventId={props.eventId}
      />
    )
  })

  return (
    <div className="select-list">
      <div className="row">
        <div className="columns small-6">
          Available Models
        </div>
        <form>
        <div className="columns small-6">
          <label>
            <select name="sort"
              value={sort.sort}
              onChange={handleInputChange}>
              <option name="">Sort by</option>
              <option name="models">Models</option>
              <option name="modelers">Modelers</option>
            </select>
          </label>
        </div>
        </form>
        <hr />
      </div>
      <div className="scroll-body row columns">
        {selectTiles}
      </div>
    </div>
  )
}

export default SelectListContainer
