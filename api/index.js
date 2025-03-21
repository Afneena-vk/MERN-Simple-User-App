import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import userRoutes from './routes/user.route.js';
// import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRoutes  from '../api/routes/user.route.js'
import authRoutes from '../api/routes/auth.route.js'
import adminRoute from '../api/routes/adminRoute.js'

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(4000,() => {
    console.log('Server listening on port 4000');    
});

app.use('/api/user',userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/admin',adminRoute);


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})