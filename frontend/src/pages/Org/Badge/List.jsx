import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import BadgeCard from "../../../components/BadgeCard";

const OrgBadgeList = () => {
  const [apiLoad, apiError, badgeList] = useBackendData(`org/badge`, []);
  const navigate = useNavigate();

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;

  return (
    <div>
      <h2>Badges in this org</h2>
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
      <Button variant="contained" onClick={() => navigate(`./new`)}>
        Create Badge
      </Button>
    </div>
  );
};

export default OrgBadgeList;
