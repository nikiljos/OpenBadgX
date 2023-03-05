import {useContext,useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../App'
import fetchBackend from '../../../utils/fetchBackend';
import "./List.css"

const OrgBadgeList = () => {
  const [badgeList,updateBadgeList]=useState([])
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);

  useEffect(()=>{

    if(loginStatus.orgLogin){
      (async ()=>{
        let badgeListRes=await fetchBackend("org/badge","GET",loginStatus.token)
        .then(res=>res.data)
        .catch(err=>console.log("Error:",err))
        updateBadgeList(badgeListRes)
      })()
    }

  },[loginStatus.orgLogin])

  return (
    <div>
      <h2>Badges in this org</h2>
      <div className="badge-list">
        {badgeList.map((badge) => (
          <div className="badge-card">
            <div className="title">{badge.title}</div>
            <div className="desc">{badge.desc}</div>
          </div>
        ))}
      </div>
      <Link to="/org/badge/new">Create Badge</Link>
    </div>
  );
}

export default OrgBadgeList