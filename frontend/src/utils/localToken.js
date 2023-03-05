export const getLocalToken=()=>{
  let oldToken=window.localStorage.getItem("token")
  if(!oldToken||oldToken===""||oldToken==="undefined"||oldToken==="null") return false
  return oldToken
}

export const setLocalToken=(token)=>{
  if(token===null){
    window.localStorage.removeItem("token")
  }
  if(token&&token!==""){
    window.localStorage.setItem("token", token);
    return true
  }
  else{
    return false
  }
}