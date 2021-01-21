const stream = require('stream');
const youtubedl = require('youtube-dl');
const AWS = require('aws-sdk');

/* Edit */
/* These variables are for bucket for placement */
const videoUrl = 'https://vod-progressive.akamaized.net/exp=1610853030~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F38%2F17%2F425190207%2F1841527631.mp4~hmac=34b57577145e2d2923547c20c7f89156f052aa4c0c4665d0c75a4c9e5d715433/vimeo-prod-skyfire-std-us/01/38/17/425190207/1841527631.mp4';
const bucketName = 'videos.simpleincometips.com';
const bucketPath = 'funnel_building';
const fileName = 'module1';
/* Metadata variables */
const order = '1';
const title = 'Planning Your Funnel';
/* End Edit */


var credentials = new AWS.SharedIniFileCredentials({ profile: 'onsched' });
AWS.config.credentials = credentials;

const dl = youtubedl(videoUrl, ['--format=best[ext=mp4]'], { maxBuffer: Infinity });
const passtrough = new stream.PassThrough();
dl.pipe(passtrough); // write video to the pass-through stream

const upload = new AWS.S3.ManagedUpload({
  params: {
    Bucket: bucketName,
    Key: 'videos/'+bucketPath+'/'+fileName+'.mp4',
    Body: passtrough,
    Metadata: { title, order },
  },
  partSize: 1024 * 1024 * 64 // 64 MB in bytes
});

upload.send((err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log(fileName + ' done');
  }
});
