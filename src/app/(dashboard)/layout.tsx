"use client"

import React from 'react'
import styles from './layout.module.css'
import Navbar from '@/components/shared/Navbar/Navbar'
const layout = ({children}: {children: React.ReactNode}) => {

  return (
    <div id={styles.container}>
      <Navbar />
      {children}
    </div>
  )
}

export default layout