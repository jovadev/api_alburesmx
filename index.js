
const express = require("express");
const app = express();
const cors=require('cors')
require("dotenv").config({ path: "./config.env" });
////{path:__dirname+'/config.env'}
const port = process.env.PORT || 5000;

app.set('port',port);
app.use(cors());
app.use(express.static(__dirname+'/public'));

/*
app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
*/

app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html');
});

app.all('/albures/*',(req,res,next)=>{
  next();
});

app.use(require("./server/routes/data"));

app.get('*',(req,res)=>{
  res.status(404).send('Error, la página no existe');
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on port: ${app.get('port')}`);
});
