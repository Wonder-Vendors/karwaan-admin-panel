"use client"
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import { ForgotPassword } from '@/components/form/ForgotPassword/ForgotPassword'
import Link from 'next/link'
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
const page = () => {
  useEffect(()=>{
    const token =(localStorage.getItem("token")as string);
      if(token){
          redirect("/");
      }
  },[]);
  return (
    <div id={styles.container}>
        <div id={styles.wrapper}>
            <Image src="/logo.png" alt='Error loading image' height={0} width={0} style={{height: "20%", width: "100%", objectFit: "contain"}} unoptimized={true}/>
            <span id={styles.text}>By clicking on "Send email" button,  an email will be sent to your account with a link, please click on that link to reset your password.</span>
            <ForgotPassword/>
            <Link href="/signin" id={styles.link}>Go back</Link>
        </div>
    </div>
  )
}

export default page