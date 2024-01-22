'use client'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useParams, useRouter } from 'next/navigation';
import { useUsers } from '@/hooks/useUsers';
import { ClipLoader } from 'react-spinners';
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";

function page() {
    const {userId}=useParams<{userId:string}>();
    const { handleGetCustomer } = useUsers({_id:userId});
    const router = useRouter();
    const [formData, setFormData] = useState<formType|null>(null);
    useEffect(() => {
        ( async()=> { 
          const data= await handleGetCustomer();
         data&& setFormData({
           token: data?.token,
           _id: data?._id,
           firstName: data?.firstName,
           lastName: data?.lastName,
           email: data?.email,
           phoneNumber: data?.phoneNumber,
           isEmailValid:data?.isEmailValid,
           isPhoneNumberValid:data?.isPhoneNumberValid,
       });
       })();
       }, []);
   
       type formType = {
           token: string,
           _id: string,
           firstName: string,
           lastName: string,
           email: string,
           phoneNumber: string,
           isEmailValid:boolean,
           isPhoneNumberValid:boolean,
       }


    // delete open and close logic

    return (

        <div className={styles.myAccountContainer} >
            <h1 className={styles.heading}>{formData?formData.firstName:("User")}'s Account</h1>
            <div className={styles.myAccount}>
                {/*  fields */}
                    <div className={styles.info}> <div className={styles.infoType}>User Id: </div>{formData?formData._id:""}</div>
                    <div className={styles.info}> <div className={styles.infoType}>First Name: </div>{formData?formData.firstName:""}</div>
                    <div className={styles.info}> <div className={styles.infoType}>Last Name: </div>{formData?formData.lastName:""}</div>
                    <div className={styles.info}> <div className={styles.infoType}>Phone Number: </div>{formData?(formData.phoneNumber?formData.phoneNumber:"Null"):"Null"}</div>
                    <div className={styles.info}> <div className={styles.infoType}>Is phone number verified: </div>{formData?(formData.isPhoneNumberValid?"true":"false"):""}</div>
                    <div className={styles.info}> <div className={styles.infoType}>Email: </div>{formData?(formData.email?formData.email:"Null"):""}</div>
                    <div className={styles.info}> <div className={styles.infoType}>Is email number verified: </div>{formData?(formData.isEmailValid?"true":"false"):""}</div>
               
                </div>
                <div className={styles.deleteAccount}>
                {/* delete account*/}
                    <button className={styles.btn} onClick={()=>router.push(`/customers/${formData&&formData._id}/delete`)}>delete account</button>

                </div>
                </div>
        

    )
}

export default page;