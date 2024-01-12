"use client"

import React from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'
import { navbarItems } from '@/constants/navbarItems'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname()
  return (
    <div id={styles.container}>
        <Link href="/" id={pathname === '/' ? styles.selectedHeading : styles.heading}>Dashboard</Link>
        {navbarItems.map((navbarItem, index) => {
            if(navbarItem.route === pathname){
                return <Link href={navbarItem.route} key={index} className={styles.selectedItem}>{navbarItem.name}</Link> 
            }
            return <Link href={navbarItem.route} key={index} className={styles.item}>{navbarItem.name}</Link> 
        })}
    </div>
  )
}

export default Navbar