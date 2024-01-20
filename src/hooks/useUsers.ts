import toast from "react-hot-toast";
import { useAxios } from "./useAxios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { locallyStoredVariables } from "@/constants/locallyStoredVariables";
import { useState } from "react";
type payloadType = {
    file: any,
    name: string,
    price: any,
    tags: string[],
    description: string,
    userId: string | null
}
type Params = {
    payload?: payloadType,
    role?: 'admin' | 'user' | 'customer',
    _id?: string
}

export const useUsers = (payload: Params) => {
    const router = useRouter();
    // get users 

    const handleGetUsers = async () => {
        try {
            console.log("han m chala")
            const { token } = locallyStoredVariables();
            if (payload.role === 'admin') {
                var { getCall } = useAxios(`/admin/get-admins`, null, token);
            } else if (payload.role === 'user') {
                var { getCall } = useAxios(`/admin/get-users`, null, token);
            }else{
                var { getCall } = useAxios(`/admin/customer_details`, null, token);
            }
         
            const response = await getCall();
            return response.data;

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }

            toast.error(error.message);
        }
    }
    // get Customer
    const handleGetCustomer = async () => {
        try {
            const { token } = locallyStoredVariables();
        
                var { getCall } = useAxios(`/admin/customer_detail/${payload._id}`, null, token);
           
         
            const response = await getCall();
            return response.data;

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message);
            }

            toast.error(error.message);
        }
    }
   
     // handle Get User
     const handleGetUser = async () => {
         if (!payload._id) return;
         // dispatch(getUser_request());
         const {token} =locallyStoredVariables();
        try {
            const { getCall } = useAxios(`/user/${payload._id}`, null, token);
            const response = await getCall();
            if (response.status === "success") {
                // dispatch(getUser_success());
                // dispatch(update_user_data(response.data.user));
             console.log("56",response.data)
                return {  ...response.data };
            }

        } catch (error: any) {
            // dispatch(getUser_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                // dispatch(getUser_failure(error.response?.data.message));
            }
        }
    }

    // handle Delete User
    const handleDeleteUser = async (e: any) => {
        e.preventDefault();
        const {token} = locallyStoredVariables();
        // dispatch(deleteUser_request());
        // if(!token) return;
        try {
            const { deleteCall } = useAxios(`/user/${payload._id}`, null, token);

            const response = await deleteCall();
            if (response.status === "success") {
                // dispatch(deleteUser_success());
                toast.success(response.message && response.message);
                router.push('/users')
                // router.push('/customers')
                // dispatch(update_user_data(response.data.user));
                return;
            }
        } catch (error: any) {
            // dispatch(deleteUser_failure(error.message));
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                // dispatch(deleteUser_failure(error.response?.data.message));

            }
        }
    }

    return {handleGetUsers, handleGetCustomer, handleDeleteUser, handleGetUser }
} 
