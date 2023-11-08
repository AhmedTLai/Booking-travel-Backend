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
    credentials : true,
    origin : 'http://192.168.1.129:5173'
}))



app.use('/api/user',AuthR)
app.use('/api/tour',TourR)

 


app.get('/',(req,res)=>{
    db.connect((err)=>{
        if(err){
            console.log('notch hahahahahhahahahahahahahahahahahahaahahahahahahahahahahahahah')
        }else{
            console.log('yesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
        }
    }
    )
    res.json('its working fine !')
})



const connection = ()=>{
    db.connect((err)=>{
    if(err){
        console.log(err)
        setTimeout(connection,2000)
    }else{
        app.listen(4000, ()=>{   
            console.log('loged in')
    })  
    }
    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') { // Connection to the MySQL server is usually
            connection();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
})
}

connection()



