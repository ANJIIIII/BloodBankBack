const express=require("express");
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')
const connectDB=require("./config/db")
const path = require('path');

const app=express();

require("dotenv").config();

const PORT= process.env.PORT || 4000;
app.use(express.json());

connectDB();



//middewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// const user=require("./routes/test");
// app.use("/api/v1",user);

const user1=require("./routes/authroute");
const inventory=require("./routes/inventoryroute");

app.use("/api/v1/auth", user1);
app.use("/api/v1/invent", inventory);
app.use("/api/v1/analytics", require("./routes/analyticsroute"));
app.use("/api/v1/admin", require("./routes/adminroutes"));
// app.use("/api/v1/auth", require("./routes/authroute"));

// app.use(express.static(path.join(__dirname,'./client/build')))

// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
});

app.get("/",(req,res)=>{
    res.send(`<h1>This is homepage </h1>`);
});
