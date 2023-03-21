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
  console.log(id);
  const [apiLoad, apiError, badgeData] = useBackendData(`detail/${id}`, {
    assertions: [{}],
  },true);

  if (apiError) return <Error message={apiError} />;

  if (apiLoad) return <Loading />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          "&>div": {
            mt: 3,
          },
        }}
        className="sm-wrap"
      >
        <Box
          sx={{
            minWidth: 450,
          }}
        >
          <Typography variant="h5">{badgeData.title}</Typography>
          <Typography variant="body1">{badgeData.desc}</Typography>
          <AssertionBasicData detail={badgeData.assertions[0]} />
        </Box>
        <BadgeDetailImage
          src={
            badgeData.template
              ? getS3Url("templates", badgeData.template)
              : "/img/thumbnail.jpg"
          }
        />
      </Box>
    </div>
  );
};

export default PublicBadgeDetail;
