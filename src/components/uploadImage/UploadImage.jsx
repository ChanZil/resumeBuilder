import React from 'react'
import '../uploadImage/uploadImage.css';

export default function UploadImage({ imgResume, setImgResume, setImgUpload }) {

    const imgSelectedHandler = (e) => {
        const img = e.target.files[0];
        setImgResume(URL.createObjectURL(img));
        setImgUpload(img);
    }

    return (
        <div>
            <label class="file-upload">
            <input type="file" onChange={imgSelectedHandler} accept="image/png, image/jpeg" />
                <img src={imgResume} alt="Resume" className="border border-gray-300 rounded-md w-32 h-32 cursor-pointer" />
            </label>
        </div>
    )
}
