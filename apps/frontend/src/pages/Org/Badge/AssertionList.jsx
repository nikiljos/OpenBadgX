import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Link, useParams } from "react-router-dom";
import { Box, Button, FormControl, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { ArrowBack, OpenInNew } from "@mui/icons-material";

const OrgBadgeAssertionList= () => {
  const {id}=useParams()
  const [apiLoad, apiError, awardeeList] = useBackendData(`org/badge/${id}/assertions`, []);

  if (apiError) return <Error message={apiError} />;
  if (apiLoad) return <Loading />;
  return (
    <Box>
      <Typography variant="h5">Assertion history</Typography>
      <TableContainer sx={{ maxWidth: 700 }}>
        <Table size="small">
          <TableBody>
            {awardeeList && awardeeList.length > 0 ? (
              awardeeList.map((awardee) => (
                <TableRow key={awardee._id}>
                  <TableCell style={{ width: 200 }}>
                    {awardee.user && awardee.user.name}
                  </TableCell>
                  <TableCell>{awardee.user.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      endIcon={<OpenInNew />}
                      component={Link}
                      to={`/badge/${awardee._id}`}
                      target="_blank"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Box>
                <Typography variant="body1" sx={{ mt: 4 }}>
                  No Assertions yet
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  <Button
                    component={Link}
                    variant="outlined"
                    to="../detail"
                    startIcon={<ArrowBack />}
                    sx={{ mr: 2 }}
                  >
                    Details
                  </Button>
                  <Button
                    component={Link}
                    variant="outlined"
                    color="success"
                    to="../award"
                  >
                    Award Badge
                  </Button>
                </Box>
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrgBadgeAssertionList;