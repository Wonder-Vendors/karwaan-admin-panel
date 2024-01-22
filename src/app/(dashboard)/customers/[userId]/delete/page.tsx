'use client'

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input'
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { useUsers } from '@/hooks/useUsers';

const page = () => {
    const {userId}=useParams<{userId:string}>();
    const { handleGetUser, handleDeleteUser } = useUsers({_id:userId});
    const router = useRouter();
    const [formData, setFormData] = useState<formType|null>(null);

    useEffect(() => {
     ( async()=> { 
       const data= await handleGetUser();
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
    const [input,setInput]=useState<string>("");
   
    // if (formData&&formData) {
        return (
            <div id={styles.container}>
                <div id={styles.wrapper}>
                    <span id={styles.heading}>Are you sure you want to delete this customer?</span>
                    <span id={styles.text}>Please type in "{formData&&formData.firstName.trim()}" of the customers to continue.</span>
                    <Input type='text' onChange={(e) => { setInput(e.target.value) }} name='name' text='Please enter the name of the user' />
                    <div id={styles.buttonContainer}>
                        <Button theme='default' text='Cancel' onClick={() => {router.push(`/users/${formData&&formData._id}`)}} type='button' />
                        <Button theme='danger' text='Delete' onClick={handleDeleteUser} type='button' loading={(formData&&formData.firstName.trim() !== input )as any} />
                    </div>
                </div>
            </div>
        )
    // }

    // router.push('/not-found')

    return;
}

export default page