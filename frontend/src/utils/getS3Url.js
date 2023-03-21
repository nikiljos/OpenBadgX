export const getS3Url = (folder, file) =>
  `${import.meta.env.VITE_S3_URL}/${folder}/${file}`;
  