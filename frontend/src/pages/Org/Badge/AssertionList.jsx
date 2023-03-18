import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

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
            {awardeeList.map((awardee) => (
              <TableRow>
                <TableCell style={{ width: 200 }}>
                  {awardee.user.name}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrgBadgeAssertionList;