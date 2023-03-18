import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BadgeCard from "../../../components/BadgeCard";

const OrgBadgeList = () => {
  const [apiLoad, apiError, badgeList] = useBackendData(`org/badge`, []);

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5">Your Badges</Typography>
        <Button variant="contained" component={Link} to="./new" sx={{ m: 3 }}>
          Create Badge
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {badgeList.map((badge) => (
          <BadgeCard
            id={badge._id}
            image="https://tiny.nikjos.in/hello"
            title={badge.title}
            desc={badge.desc}
            key={badge._id}
            links={[
              {
                title: "Details",
                route: `./${badge._id}/detail`,
              },
              {
                title: "Award",
                route: `./${badge._id}/award`,
              },
              {
                title: "History",
                route: `./${badge._id}/assertions`,
              },
            ]}
          />
        ))}
      </Box>
    </div>
  );
};

export default OrgBadgeList;
