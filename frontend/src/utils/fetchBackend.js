const fetchBackend = (route, method, auth, reqBody) =>
  new Promise((resolve, reject) => {
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
        reject(data);
      })
      .catch((err) => reject(err));
  });

export default fetchBackend;
