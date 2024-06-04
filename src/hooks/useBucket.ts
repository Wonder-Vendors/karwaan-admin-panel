import axios from "axios";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";



const useBucket = () => {

    const getUrl = async (file: File | null) => {
        if (file) {
            try{
            const compressedFile = await imageCompression(file, { maxSizeMB: 10, maxWidthOrHeight: 1920, useWebWorker: true })
            // get signed url from bucket
            const signedUrl = (await axios.get("http://localhost:5000/api/v1/admin/getS3")).data.url
            await axios.put(signedUrl, compressedFile, { headers: { 'Content-Type': 'multipart/form-data', 'x-amz-acl': 'public-read' } })
            return signedUrl.split("?")[0]
            }
            catch (error) {
                toast.error("Something went wrong Please try again or refresh the page")
            }
        }
    }
    return { getUrl }

}
export default useBucket;