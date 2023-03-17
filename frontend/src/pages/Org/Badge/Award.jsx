import React, { useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import useBackendData from '../../../hooks/useBackendData'
import fetchBackend from '../../../utils/fetchBackend'
import { LoginContext } from '../../../App'
import BannerAlert from '../../../components/BannerAlert'

const OrgBadgeAward = () => {
  const {id}=useParams()
  const [detailLoad,detailError,badgeDetail]=useBackendData(`org/badge/${id}/detail`,{})
  const [inputArray,updateInputArray]=useState([{
    name:"",
    email:""
  }])
  const [awardResult,updateAwardResult]=useState({
    success:[],
    exist:[],
    error:[]
  })
  const [alertData, updateAlertData] = useState(null);
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const addInputField=(e)=>{
    e.preventDefault()
    updateInputArray((prev) =>{
      let newArray=[...prev]
      newArray.push({
        name: "",
        email: "",
      });
      return newArray
    } );
  }

  const updateFieldValue=(index,key,value)=>{
    updateInputArray(prev=>{
      let newArray=[...prev]
      newArray[index][key]=value
      return newArray
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    updateAlertData({
      type: "info",
      message: "Loading...",
    });
    fetchBackend(`org/badge/${id}/award`,"POST",loginStatus.token,{
      recipients:inputArray
    })
    .then(res=>{
      updateAwardResult(res.data)
      updateInputArray([
        {
          name: "",
          email: "",
        },
      ]);
      updateAlertData({
        type: "success",
        message: res.message,
      });
    })
    .catch(err=>{
      console.log("error",err)
      updateAlertData({
        type: "err",
        message: err.message||"Error",
      });
    })
  }

  if(detailLoad) return <Loading/>
  if(detailError) console.log({detailError})

  return (
    <div>
      <div className="detail">
        <h3>{badgeDetail.title}</h3>
        <div className="desc">{badgeDetail.desc}</div>
      </div>
      <div className="form-list">
        <form onSubmit={handleSubmit}>
          {inputArray.map((elt, i) => (
            <div key={`input-grp-${i}}`}>
              <input
                type="text"
                value={elt.name}
                onChange={(e) => updateFieldValue(i, "name", e.target.value)}
                placeholder="Name"
              />
              <input
                type="email"
                value={elt.email}
                onChange={(e) => updateFieldValue(i, "email", e.target.value)}
                placeholder="Email"
              />
            </div>
          ))}
          <button onClick={addInputField}>Add field</button>
          <button type="submit">Award</button>
        </form>
      </div>

      <BannerAlert status={alertData} />

      {alertData && alertData.type === "success" ? (
        <div className="result">
          <div className="success">
            <h5>Success</h5>
            {awardResult.success.map((elt) => (
              <div>{elt}</div>
            ))}
          </div>
          <div className="exist">
            <h5>Exist</h5>
            {awardResult.exist.map((elt) => (
              <div>{elt}</div>
            ))}
          </div>
          <div className="fail">
            <h5>Error</h5>
            {awardResult.error.map((elt) => (
              <div>{elt}</div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default OrgBadgeAward