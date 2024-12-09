const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Konfigurasi Google Cloud Storage
const storage = new Storage();
const bucketName = 'data-waste-hub-bucket';
const bucket = storage.bucket(bucketName);

// Konfigurasi Multer
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG files are allowed'));
  }
  cb(null, true);
};

// Middleware untuk upload
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Max size 2MB
  fileFilter,
});

// Fungsi untuk mengunggah file ke GCP
const uploadToGCS = async (file) => {
  if (!file) throw new Error('No file provided.');

  const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
  const blob = bucket.file(uniqueName);

  const stream = blob.createWriteStream({
    resumable: false,
    gzip: true,
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueName}`;
      resolve(publicUrl);
    });
    stream.on('error', (err) => reject(err));
    stream.end(file.buffer);
  });
};

module.exports = { upload, uploadToGCS };