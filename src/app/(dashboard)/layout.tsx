"use client"

import React from 'react'
import styles from './layout.module.css'
import Navbar from '@/components/shared/Navbar/Navbar'
import { useRouter } from 'next/navigation'
import withAuth from '@/components/shared/RoutesProtect/withAuth'
// const router=useRouter();
const layout = ({children}: {children: React.ReactNode}) => {
//   if(typeof(window) !== "undefined"){
//    var token = localStorage.getItem('token');
//    if(!token){
//     router.push('/signin');
//    }
// }
  return (
    <div id={styles.container}>
      <Navbar />
      {children}
    </div>
  )
}

export default withAuth(layout)