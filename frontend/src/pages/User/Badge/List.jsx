import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Box } from "@mui/material";
import BadgeCard from "../../../components/BadgeCard";

const UserBadgeList = () => {
  const [apiLoad, apiError, badgeList] = useBackendData(`user/badge`, []);

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;

  return (
    <div>
      <h2>Recieved Badges</h2>
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
                route: `./${badge.assertions._id}`,
              }
            ]}
          />
        ))}
      </Box>
    </div>
  );
};

export default UserBadgeList;