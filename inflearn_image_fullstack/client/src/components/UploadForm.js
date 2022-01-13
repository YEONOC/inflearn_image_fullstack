import React, { useState } from "react";
import axios from "axios"
import "./UploadForm.css";
import {toast} from "react-toastify"
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
    const defaultFileName = "이미지 파일을 업로드 해주세요."
    const [file, setFile] = useState(null); // file을 수정하고 싶을때 setFile을 통해 수정하게 함. 초기값 : null
    const [imgSrc, setImgSrc] = useState(null);
    const [fileName, setFileName] = useState(defaultFileName); // file이름
    const [percent, setPercent] = useState(0);

    const imageSelectHandler = (event) => { // 이미지 파일 업로드 기능
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (e) => setImgSrc(e.target.result);
    };

    const onSubmit = async (e) => { // submit 기능 구현 : submit을 누르면 새로고침 하는 기능을 막고 이미지를 제출하는 기능
        e.preventDefault(); // default(새로고침해주는)것을 막아줌
        const formData = new FormData();
        formData.append("image", file);  // formData 안에 (key:image, value:file)을 넣어줌
        try {
            const res = await axios.post("/images", formData, {
                headers : {"Content-Type" : "multipart/form-data"},
                onUploadProgress : (e) => {
                    setPercent(Math.round(100 * e.loaded/e.total));
                },
            });
            toast.success("이미지 업로드 성공!");
            setTimeout(() => {
                setPercent(0)
                setFileName(defaultFileName)
                setImgSrc(null)
            }, 3000);
        } catch(err) {
            toast.error(err.message);
            setPercent(0)
            setFileName(defaultFileName)
            setImgSrc(null)
            console.error(err);
        };
    };
    return ( // 화면에 보이는 layout
        <form onSubmit = {onSubmit}>
            <img src={imgSrc} className={`image-preview ${imgSrc && "image-preview-show"}`} />
            <ProgressBar percent={percent}/>
            <div className = "file-dropper">
                {fileName}
                <input 
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={imageSelectHandler} // 변화가 발생했을 때 실행
                />
            </div>
            <button type="submit" style={{
                width:"100%",
                height : 40,
                borderRadius : 3,
                cursor : "pointer",
                }}>제출 </button>
        </form>
    );
};

export default UploadForm;