import { useRouter } from 'next/navigation';
import React from 'react'
import styles from './ProductCard.module.css'

type Props = {
    userId: string, 
    name: string,
    tags: string[],
    description: string, 
    price: number,
    data: string,
    _id: string
}

const ProductCard = ({ name, tags, description, price, data, _id}: Props) => {
    const router = useRouter();
  return (
    <div onClick={() => {router.push(`/products/${_id}`)}} id={styles.container}>
        <div id={styles.imageContainer}>
            <img src={data} alt="Error loading image" id={styles.image}/> : <video src="" id={styles.video}></video>
        </div>
        <div id={styles.wrapper}>
            <div id={styles.top}>
                <span id={styles.name}>{name.length < 15 ? name : `${name.substring(0, 15)}...`}</span>
                <span id={styles.price}>Rs.{price}</span>
            </div>
            <span id={styles.tags}>Tags: {tags.map((tag) => {return <span className ={styles.tag}>{tag}</span>})}</span>
            <span id={styles.description}>{description.length < 30 ? description : `${description.substring(0, 15)}...`}</span>
        </div>
    </div>
  )
}

export default ProductCard