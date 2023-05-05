import { APIError } from "./error";

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
      .then(async (res) => {
        return [await res.json(),res.status];
      })
      .then(([data,code]) => {
        if (data.success) resolve(data);
        reject(new APIError(data.message,code,data.code));
      })
      .catch((err) => reject(err));
  });

export default fetchBackend;
