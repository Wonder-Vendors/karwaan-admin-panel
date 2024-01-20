"use client"
import React from 'react'
import styles from './page.module.css'
import GetUser from '@/components/shared/GetUsers/GetUser'

const page = () => {
 
    return (
        <div id={styles.container}>
            <span id={styles.heading}>Customer details</span>
            {/* <span id={styles.text}>Please fill all the feilds below to add an product on Karwaan Films main web application.</span> */}
            <GetUser role='customer'/>
        </div>
    )
}

export default page