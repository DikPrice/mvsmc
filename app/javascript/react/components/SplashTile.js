import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from './../../modules/fetchData'
import DashboardTile from './DashboardTile'

const SplashTile = props => {
  return (
    <div className="splash-tile">
      <div className="dashboard-box">
        <DashboardTile />
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
