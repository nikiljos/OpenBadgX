import {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../App';
import fetchBackend from '../../../utils/fetchBackend';

const OrgBadgeCreate = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [badgeTitle, updateBadgeTitle] = useState("");
  const [badgeDesc, updateBadgeDesc] = useState("");
  const [apiResponse, updateApiResponse] = useState({
    status: null,
    message: null,
  });
  const createBadge = async (e) => {
    e.preventDefault();
    updateApiResponse({
      status: "load",
      message: "Loading...",
    });
    let badgeStatus = await fetchBackend("org/badge/add", "POST", loginStatus.token, {
      title:badgeTitle,
      desc:badgeDesc
    })
      .then((res) => res.data)
      .catch((err) =>
        updateApiResponse({
          status: "error",
          message: err.message,
        })
      );
    if (badgeStatus) {
      updateApiResponse({
        status: "success",
        message: "Badge created successfully🤩",
      })
    }
  };
  return (
    <div>
      <h3>Create Badge</h3>
      <form onSubmit={createBadge}>
        <input
          type="text"
          value={badgeTitle}
          onChange={(e) => updateBadgeTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={badgeDesc}
          onChange={(e) => updateBadgeDesc(e.target.value)}
          placeholder="Description"
        />

        <button type='submit'>Create Badge</button>
      </form>
      {apiResponse.status&&( <div>
        {apiResponse.message}
      </div> )}
      <Link to="/org/badge">View all badges</Link>
    </div>
  )
}

export default OrgBadgeCreate