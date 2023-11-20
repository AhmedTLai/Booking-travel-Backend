const { addTour, editTour, deleteTour, GetTours, UploadC } = require('../Controllers/TourC');
const router = require('express').Router();
const multer = require('multer');
const { verifyAdmin } = require('../util/verifyToken');
const path = require('path');

// Upload Config
// const basePath = path.join(__dirname, '..', '..','..','client','public', 'upload');
const basePath = "C:\\Users\\Ahmed\\Desktop\\projects\\Fullstuck BookingTravel project\\Client\\public\\upload"
      // Assuming 'data[0].photo' contains the file name (e.g., 'example.jpg')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder where uploaded files will be stored
    cb(null, basePath);
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  },
}); 

const upload = multer({ storage: storage });

// Routes
router.put('/edit-tour/:id', verifyAdmin,upload.single('image'), editTour);
router.post('/add-tour',verifyAdmin, addTour);
router.delete('/delete-tour/:id',verifyAdmin, deleteTour);
router.get('/get-tour', GetTours); 

// File Upload Route
router.post('/uploadImg', verifyAdmin,upload.single('image'), UploadC);

module.exports = router;