import { useEffect,useState,useContext } from 'react'
import { LoginContext } from '../../App'
import fetchBackend from '../../utils/fetchBackend';
import LoginPrompt from '../../components/LoginPrompt';

const OrgHome = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [orgDetail,updateOrgDetail]=useState({
    name:null,
    key:null
  })

  useEffect(()=>{
    if(loginStatus.orgLogin){
      (async ()=>{
        const orgDetailRes=await fetchBackend("org/detail","GET",loginStatus.token,null)
        .then(data=>data.data)
        .catch(err=>console.log("Error: ",err))
        orgDetailRes&&updateOrgDetail(orgDetailRes)
      })()
    }
  },[loginStatus])

  if(!loginStatus.orgLogin) return <LoginPrompt type="org"/>
  return (
    <div>
      <h3>Org Home</h3>
      <h4>{orgDetail.name}</h4>
      <h5>{orgDetail.key}</h5>
    </div>
  )
}

export default OrgHome