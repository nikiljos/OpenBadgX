const fetchBackend = (route, method, auth, reqBody) =>
  new Promise((resolve, reject) => {
    console.log("Calling Backend API -->", route, "-->", method);
    let headers = {
      "Content-Type": "application/json",
    };

    let body = reqBody && JSON.stringify(reqBody);

    if (auth) {
      headers["Authorization"] = `Bearer ${auth}`;
    }

    fetch(`${import.meta.env.VITE_API_URL}/${route}`, {
      method,
      headers,
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) resolve(data);
        reject(new Error(data.message));
      })
      .catch((err) => reject(err));
  });

export default fetchBackend;
