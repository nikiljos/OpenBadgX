import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Link, useParams } from "react-router-dom";

const OrgBadgeAssertionList= () => {
  const {id}=useParams()
  const [apiLoad, apiError, awardeeList] = useBackendData(`org/badge/${id}/assertions`, []);

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;
  return (
    <div>
      <h2>Awardee List</h2>
      <div className="awardee-list">
        {awardeeList.map(awardee=>(
          <div className="awardee" key={awardee._id}>
            <div className="name">{awardee.user.name}</div>
            <div className="email">{awardee.user.email}</div>
            <Link to={`/badge/${awardee._id}`} target="_blank">
              View Assertion⧉
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrgBadgeAssertionList;