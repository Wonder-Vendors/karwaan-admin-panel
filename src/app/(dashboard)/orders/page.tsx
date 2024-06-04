"use client"


import axios from "axios";

import { ChangeEvent, useState } from "react";
import imageCompression from 'browser-image-compression';

const page = ()=>{
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState("");

  const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){

        setSelectedFile(event.target.files[0]);
    }

  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    



    try {
      const file = await imageCompression(selectedFile,{maxSizeMB:10,maxWidthOrHeight:1920,useWebWorker:true})
      const url = await axios.get("http://localhost:5000/api/v1/admin/getS3")
      const uploadImagetoS3 = await axios.put(url.data.url, file, {
        headers: {
          'Content-Type': "multipart/form-data",
          'x-amz-acl': 'public-read'
        },
      });
     
    setImgUrl(url.data.url.split("?")[0])

    } catch (error) {
    //   toast.error("something went wrong")
    }
  };
    return(
        <>
            {/* <div>
                <img src={imgUrl}/>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>

            </div> */}
        </>
    )
}
export default page