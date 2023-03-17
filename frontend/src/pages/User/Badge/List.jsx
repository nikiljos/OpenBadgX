import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";

const UserBadgeList = () => {
  const [apiLoad, apiError, badgeList] = useBackendData(`user/badge`, []);

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;

  return (
    <div>
      <h2>Recieved Badges</h2>
      <div className="badge-list">
        {badgeList.map((badge) => (
          <div className="badge-card" key={badge._id}>
            <div className="title">{badge.title}</div>
            <div className="desc">
              {badge.desc && badge.desc.length > 100
                ? badge.desc.slice(0, 50) + "..."
                : badge.desc}
            </div>
            <div className="assertion">
              <div className="assert-id">{badge.assertions._id}</div>
            </div>
            <Link to={`${badge.assertions._id}`}>Details</Link>
          </div>
        ))}
      </div>
      <Link to="/org/badge/new">Create Badge</Link>
    </div>
  );
};

export default UserBadgeList;
