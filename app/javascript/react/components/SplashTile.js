import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from './../../modules/fetchData'

const SplashTile = props => {
  const [statusCount, setStatusCount] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  const storeData = (body) =>{
    setStatusCount(body.models)
    setCurrentUser(body.user)
  }
  useEffect(() => {
    fetchData(`/api/v1/submissions?count=statuscount`, storeData)
  }, [])

  let seeSubmissions, submissionStats, awaitingReview
  if (currentUser){
    if (currentUser.role >= 1) {
      seeSubmissions = <><Link to="/submissions/new">Submit a new Model</Link><br /></>
      if (statusCount.submissioncount > 0){
        submissionStats =
          <>
            <li className="stats">In progress: {statusCount.submissioncount}</li>
            <li className="stats">Being reviewed: {statusCount.myreviews}</li>
          </>
      }
      if (currentUser.role >= 2) {
        awaitingReview =
        <li className="stats review">Awaiting review: {statusCount.allreviewcount}</li>
      }
    }
  }

  return (
    <div className="splash-tile">
      <div className="splash-text-box">
        <div className="welcome">
          Welcome
        </div>
        <div className="welcome-options">
          {seeSubmissions}
          {submissionStats}
          {awaitingReview}
          <Link to="/models">
            Registered Models
          </Link><br />
          <Link to="/events">
            Events
          </Link><br />
          <a href="http://www.mvsmc.org">MVSMC Website</a>
        </div>
        <div className="about-the-site">
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
