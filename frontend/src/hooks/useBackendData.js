import { useState, useContext, useEffect } from "react";
import fetchBackend from "../utils/fetchBackend";
import { LoginContext } from "../App";

const useBackendData = (route, intialData, loginNotRequried) => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const [loadStatus, updateLoadStatus] = useState(false);
  const [errorStatus, updateErrorStatus] = useState(null);
  const [data, updateData] = useState(intialData);

  useEffect(() => {
    updateLoadStatus(true)
    if (loginStatus.loggedIn || loginNotRequried) {
      fetchBackend(route, "GET", loginStatus.token)
        .then((res) => res.data)
        .then((data) => {
          updateErrorStatus(null);
          updateLoadStatus(false);
          updateData(data);
        })
        .catch((err) => {
          updateErrorStatus(err.message)
          updateLoadStatus(false)
        });
    }
    else if (loginStatus.localStorageCheck) {
      updateLoadStatus(false);
      updateErrorStatus("Not logged in!");
    }
  }, [loginStatus.loggedIn,loginStatus.localStorageCheck]);

  return [loadStatus, errorStatus, data];
};

export default useBackendData;
