import { Alert, Button, FormControl, TextField } from "@mui/material";
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
  const [alertData, updateAlertData] = useState(null);
  const createBadge = async (e) => {
    e.preventDefault();
    updateAlertData({
      type: "info",
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
        updateAlertData({
          type: "error",
          message: err.message,
        })
      );
    if (badgeStatus) {
      updateAlertData({
        type: "success",
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
          maxWidth: 700,
        }}
      >
        <FormControl fullWidth={true} margin="normal">
          <TextField
            variant="outlined"
            value={badgeTitle}
            onChange={(e) => updateBadgeTitle(e.target.value)}
            label="Title"
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <TextField
            variant="outlined"
            value={badgeDesc}
            onChange={(e) => updateBadgeDesc(e.target.value)}
            label="Description"
            multiline={true}
          />
        </FormControl>
        <Button type="submit" sx={{ mt: 3 }} variant="contained">
          Create
        </Button>

        {alertData ? (
          <Alert severity={alertData.type} sx={{ mt: 5 }}>
            {alertData.message}
          </Alert>
        ) : (
          ""
        )}
      </Box>

      <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate("../")}>
        View all badges
      </Button>
    </div>
  );
};

export default OrgBadgeCreate;
