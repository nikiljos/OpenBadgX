export const getS3Url = (folder, file) =>{
  if(folder&&file){
    return `${import.meta.env.VITE_S3_URL}/${folder}/${file}`;
  }
  else if(file){
    return `${import.meta.env.VITE_S3_URL}/${file}`;
  }
  else{
    return "/img/placeholder.png"
  }
}
  
  