import toast from "react-hot-toast";
import { useAxios } from "./useAxios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { locallyStoredVariables } from "@/constants/locallyStoredVariables";
import { useState } from "react";
type payloadType = {
    url: string,
    name: string,
    price: any,
    tags: string[],
    description: string,
    userId: string | null
}
type Params = {
    payload?: payloadType,
    formdata?: FormData,
    productId?: string | string[] | undefined
}

export const useProduct = (payload: Params) => {
    const router = useRouter();
    // add product 
    const addProduct = async(e: any) => {
        e.preventDefault();
        
        try {
            const {token} = locallyStoredVariables();
            const {postCall} = useAxios('/admin/create-product', payload.formdata, token);
            const response = await postCall();
            
            if(response.status === "success"){
                toast.success(response.message);
                router.push(`/products/${response.data._id}`);
            }

        } catch (error: any) {
             if(axios.isAxiosError(error)){
                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                    router.push('/signin');
                }
                return toast.error(error.response?.data.message);

            }

            toast.error(error.message);
        }
    }
    // update product 
    const updateProduct = async(e: any) => {
        e.preventDefault();
        const {productId} = payload;
        
        try {
            const {token} = locallyStoredVariables();
            const {putCall} = useAxios(`/admin/update-product/${productId}`, payload.formdata, token);
            const response = await putCall();
            
            if(response.status === "success"){
                toast.success(response.message);
                router.push(`/products/${productId}`)
            }

        } catch (error: any) {
             if(axios.isAxiosError(error)){
                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                    router.push('/signin');
                }
                return toast.error(error.response?.data.message);
                
            }

            toast.error(error.message);
        }
    }

     // handle Get Product
     const handleGetProduct = async () => {
        // dispatch(getUser_request());
        const {productId} = payload;
        try {
            const { getCall } = useAxios(`/product/${productId}`);
      
            const result = await getCall();
            if (result.status === "success") {
                // dispatch(getUser_success());
                // dispatch(update_user_data(response.data.user));
                return result.data;
            }

        } catch (error: any) {
            // dispatch(getUser_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                // dispatch(getUser_failure(error.response?.data.message));

                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                    router.push('/signin');
                }

                toast.error(error.message);
            }
        }
    }
 
    
     // handle top Products
     const handleGetTopProduct = async () => {
        // dispatch(getUser_request());
        const {token} = locallyStoredVariables();
        try {
            const { getCall } = useAxios(`/admin/get-top-products`,null,token);
            const result = await getCall();
            if (result.status === "success") {
                // dispatch(getUser_success());
                // dispatch(update_user_data(response.data.user));
                return result.data;
            }

        } catch (error: any) {
            // dispatch(getUser_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                // dispatch(getUser_failure(error.response?.data.message));

                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                    router.push('/signin');
                }
            }
        }
    }
     // handle worst Products
     const handleGetWorstProduct = async () => {
        // dispatch(getUser_request());
        const {token} = locallyStoredVariables();
        try {
            const { getCall } = useAxios(`/admin/get-top-products`,null,token);
            const result = await getCall();
            if (result.status === "success") {
                // dispatch(getUser_success());
                // dispatch(update_user_data(response.data.user));
                return result.data;
            }

        } catch (error: any) {
            // dispatch(getUser_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                // dispatch(getUser_failure(error.response?.data.message));

                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                    router.push('/signin');
                }
            }
        }
    }
 
    
     // handle Delete Product
     const deleteProduct = async(e: any) => {
        e.preventDefault();
        const {productId} = payload;
        
        try {
            const {token,user} = locallyStoredVariables();
            const {deleteCall} = useAxios(`/admin/delete-product/${productId}`, {...payload,...user,userId:user?._id}, token);
            const response = await deleteCall();
            
            if(response.status === "success"){
                toast.success(response.message);
                router.push('/products');
            }

        } catch (error: any) {
             if(axios.isAxiosError(error)){
                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                    router.push('/signin');
                }
                return toast.error(error.response?.data.message);
           
            }

            toast.error(error.message);
        }
    }
 

    

    return {addProduct,updateProduct, handleGetProduct, deleteProduct, handleGetTopProduct, handleGetWorstProduct}
}