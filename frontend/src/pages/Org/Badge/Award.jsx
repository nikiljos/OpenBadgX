import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import useBackendData from "../../../hooks/useBackendData";
import fetchBackend from "../../../utils/fetchBackend";
import { LoginContext } from "../../../App";
import BannerAlert from "../../../components/BannerAlert";
import { Alert, AlertTitle, Badge, Box, Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const OrgBadgeAward = () => {
  const { id } = useParams();
  const [detailLoad, detailError, badgeDetail] = useBackendData(
    `org/badge/${id}/detail`,
    {}
  );
  const [inputArray, updateInputArray] = useState([
    {
      name: "",
      email: "",
    },
  ]);
  const [awardResult, updateAwardResult] = useState({
    success: [],
    exist: [],
    error: [],
  });
  const [alertData, updateAlertData] = useState(null);
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const addInputField = (e) => {
    e.preventDefault();
    updateInputArray((prev) => {
      let newArray = [...prev];
      newArray.push({
        name: "",
        email: "",
      });
      return newArray;
    });
  };

  const updateFieldValue = (index, key, value) => {
    updateInputArray((prev) => {
      let newArray = [...prev];
      newArray[index][key] = value;
      return newArray;
    });
  };

  const deleteInputField=(index)=>{
    updateInputArray(prev=>{
      let newArray=[...prev]
      newArray.splice(index,1)
      return newArray
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAlertData({
      type: "info",
      message: "Loading...",
    });
    fetchBackend(`org/badge/${id}/award`, "POST", loginStatus.token, {
      recipients: inputArray,
    })
      .then((res) => {
        updateAwardResult(res.data);
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
      .catch((err) => {
        console.log("error", err);
        updateAlertData({
          type: "err",
          message: err.message || "Error",
        });
      });
  };

  if (detailLoad) return <Loading />;
  if (detailError) console.log("Error:",detailError);

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Award {badgeDetail.title} Badge</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        {inputArray.map((elt, i) => (
          <Box sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              value={elt.name}
              onChange={(e) => updateFieldValue(i, "name", e.target.value)}
              label="Name"
              sx={{ mr: 3 }}
            />
            <TextField
              variant="outlined"
              size="small"
              value={elt.email}
              onChange={(e) => updateFieldValue(i, "email", e.target.value)}
              label="Email"
            />
            <IconButton onClick={() => deleteInputField(i)} sx={{ ml: 1 }}>
              <Delete />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ mt: 3 }}>
          <Button onClick={addInputField} variant="outlined" sx={{ mr: 3 }}>
            Add field
          </Button>
          <Button type="submit" variant="outlined" color="success">
            Award
          </Button>
        </Box>
      </Box>
      <BannerAlert status={alertData} />
      {alertData && alertData.type === "success" ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "&>div": {
              mt: 3,
              mr: 2,
              width: 300,
            },
          }}
        >
          {awardResult.success && awardResult.success.length > 0 ? (
            <Alert severity="success">
              <AlertTitle>Success ({awardResult.success.length})</AlertTitle>
              {awardResult.success &&
                awardResult.success.map((elt) => <div>{elt}</div>)}
            </Alert>
          ) : null}
          {awardResult.exist && awardResult.exist.length > 0 ? (
            <Alert severity="warning">
              <AlertTitle>Existing ({awardResult.exist.length})</AlertTitle>
              {awardResult.exist.map((elt) => (
                <div>{elt}</div>
              ))}
            </Alert>
          ) : null}
          {awardResult.error&&awardResult.error.length > 0 ? (
            <Alert severity="error">
              <AlertTitle>Error ({awardResult.error.length})</AlertTitle>
              {awardResult.error.map((elt) => (
                <div>{elt}</div>
              ))}
            </Alert>
          ) : null}
        </Box>
      ) : null}
    </div>
  );
};

export default OrgBadgeAward;
