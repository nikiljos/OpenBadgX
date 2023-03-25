import { Box } from '@mui/material';

const BadgeDetailImage = ({src}) => {
  return (
    <Box
      className="badge-image-box"
      sx={{
        width:"500px",
        // minWidth: "30vw",
        // maxWidth: "80vw",
        aspectRatio: "9/5",
        flexShrink:0, 
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