"use client"

import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import animation from './animation.json'
import { useLottie } from 'lottie-react'
// import OrderChart from '@/components/ui/charts/OrderChart/OrderChart'

const page = () => {
  const user = JSON.parse(localStorage.getItem('user')!)

  const options = {
    animationData: animation,
    loop: true
  };

  const { View } = useLottie(options);
  return (
    <div id={styles.container}>
        <div id={styles.top}>
          <div id={styles.topLeft}>
            {View}
          </div>
          <span id={styles.heading}>Welcome {`${user.firstName} ${user.lastName}`}, to Karwaan Admin Pannel</span>
        </div>
        <div id={styles.middle}>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total orders</span>
            <span className={styles.middleItemNumber}>20</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total assets</span>
            <span className={styles.middleItemNumber}>20</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Revenue generated</span>
            <span className={styles.middleItemNumber}>20</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total users</span>
            <span className={styles.middleItemNumber}>20</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total Customers</span>
            <span className={styles.middleItemNumber}>20</span>
          </div>
          
        </div>
        <div id={styles.bottom}>
          {/* <OrderChart data={''}/> */}
        </div>
    </div>
  )
}

export default page