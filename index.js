const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const AuthR = require('./routes/AuthR')
const TourR = require('./routes/tourR') 
const app = express()



app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
}))
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     });
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://192.168.1.129:5173");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   })
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
 });


app.use('/api/user',AuthR)
app.use('/api/tour',TourR)

 


app.get('/',(req,res)=>{
    // db.connect((err)=>{
    //     if(err){
    //         console.log('notch hahahahahhahahahahahahahahahahahahaahahahahahahahahahahahahah')
    //     }else{
    //         console.log('yesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
    //     }
    // }
    // )
    res.json('its working fine !')
})



const connection = () => {
    const connectDB = () => {
        db.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                throw err
                // if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
                //     console.error('Reconnecting to the database...');
                //     setTimeout(connectDB, 2000);
                // } else {
                //     throw err;
                // }
            } else {
                app.listen(4000, () => {
                    console.log('Server is running on port 4000');
                });
            }
        });
    };

    // Handle MySQL errors and reconnect
    // db.on('error', (err) => {
    //     console.error('DB error', err);
    //     if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
    //         console.error('Reconnecting to the database...');
    //         connectDB();
    //     } else {
    //         throw err;
    //     }
    // });

    // // Initial database connection
    connectDB();
};

connection();



