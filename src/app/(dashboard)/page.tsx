"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import animation from './animation.json'
import { useLottie } from 'lottie-react'
import { locallyStoredVariables } from '@/constants/locallyStoredVariables'
import { useDashboard } from '@/hooks/useDashboard'
import { useRouter } from 'next/navigation'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ClipLoader } from 'react-spinners'
import { useProduct } from '@/hooks/useProducts'

// import OrderChart from '@/components/ui/charts/OrderChart/OrderChart'

const page = () => {
  const router = useRouter();
  const { user } = locallyStoredVariables();
  const { token } = locallyStoredVariables();
  if (!user) {
    router.push('/signin')
    return;
  }
  const {handleGetTopProduct, handleGetWorstProduct}=useProduct({});
  const { handleDashboardData } = useDashboard();
  const dashboardData = handleDashboardData();
  const [topProducts,setTopProducts]=useState<any>("");
  const [worstProducts,setWorstProducts]=useState<any>("");
// get top products 
useEffect(()=>{
(async()=>{
    const topProductsData =await handleGetTopProduct();
    const worstProductsData=await handleGetWorstProduct();
    setTopProducts(topProductsData);
    setWorstProducts(worstProductsData);
  })();
},[])
  const options = {
    animationData: animation,
    loop: true
  };
   console.log("koi toh ",worstProducts)
  const { View } = useLottie(options);
  return (
    <div id={styles.container}>
      {/* top */}
      <div id={styles.top}>
        <div id={styles.topLeft}>
          {View}
        </div>
        <span id={styles.heading}>Welcome {user ? `${user.firstName} ${user.lastName}` : 'Unknown user'}, to Karwaan Admin Pannel</span>
      </div>
      {/* middle */}
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
              <ClipLoader color="blue" size={20} speedMultiplier={0.5} />
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
        {/* top Products */}
        <div className={styles.products}>
          <h2 className={styles.heading}>Top Products</h2>

          { topProducts && topProducts.map((data: any, index: number) => {
                return (
                  <div className={styles.ProductsContainer} key={index}>
                    <img className={styles.ProductsContainerLeft} src={"data:image/jpeg;base64," + data?.media?.data} alt="not found" />
                    <div className={styles.ProductsContainerRight}>
                      <div className={styles.cartItemInfo}>Name<span className={styles.info}>{data?.name}</span></div>
                      <div className={styles.cartItemInfo}>Tags<span className={styles.info}>{data?.tags.join(", ")}</span></div>
                      <div className={styles.cartItemInfo}>Price<span className={styles.info}>{data?.price + " "}</span><CurrencyRupeeIcon className={styles.rupee2} /></div>
                      <div className={styles.cartItemInfo}>Count<span className={styles.info}>{data?.count }</span></div>
                    </div>
                  </div>
                )
              })
            }
        </div>
        {/* worst Products */}
        <div className={styles.products}>
          <h2 className={styles.heading}>Worst Products</h2>

          { worstProducts && worstProducts.map((data: any, index: number) => {
                return (
                  <div className={styles.ProductsContainer} key={index}>
                    <img className={styles.ProductsContainerLeft} src={"data:image/jpeg;base64," + data?.media?.data} alt="not found" />
                    <div className={styles.ProductsContainerRight}>
                      <div className={styles.cartItemInfo}>Name<span className={styles.info}>{data?.name}</span></div>
                      <div className={styles.cartItemInfo}>Tags<span className={styles.info}>{data?.tags.join(", ")}</span></div>
                      <div className={styles.cartItemInfo}>Price<span className={styles.info}>{data?.price + " "}</span><CurrencyRupeeIcon className={styles.rupee2} /></div>
                      <div className={styles.cartItemInfo}>Count<span className={styles.info}>{data?.count }</span></div>
                    </div>
                  </div>
                )
              })
            }
        </div>

      </div>
    </div>
  )
}

export default page