import { useState, useContext, useEffect } from "react";
import fetchBackend from "../utils/fetchBackend";
import { LoginContext } from "../App";

const useBackendData = (route, intialData) => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [loadStatus, updateLoadStatus] = useState(false);
  const [errorStatus, updateErrorStatus] = useState(null);
  const [data, updateData] = useState(intialData);

  useEffect(() => {
    updateLoadStatus(true)
    if (loginStatus.loggedIn) {
      fetchBackend(route, "GET", loginStatus.token)
        .then((res) => res.data)
        .then((data) => {
          updateErrorStatus(null);
          updateLoadStatus(false);
          updateData(data);
        })
        .catch((err) => updateErrorStatus(err.message));
    }
  }, [loginStatus.loggedIn]);

  return [loadStatus, errorStatus, data];
};

export default useBackendData;
