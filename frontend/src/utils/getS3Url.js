export const getS3Url = (folder, file,randomise=true) =>{
  //explicitly pass randomise as false to disable random query param
  // adding any query will force it to reload as
  // cloudfront will not take the cache for another param 
  // if config set to pass queries as well to s3
  let img = "/img/placeholder.png";
  if(folder&&file){
    img=`${import.meta.env.VITE_S3_URL}/${folder}/${file}`;
  }
  else if(file){
    img=`${import.meta.env.VITE_S3_URL}/${file}`;
  }
  if(randomise){
    img += ("?random=" + new Date().toJSON())
  }
  return img
}
  
  