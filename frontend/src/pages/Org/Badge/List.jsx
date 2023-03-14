import { Link } from 'react-router-dom';
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import "./List.css"

const OrgBadgeList = () => {

  const [apiLoad, apiError, badgeList] = useBackendData(`org/badge`, []);

  if(apiError) return <Error message={apiError}/>
  if(apiLoad) return <Loading/>

  return (
    <div>
      <h2>Badges in this org</h2>
      <div className="badge-list">
        {badgeList.map((badge) => (
          <div className="badge-card" key={badge._id}>
            <div className="title">{badge.title}</div>
            <div className="desc">{badge.desc&&badge.desc.length>100?badge.desc.slice(0,50)+"...":badge.desc}</div>
            <Link to={`${badge._id}/detail`}>Details</Link>
          </div>
        ))}
      </div>
      <Link to="/org/badge/new">Create Badge</Link>
    </div>
  );
}

export default OrgBadgeList