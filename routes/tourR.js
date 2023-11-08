const { addTour, editTour, deleteTour, GetTours, UploadC } = require('../Controllers/TourC')
const router = require('express').Router()
const multer = require('multer')



// Upload Config

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define the destination folder where uploaded files will be stored
      cb(null, 'C:\\Users\\Ahmed\\Desktop\\projects\\Fullstuck BookingTravel project\\Client\\public\\upload\\');
    }, 
    filename: function (req, file, cb) {
      // Define the filename for the uploaded file
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage: storage });

//********** */


router.put('/edit-tour/:id' ,editTour)
router.post('/add-tour' ,addTour)
router.delete('/delete-tour/:id' ,deleteTour)
router.get('/get-tour',GetTours)
router.post('/uploadImg', upload.single('image'),UploadC)

 

module.exports  = router