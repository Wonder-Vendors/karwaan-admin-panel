import { useDispatch } from "react-redux";
import { useAxios } from "./useAxios";
import { updateOrders } from "@/redux/reducers/ordersReducer";
import toast from "react-hot-toast";
import axios from "axios";


const useOrders = () => {
    const dispatch = useDispatch()
    const getOrders = async(token:string) =>{
        let endpoint ="/admin/order"
        try {
            const {getCall} = useAxios(endpoint,null,token)
            const res = await getCall()
            if (res.status === "success") {
                dispatch(updateOrders(res.data))
                return res.data
            }

        } catch (error:any) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                
            }
            toast.error("Something went wrong");
           
        }
    }
    const getSingleOrder = async(token:string,orderId:string) =>{
        let endpoint =`/admin/order/${orderId}`
        try {
            const {getCall} = useAxios(endpoint,null,token);
            const res = await getCall()
            if (res.status === "success") {
                return res.data
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
                
            }
            toast.error("Something went wrong");
        }

        return {status:"error"}
    }
    return {getOrders,getSingleOrder}
}

export default useOrders