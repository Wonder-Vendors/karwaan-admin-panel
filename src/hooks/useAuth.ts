import toast from "react-hot-toast";
import { useAxios } from "./useAxios";
import { useRouter } from "next/navigation";
import axios from "axios";
import { runValidations } from "@/utils/runValidations";
import { useAppDispatch } from "@/redux/hooks";
import { signin_failure, signin_request, signin_success, signup_request, signup_success } from "@/redux/reducers/userRequestReducer";

type useAuthProps = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export const useAuth = ({firstName, lastName, email, password}: useAuthProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSignup = async (e: any) => {
        e.preventDefault();

        
        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        const {runSignupValidation} = runValidations(email, password, firstName, lastName);
        if(runSignupValidation() === false){
            return;
        }

        dispatch(signup_request());

        try {
            const {postCall} = useAxios('/user/signup', payload)
            const response = await postCall();

            if(response.status === "success"){
                toast.success(response.message);
                router.push('/');
                if(typeof(window) !== "undefined"){
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                }
                return dispatch(signup_success({...response.data}));
            }

            return;
        } catch (error:any) {
            if(axios.isAxiosError(error)){
                if (error.response?.status === 403 || error.response?.status === 402) {
                    if (localStorage.getItem("user")) {
                        localStorage.removeItem("user");
                    }
                    if (localStorage.getItem('token')) {
                        localStorage.removeItem("token");
                    }
                }
                return toast.error(error.response?.data.message);
            }

            toast.error(error.message);
            return dispatch(signin_failure(error.message)); 
        }
    } 

    const handleSignin = async (e: any) => {
        e.preventDefault();        

        const payload = {
            email: email,
            password: password,
        }

        const {runSigninValidation} = runValidations(email, password, firstName, lastName);
        if(runSigninValidation() === false){
            return;
        }

        dispatch(signin_request());

        try {
            const {postCall} = useAxios('/user/signin', payload);
            const response = await postCall();

            if(response.status === "success"){
                toast.success(response.message);
                router.push('/');
                if(typeof(window) !== "undefined"){
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.token);
                }
                return dispatch(signin_success({...response.data}));
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
                }
                return toast.error(error.response?.data.message);
            }

            toast.error(error.message);
            return dispatch(signin_failure(error.message)); 
        }
    }

    return {handleSignup, handleSignin}
}