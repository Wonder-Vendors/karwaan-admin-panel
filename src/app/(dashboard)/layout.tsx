"use client"

import React from 'react'
import styles from './layout.module.css'
import Navbar from '@/components/shared/Navbar/Navbar'
import { useRouter } from 'next/navigation'
import { locallyStoredVariables } from '@/constants/locallyStoredVariables'

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // const { user, token } = locallyStoredVariables();
  // if (typeof (window) !== "undefined") {
  //   if (!user || !token) {
  //     router.push('/signin');
  //     return;
  //   }
  // }

  return (
    <div id={styles.container}>
      <Navbar />
      {children}
    </div>
  )
}

export default layout