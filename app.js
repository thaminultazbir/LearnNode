const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());//Middleware for req.body to push in file
app.use('/api/v1/tours', tourRouter); //Mounting Router
app.use('/api/v1/users', userRouter);
////////SERVER START//////////
const port = 3000;
app.listen(port, ()=>{
    console.log(`App is listen at port:${port}...`);
});