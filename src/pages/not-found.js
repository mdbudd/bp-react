import React from "react"
import { Link } from "react-router-dom"

const NotFound = props => {
  document.title = props.pageTitle
  return (
    <div className="selected homeme" id="home">
      <div className="inner">
        <div className="content">
          <div>
            <div className="gallery-text" style={{ padding: "30vh 0 30vh 0" }}>
              <h2>404 - Not Found!</h2>
              <Link to="/">go home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
