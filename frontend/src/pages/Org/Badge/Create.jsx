import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";
import fetchBackend from "../../../utils/fetchBackend";

const OrgBadgeCreate = () => {
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  const navigate = useNavigate();
  const [badgeTitle, updateBadgeTitle] = useState("");
  const [badgeDesc, updateBadgeDesc] = useState("");
  const [apiResponse, updateApiResponse] = useState({
    status: null,
    message: null,
  });
  const createBadge = async (e) => {
    e.preventDefault();
    updateApiResponse({
      status: "load",
      message: "Loading...",
    });
    let badgeStatus = await fetchBackend(
      "org/badge/add",
      "POST",
      loginStatus.token,
      {
        title: badgeTitle,
        desc: badgeDesc,
      }
    )
      .then((res) => res.data)
      .catch((err) =>
        updateApiResponse({
          status: "error",
          message: err.message,
        })
      );
    if (badgeStatus) {
      updateApiResponse({
        status: "success",
        message: "Badge created successfully🤩",
      });
    }
  };
  return (
    <div>
      <h3>Create Badge</h3>
      <Box
        component="form"
        onSubmit={createBadge}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          "& *": {
            mt: 2,
          },
        }}
      >
        <TextField
          variant="outlined"
          value={badgeTitle}
          onChange={(e) => updateBadgeTitle(e.target.value)}
          label="Title"
        />

        <TextField
          variant="outlined"
          value={badgeDesc}
          onChange={(e) => updateBadgeDesc(e.target.value)}
          label="Description"
        />

        <Button type="submit" sx={{ mt: 3 }} variant="contained">
          Create
        </Button>
      </Box>
      {apiResponse.status && <div>{apiResponse.message}</div>}
      <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate("../")}>
        View all badges
      </Button>
    </div>
  );
};

export default OrgBadgeCreate;
