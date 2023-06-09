import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Box, Typography } from "@mui/material";
import BadgeDetailImage from "../../../components/BadgeDetailImage";
import AssertionBasicData from "../../../components/AssertionBasicData";
import { getS3Url } from "../../../utils/getS3Url";

const PublicBadgeDetail = () => {
  const { id } = useParams();
  const [apiLoad, apiError, badgeData] = useBackendData(`detail/${id}`, {
    assertions: [{}],
    org:{}
  },true);

  if (apiError) return <Error message={apiError} />;

  if (apiLoad) return <Loading />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        className="sm-wrap"
      >
        <Box>
          <Typography variant="h5">{badgeData.title}</Typography>
          <Typography variant="body1">{badgeData.desc}</Typography>
          <AssertionBasicData detail={badgeData.assertions[0]} org={badgeData.org}/>
        </Box>
        <BadgeDetailImage
          src={getS3Url("templates", badgeData.template)}
        />
      </Box>
    </div>
  );
};

export default PublicBadgeDetail;
