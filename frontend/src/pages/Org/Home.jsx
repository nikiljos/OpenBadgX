import { Link } from 'react-router-dom';
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useBackendData from "../../hooks/useBackendData";

const OrgHome = () => {

  const [apiLoad,apiError,orgDetail]=useBackendData(`org/detail`,{
    name:null,
    key:null
  })

  if(apiError) return <Error message={apiError}/>
  if(apiLoad) return <Loading/>

  return (
    <div>
      <h3>Org Home</h3>
      <h4>{orgDetail.name}</h4>
      <h5>{orgDetail.key}</h5>

      <div className="links">
        <div>
          <Link to="/org/badge">View Badges</Link>
        </div>
        <div>
          <Link to="/org/badge/new">Create Badge</Link>
        </div>
      </div>
    </div>
  );
}

export default OrgHome