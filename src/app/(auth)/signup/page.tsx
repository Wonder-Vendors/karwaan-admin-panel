"use client"

import SignupForm from '@/components/form/SignupForm/SignupForm'
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
const Page = () => {
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
            <SignupForm/>
            <span id={styles.text}>Already a user <Link href="signin" id={styles.link}>Log in</Link></span>
        </div>
    </div>
  )
}

export default Page;