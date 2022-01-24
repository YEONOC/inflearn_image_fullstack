const { Router } = require("express");
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

app.post('/', upload.single("image"), async (req, res) => { // 단일 사진을 올릴시 single 명령어 사용 단, ("  ") 안에 내용과 fieldname은 동일해야함. 
    const image = await new Image({
        key : req.file.filename, originalFileName : req.file.originalname
    }).save();
    res.json(image) 
});
app.get("/", async(req, res) => {
    const images = await Image.find();
    res.json(images);
});

module.exports = { imageRouter };