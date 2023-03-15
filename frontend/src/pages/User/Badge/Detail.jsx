import React from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import useBackendData from '../../../hooks/useBackendData';

const UserBadgeDetail = () => {
  const {id}=useParams()  
  console.log(id)
  const [apiLoad, apiError, badgeData] = useBackendData(`detail/${id}`, {
    assertions:[{}],
  });

  if(apiError) return <Error message={apiError}/>

  if(apiLoad) return <Loading/>

  return (
    <div>
      <h3>Badge Details</h3>
      <div>
        <h3>{badgeData.title}</h3>
        <div>{badgeData.desc}</div>
        <div className="assert">
          <h5>Assertion Detail</h5>
          <div className="name">{badgeData.assertions[0].name}</div>
          <div className="id">{badgeData.assertions[0]._id}</div>
        </div>
      </div>
    </div>
  )
}

export default UserBadgeDetail