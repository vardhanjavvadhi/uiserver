const express = require('express');
const app =express();
const mongoose = require("mongoose");
const cors =require('cors');

const AppRouter =require("./routes/AppRoutes");


// enable cors
app.use(cors());

//enable postman data
app.use(express.json()); //allow row i.e json data middleware
app.use(express.urlencoded({extended:false})); // enable form data
// extend: flase ==> it will not allow the any parmas data (parms or query params)

app.use("/api", AppRouter);
const PORT = 9041;

const MONGO_DB_URI ="mongodb+srv://vardhanjavvadhi9246:Vardhan7@cluster0.ao7r4zy.mongodb.net/";
mongoose
 .connect(MONGO_DB_URI)
 .then(() => {
    console.log("db connected successfully");
    app.listen(PORT, () =>{
        console.log('server is running on port', PORT);
    });
}).catch((error) => {
        console.log(error);
});
