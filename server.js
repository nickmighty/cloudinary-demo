const express = require("express");
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


app.post("/api/images", async (req, res) => {
    const { title, body } = req.body;
    const image = req.files.image;
    const options = { width: 150, height: 150, crop: 'scale' };

    try {
        const cloudURL = await cloudinary.uploader.upload(image.tempFilePath, options);
        console.log(cloudURL);
        res.json({ imageurl: cloudURL.url, title, body });
    } catch (error) {
        res.json(error);
    }
})

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(PORT, console.log(`listening on ${PORT}`));