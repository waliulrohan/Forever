const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const { notFoundHandler, errorHandler } = require("./middlewere/error/errorMiddlewere");
const userRoute = require("./routes/userRoute");
const emailRoute = require("./routes/emailRoute")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }))
dotenv.config()

// interval for keeping this site awake
setInterval(async ()=>{
    console.log('pign to keep server awake..');

},14*60*1000)


// database connection

const connectToDb = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
    
        console.log('Connected to photographic database ');
      } catch (error) {
        console.error('Error connecting to photographic MongoDB:', error.message);
      }
    };
    
    connectToDb();
//routes
app.get("/",(req , res)=>{
res.send("mail is oooon")
})

app.use("/user" , userRoute)
app.use("/email" , emailRoute)



const port = process.env.PORT
app.listen(port,()=>{
    console.log(`mail server is running on port ${port}`)
})

//Not found
app.use(notFoundHandler)
// error handler
app.use(errorHandler)