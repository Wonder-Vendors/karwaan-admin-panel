"use client"

import AddProduct from '@/components/form/AddProduct/AddProduct';
import React, { useState } from 'react'
import styles from './page.module.css'

const page = () => {
    
    return (
        <div id={styles.container}>
            <span id={styles.heading}>Add a product</span>
            <span id={styles.text}>Please fill all the feilds below to add an product on Karwaan Films main web application.</span>
            <AddProduct/>
        </div>
    )
}

export default page