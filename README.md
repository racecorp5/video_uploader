* This is a vimeo or youtube video downloader. This will take a given video url and upload said video into an S3 bucket of your choice. It will also add meta-data to the entity in S3.

** Variables
- videoUrl: 
- bucketName: Name of the bucket to use
- bucketPath: Path inside the bucket to get to
- fileName: What you want to name the file
- order: (metadata) The order of the videos when downloading a series
- title: (metadata) Title of the video, save it to use for later 