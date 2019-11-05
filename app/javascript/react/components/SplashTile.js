import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SplashTile = props => {
  const [submissions, setSubmissions] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {fetch(`/api/v1/submissions?sort=mymodels`, {
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
        setSubmissions(body.models)
        setCurrentUser(body.user)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let currentSubmissions = 0
  let seeSubmissions
  if (currentUser) {
    if (submissions){
      currentSubmissions = submissions.length
    }
    seeSubmissions =
      <>
        <Link to="/submissions/new">Submit a new Model</Link><br />
        <li><span className="stats">
          (you have {currentSubmissions} submissions in progress)
        </span></li>
      </>
  }

  return (
    <div className="splash-tile">
      <div className="splash-text-box">
        <div className="welcome">
          Welcome
        </div>
        <div className="welcome-options">
          {seeSubmissions}
          <Link to="/models">
            Registered Models
          </Link><br />
          <Link to="/events">
            Events
          </Link><br />
          <a href="http://www.mvsmc.org">MVSMC Website</a>
        </div>
        <div className="about-the-site">
        The Merrimack Valley Ship Modellers Club (MVSMC) regular stages public displays of it's members models. This site has been ceated to assist in submitting details of their models (and other items) for those events.
        </div>
      </div>
      <div className="model-info-box">
        <div className="ship-name">
          HMS Sussex (1:700)
        </div>
        <div className="ship-text">
          Launched in 1928, she is a typical representation of the clean, swift lines of Royal Navy cruisers of this period. A well travelled ship, she saw action in the Mediterranean Sea, North and South Atlantic, Indian and Pacific oceans during her WWII career.
        </div>
      </div>
    </div>
  )
}

export default SplashTile
