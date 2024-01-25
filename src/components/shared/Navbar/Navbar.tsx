"use client"

import React from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'
import { navbarItems } from '@/constants/navbarItems'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button/Button'

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
        <Button text='Log out' type='button' onClick={() => localStorage.clear()}/>
    </div>
  )
}

export default Navbar