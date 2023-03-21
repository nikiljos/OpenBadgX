const fetchBackend = (route, method, auth, reqBody, fileUpload) =>
  new Promise((resolve, reject) => {
    console.log("Calling Backend API -->", route, "-->", method);

    let body=reqBody 
    let headers={}
    if(reqBody&&!fileUpload){
      body=JSON.stringify(reqBody);
      headers["Content-Type"]="application/json"
    }

    if (auth) {
      headers["Authorization"] = `Bearer ${auth}`;
    }

    fetch(`${import.meta.env.VITE_API_URL}/${route}`, {
      method,
      headers,
      body,
    })
      .then((res) => {
        if(res.status===401) reject(new Error("token_expired"))
        return res.json();
      })
      .then((data) => {
        if (data.success) resolve(data);
        reject(new Error(data.message));
      })
      .catch((err) => reject(err));
  });

export default fetchBackend;
