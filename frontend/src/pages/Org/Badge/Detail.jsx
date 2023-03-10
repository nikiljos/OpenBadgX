import React from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import useBackendData from '../../../hooks/useBackendData';

const OrgBadgeDetail = () => {
  const {id}=useParams()  
  console.log(id)
  const [apiLoad,apiError,apiData]=useBackendData(`org/badge/${id}/detail`,{})

  if(apiError) return <Error message={apiError}/>

  if(apiLoad) return <Loading/>

  return (
    <div>
      <h3>Badge Details</h3>
      <div>
        <h3>{apiData.title}</h3>
        <div>{apiData.desc}</div>
      </div>
    </div>
  )
}

export default OrgBadgeDetail