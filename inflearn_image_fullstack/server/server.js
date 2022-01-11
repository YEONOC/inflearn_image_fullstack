const express = require('express');       // express : 서버
const multer = require('multer');         // multer : 이미지 파일 업로드를 도와주는 라이브러리
const { v4 : uuid } = require('uuid');    // uuid : 업로드 된 이미지 파일의 이름이 겹치지 않도록 고유의 id를 부여해주는 라이브러리
const mime = require('mime-types')        // mimetype : 파일의 확장자를 불러주는 라이브러리

const storage = multer.diskStorage({
    destination : (req, file, cb) => cb(null, "./uploads"),
    filename : (req, file, cb) =>
     cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) =>{
        if (["image/png", "image/jpeg"].includes(file.mimetype)) cb(null, true) // image의 확장자가 png or jpeg 둘 중 하나를 포함할 경우에 true callback
        else cb(new Error("Invalid file type."), false)                         // 아닐 경우 false callback
    },
    limits:{
        fileSize: 1024 * 1024 * 5   // 파일 크기를 제한
    }
});

const app = express(); // express로 서버 설정

app.use("/uploads", express.static("uploads")); //외부에서도 /uploads 경로에 있는 uploads 폴더의 사진 파일에 접근 가능

app.post('/upload', upload.single("imageTest"), (req, res) => { // 단일 사진을 올릴시 single 명령어 사용 단, ("  ") 안에 내용과 fieldname은 동일해야함. 
    console.log(req.file);
    res.json(req.file);
});

app.listen(5000, function(){
    console.log('listening on 5000');
});