"use client"
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ResetPassword from '@/components/form/ResetPassword/ResetPassword'
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
              <ResetPassword/>
              <Link href="/signin" id={styles.link}>Go back</Link>
          </div>
      </div>
    )
  }

export default page