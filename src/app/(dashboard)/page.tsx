"use client"

import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import animation from './animation.json'
import { useLottie } from 'lottie-react'
import { locallyStoredVariables } from '@/constants/locallyStoredVariables'
import { useDashboard } from '@/hooks/useDashboard'
import { useRouter } from 'next/navigation'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ClipLoader } from 'react-spinners'

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

      <div id={styles.middle}>
        <div className={styles.middleItem}>
          <span className={styles.middleItemText}>Total orders</span>
          <span className={styles.middleItemNumber}>{
            dashboardData ?
              dashboardData.orders_count :
              <div>
                <ClipLoader color="blue" size={15} speedMultiplier={0.5} />
              </div>}</span>
        </div>
        <div className={styles.middleItem}>
          <span className={styles.middleItemText}>Total assets</span>
          <span className={styles.middleItemNumber}>{
             dashboardData ?
            dashboardData.products_count
            :
            <div>
              <ClipLoader color="blue" size={15} speedMultiplier={0.5} />
            </div>}</span>
        </div>
        <div className={styles.middleItem}>
          <span className={styles.middleItemText}>Revenue generated</span>
          <span className={styles.middleItemNumber}>{
             dashboardData ?
            dashboardData.total_revenue
            :
            <div>
              <ClipLoader color="blue" size={15} speedMultiplier={0.5} />
            </div>
            }<CurrencyRupeeIcon className={styles.rupee} /></span>
        </div>
        <div className={styles.middleItem}>
          <span className={styles.middleItemText}>Total users</span>
          <span className={styles.middleItemNumber}>{
             dashboardData ?
            dashboardData.users_count
            :
            <div>
              <ClipLoader color="blue" size={15} speedMultiplier={0.5} />
            </div>
            }</span>
        </div>
        <div className={styles.middleItem}>
          <span className={styles.middleItemText}>Total Customers</span>
          <span className={styles.middleItemNumber}>{
             dashboardData ?
            dashboardData.customers_count
            :
            <div>
              <ClipLoader color="blue" size={15} speedMultiplier={0.5} />
            </div>
            }</span>
        </div>

      </div>

      <div id={styles.bottom}>
        {/* <OrderChart data={''}/> */}
        {/* products */}
        <div className={styles.products}>
          <h2 className={styles.heading}>Top Products</h2>

          {/* { topProducts && topProducts.map((data: any, index: number) => {
                return (
                  <div className={styles.ProductsContainer} key={index}>
                    <img className={styles.ProductsContainerLeft} src={"data:image/jpeg;base64," + data?.product_details?.media?.data} alt="not found" />
                    <div className={styles.ProductsContainerRight}>
                      <div className={styles.cartItemInfo}>{data?.product_details.name}</div>
                      <div className={styles.cartItemInfo}>{data?.product_details.tags.join(", ")}</div>
                      <div className={styles.cartItemInfo}>{data?.product_details.price + " "}<CurrencyRupeeIcon className={styles.rupee} /></div>
                    </div>
                  </div>
                )
              })
            } */}
        </div>

      </div>
    </div>
  )
}

export default page