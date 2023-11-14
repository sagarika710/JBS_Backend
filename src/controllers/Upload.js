const { S3 } = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Set up AWS credentials and S3 details
const accessKeyId = "AKIAQVGDKDBD36FYXPR2";
const secretAccessKey = "NZfS814hzhK2kunoTDombT777Xb0y0VUBtXF2rdF";
const region = "us-east-1"; // e.g., 'us-east-1'
const bucketName = "jbs-pro";

// Create an S3 instance
const s3 = new S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

// Set up Multer and S3 storage engine
const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    acl: "public-read", // Set access control to public-read for the uploaded file
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// Controller function for handling file uploads
const uploadImage = (req, res) => {
  res.json({ imageUrl: req.file.location });
};

module.exports = {
  upload,
  uploadImage,
};
