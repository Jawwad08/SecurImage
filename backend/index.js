const connectToMongo=require('./db');
const express = require("express");
connectToMongo();
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
const fs = require("fs");
const imageModel = require("./models/imageModel");
//auth
require('dotenv').config()
const userRoutes = require('./routes/user')
//
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage =  imageModel({
    name: req.body.name,
    category:req.body.category,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/jpg",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});


app.get('/',async (req,res)=>{
  const allData = await imageModel.find()
  res.json(allData)
})
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use('/api/user', userRoutes)
app.listen(port, () => {
  console.log("server running successfully");
});