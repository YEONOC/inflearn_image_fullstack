require("dotenv").config();
const express = require('express');       // express : 서버
const mongoose = require('mongoose');
const Image = require("./models/Image");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");


const app = express(); // express로 서버 설정

const { MONGO_URI, PORT } = process.env

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected.");
        app.use("/uploads", express.static("uploads")); //외부에서도 /uploads 경로에 있는 uploads 폴더의 사진 파일에 접근 가능
        app.use("/images", imageRouter);
        app.use("/users", userRouter);
        app.listen(PORT, function(){
            console.log('listening on 5000');
        });
    })
    .catch((err) => console.log(err));
