import { useEffect, useState } from "react"
import { useAxios } from "./useAxios"
import { locallyStoredVariables } from "@/constants/locallyStoredVariables";

export const useDashboard = () => {
    const [response, setResponse]=useState<any>(undefined);
    const {token} = locallyStoredVariables();  

    const handleDashboardData = () => {
        useEffect(() => {
            const getDashboardData = async () => {
                const {getCall} = useAxios('/admin/get-dashboard-data', null, token)
                const res = await getCall();
                setResponse(res.data);
                return response;
            }

            getDashboardData();
        }, []);

        return response;
    }

    return {handleDashboardData};
}