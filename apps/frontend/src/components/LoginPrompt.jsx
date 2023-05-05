import React from 'react'
import { Link } from 'react-router-dom'

const LoginPrompt = (props) => {
  if(props.type==="org"){
    return (
      <div>
        <div className="prompt">
          <div>Please select an Org to continue.</div>
          <div>
            <Link to="/org">Select Org</Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="prompt">
        <div>Please login to continue.</div> 
        <div><Link to="/login">Login</Link></div>
      </div>
    </div>
  )
}

export default LoginPrompt