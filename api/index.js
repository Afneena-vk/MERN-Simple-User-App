import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
});

const app = express();
// app.use(express.json());
// app.use(cookieParser());

app.listen(4000,() => {
    console.log('Server listening on port 4000');    
});
