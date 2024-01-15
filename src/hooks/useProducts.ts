import toast from "react-hot-toast";
import { useAxios } from "./useAxios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { locallyStoredVariables } from "@/constants/locallyStoredVariables";
import { useEffect, useState } from "react";

type Params = {
    formdata?: FormData,
    productId?: string
}

export const useProduct = (payload: Params) => {
    const router = useRouter();
    const addProduct = async(e: any) => {
        e.preventDefault();
        
        try {
            const {token} = locallyStoredVariables();
            const {postCall} = useAxios('/admin/create-product', payload, token);
            const response = await postCall();
            
            if(response.status === "success"){
                toast.success(response.message);
                router.push(`/products/${response.data.product_data._id}`);
            }

        } catch (error: any) {
             if(axios.isAxiosError(error)){
                return toast.error(error.response?.data.message);
            }

            toast.error(error.message);
        }
    }

    const handleGetProduct = () => {
        const {productId} = payload;
        const [response, setResponse] = useState<any>(undefined);
        useEffect(() => {
            const getProductDetails = async () => {
                try {
                    const { getCall } = useAxios(`/product/${productId}`);
                    const res = await getCall();
                    setResponse(res.data);
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        toast.error(error.response?.data.message);
                    }
    
                    toast.error(error.message);
                }
            }
    
            getProductDetails();
        }, [productId]);

        return response;
    }

    return {addProduct}
}