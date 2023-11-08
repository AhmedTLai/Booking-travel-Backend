const db = require('../db')

var file;



  
  const UploadC = (req, res) => {
    // Handle the uploaded file here
    // const file = req.file;
    file = req.file 
   
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    res.status(200).json('File uploaded successfully.');
  };
 


const addTour = (req,res)=>{
const AddTourQ = "INSERT INTO `tours` (`title`, `city`, `distance`, `price`, `maxGroupSize`, `desc`, `photo`) VALUES (?)"



const title = req.body.title
const city = req.body.city
const distance = req.body.distance
const price = req.body.price
const maxGroupSize = req.body.maxGroupSize
const desc = req.body.desc
const photo = file.filename 

// const featured = req.body.featured


const data = [
    title,
    city,
    distance,
    price,
    maxGroupSize,
    desc,
    photo
    // featured
]

db.query(AddTourQ,[data],(err,result)=>{
    if(err) {
        return res.status(500).json(err)
    }
    return res.status(200).json('Success!')
})

}




const editTour = (req, res) => { 
    const { tourId } = req.params;
    const updatedData = req.body; // Assume it's an object with fields to update
  
    const setClauses = [];
    const values = [];
  
    // Iterate through the fields in updatedData
    for (const field in updatedData) {
      setClauses.push(`${field} = ?`);
      values.push(updatedData[field]);
    }
  
    // Construct the SQL query
    const updateQuery = `UPDATE tours SET ${setClauses.join(', ')} WHERE tour_id = ?`;
    values.push(tourId);
  
    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.json({ message: 'Tour updated successfully.' });
      }
    });
  };

const deleteTour = (req,res)=>{
    const deleteTourQ = 'DELETE FROM tours WHERE tour_id=?'
    const id = req.params.id
    db.query(deleteTourQ,[id],(err,result)=>{
        if(err){
            return res.status(500).json(err)
        }
        else{
            return res.status(200).json('Tour deleted')
        }
    })

}


const GetTours =(req,res) =>{
    const GetToursQ = 'SELECT * FROM tours'

    db.query(GetToursQ,(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        else{
            return res.status(200).json(data)
        }
    })
}

module.exports = {addTour,editTour,deleteTour,GetTours,UploadC}