const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Set up AWS credentials and S3 details
const accessKeyId = 'your-access-key-id';
const secretAccessKey = 'your-secret-access-key';
const region = 'your-region'; // e.g., 'us-east-1'
const bucketName = 'your-s3-bucket-name';

// Create an S3 instance
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

// Set up Multer and S3 storage engine
const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: 'public-read', // Set access control to public-read for the uploaded file
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Controller function for handling file uploads
const uploadImage = (req, res) => {
  res.json({ imageUrl: req.file.location });
};

module.exports = {
  uploadImage,
};
