"use client"

import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import animation from './animation.json'
import { useLottie } from 'lottie-react'
import { locallyStoredVariables } from '@/constants/locallyStoredVariables'
import { useDashboard } from '@/hooks/useDashboard'
import { useRouter } from 'next/navigation'
// import OrderChart from '@/components/ui/charts/OrderChart/OrderChart'

const page = () => {
  const router = useRouter();
  const { user } = locallyStoredVariables();
  const { token } = locallyStoredVariables();
  if (!user) {
    router.push('/signin')
    return;
  }

  const { handleDashboardData } = useDashboard();
  const dashboardData = handleDashboardData();

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
        <span id={styles.heading}>Welcome {user ? `${user.firstName} ${user.lastName}` : 'Unknown user'}, to Karwaan Admin Pannel</span>
      </div>
      { dashboardData ? 
        <div id={styles.middle}>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total orders</span>
            <span className={styles.middleItemNumber}>{dashboardData.orders_count}</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total assets</span>
            <span className={styles.middleItemNumber}>{dashboardData.products_count}</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Revenue generated</span>
            <span className={styles.middleItemNumber}>{dashboardData.total_revenue}</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total users</span>
            <span className={styles.middleItemNumber}>{dashboardData.users_count}</span>
          </div>
          <div className={styles.middleItem}>
            <span className={styles.middleItemText}>Total Customers</span>
            <span className={styles.middleItemNumber}>{dashboardData.customers_count}</span>
          </div>

        </div> : null
      }
      <div id={styles.bottom}>
        {/* <OrderChart data={''}/> */}
      </div>
    </div>
  )
}

export default page