import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

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
          <Card key={badge._id} sx={{ width: 275, m: 2 }}>
            <CardMedia
              component="img"
              image="https://tiny.nikjos.in/hello"
              sx={{ height: 200 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {badge.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {badge.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`./${badge._id}/detail`)}
              >
                Details
              </Button>
              <Button
                size="small"
                onClick={() => navigate(`./${badge._id}/award`)}
              >
                Award
              </Button>
              <Button
                size="small"
                onClick={() => navigate(`./${badge._id}/assertions`)}
              >
                History
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Button variant="contained" onClick={() => navigate(`./new`)}>
        Create Badge
      </Button>
    </div>
  );
};

export default OrgBadgeList;
