import AWS from "aws-sdk";
import fetch from "./fetch";
import fs from "fs";
import slugify from "./slugify";

// TODO: Change this out to be a parameter
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***

async function upload(options) {
  const MAPBOX_TOKEN= options.mapboxToken;
  const MAPBOX_USERNAME = options.mapboxUsername;
  const FILE_PATH = options.filePath;
  const TILESET_NAME = options.tilesetName;

  // const isDebug = options.debug;
  const isDebug = true;
  const logger = (...args) => isDebug ? console.log(...args) : false;
  const tilesetSlug = slugify(TILESET_NAME);

  logger('Starting upload...')

  // 0. Validate filepath
  const fileStream = fs.createReadStream(FILE_PATH);
  fileStream.on("error", function (err) {
    throw new Error("File Error", err);
  });

  // 1. Hit the Mapbox uplaod service to get the S3 creds
  const s3UploadDetails = await fetch(
    `https://api.mapbox.com/uploads/v1/${MAPBOX_USERNAME}/credentials?access_token=${MAPBOX_TOKEN}`
  );

  // 2. Upload selected file to the S3
  const { accessKeyId, bucket, key, secretAccessKey, sessionToken } = s3UploadDetails;
  const S3 = new AWS.S3({ credentials: { accessKeyId, secretAccessKey, sessionToken } });
  await S3.putObject({ Bucket: bucket, Key: key, Body: fileStream }).promise();

 logger("File uploaded!");
  // 3. Hit the Mapbox Upload service again with the location of the files
  const upload = await fetch({
    method: "post",
    headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
    url: `https://api.mapbox.com/uploads/v1/${MAPBOX_USERNAME}?access_token=${MAPBOX_TOKEN}`,
    data: {
      url: `http://${bucket}.s3.amazonaws.com/${key}`,
      name: TILESET_NAME,
      tileset: `${MAPBOX_USERNAME}.${tilesetSlug}`,
    },
  });
 logger(`Upload started...`);
  const uploadId = upload.id;
  const progress = upload.progress;

  // progress === 0 means not done!
  if (progress === 0 || progress === "0") {
    const uploadCheckInterval = setInterval(async () => {
      const isDone = await fetch(
        `https://api.mapbox.com/uploads/v1/${MAPBOX_USERNAME}/${uploadId}?access_token=${MAPBOX_TOKEN}`
      );
      const progressCheck = isDone.progress;
     logger({ isDone });
      if (progressCheck === 1 || progressCheck === "1") {
        clearInterval(uploadCheckInterval);
       logger("Upload complete! Check Mapbox Studio!");
      } else {
       logger(`Upload still in progress... (checking every 3 seconds)`);
      }
    }, 3000);
  } else {
   logger("Upload complete. Check Mapbox Studio!");
  }
}

export default upload;
