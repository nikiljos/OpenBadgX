import React from 'react'

const Error = (props) => {
  console.log("idsfdidrig", props.message);
  return (
    
    <div>
      <h2>Error!</h2>
      <h4>{props.message}</h4>
    </div>
  )
}

export default Error