import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../App";

const Home = () => {

    const { loginStatus, updateLoginStatus } = useContext(LoginContext);
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f3f6fc",
        borderRadius: "24px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "2.5rem",
          fontWeight: 600,
          mb: 4,
        }}
      >
        Welcome to OpenBadgX,
      </Typography>
      <Box
        sx={{
          maxWidth: 800,
        }}
      >
        <Typography variant="body1">
          The open source platform that empowers you to create, customize, and
          issue digital badges and certificates. Our easy-to-use platform is
          designed for organizations and individuals who want to recognize and
          showcase achievements, skills, and knowledge in a verifiable and
          portable way.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 4,
          }}
        >
          With OpenBadgX, you can create badges and certificates for a wide
          range of purposes, including education, professional development,
          career advancement, and more. Our platform is built on open standards,
          so you can be confident that your badges and certificates will be
          widely recognized and interoperable with other systems. Join the
          growing community of OpenBadgX users and start issuing your own badges
          and certificates today!
        </Typography>
      </Box>
      {loginStatus.loggedIn ? (
        <Button
          variant="contained"
          size="small"
          component={Link}
          to="./me"
          disableElevation={true}
          sx={{
            fontWeight: 500,
            mt: 3,
          }}
        >
          View Profile
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          component={Link}
          to="./login"
          disableElevation={true}
          sx={{
            fontWeight: 500,
            mt: 3,
          }}
        >
          Login / SignUp
        </Button>
      )}
    </Box>
  );
};

export default Home;
