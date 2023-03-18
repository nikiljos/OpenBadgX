import { Box } from '@mui/material';

const BadgeDetailImage = ({src}) => {
  return (
    <Box
      className="badge-image-box"
      sx={{
        minWidth: "30vw",
        maxWidth: 340,
        // border: "1px solid black",
        aspectRatio: "9/5",
      }}
    >
      <img
        src={src}
        alt="badge image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

export default BadgeDetailImage