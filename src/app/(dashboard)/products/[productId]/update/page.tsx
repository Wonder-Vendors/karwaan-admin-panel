'use client'
import UpdateProduct from '@/components/form/UpdateProduct/UpdateProduct';
import React from 'react';
import styles from './style.module.css';
import { useParams } from 'next/navigation';

const page = () => {
  const {productId} = useParams();

  return (
    <div id={styles.container}>
    <span id={styles.heading}>Update a product</span>
    <span id={styles.text}>Please fill all the feilds below to update an product on Karwaan Films main web application.</span>
    <UpdateProduct productId={productId}/>
    </div>
  )
}

export default page