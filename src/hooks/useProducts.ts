import toast from "react-hot-toast";
import { useAxios } from "./useAxios";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
    file: any;
    name: string;
    price: number | null;
    tags: string[];
    description: string;
    userId: string | null | undefined;
}

export const useProduct = (payload: FormData) => {
    const router = useRouter();
    const addProduct = async(e: any) => {
        e.preventDefault();
        
        try {
            if(typeof(window) !== "undefined"){
                var token = JSON.parse(localStorage.getItem('token')!)
            }
            const {postCall} = useAxios('/admin/create-product', payload, token);
            const response = await postCall();
            
            if(response.status === "success"){
                toast.success(response.message);
                // router.push(`/products/${response.data.product_data._id}`);
            }

        } catch (error: any) {
             if(axios.isAxiosError(error)){
                return toast.error(error.response?.data.message);
            }

            toast.error(error.message);
        }
    }

    return {addProduct}
}