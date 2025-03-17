import express from 'express';


const app = express();
// app.use(express.json());
// app.use(cookieParser());

app.listen(3000,() => {
    console.log('Server listening on port 4000');    
});
