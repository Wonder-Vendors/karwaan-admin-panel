import { useRouter } from 'next/navigation';
import React, { useEffect,useState } from 'react'
import styles from './ProductCard.module.css'
import { ClipLoader } from 'react-spinners';

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
    const [imgdata,setData] = useState<string>(data)
    const [loading,setLoading] = useState<boolean>(true)
    useEffect(()=>{
        if(!imgdata.startsWith("http")){
            setData(`https://${data}`)
            setLoading(false)
        }
        else{
            setLoading(false)
        }
        
    },[])
  return (
    <div onClick={() => {router.push(`/products/${_id}`)}} id={styles.container}>
        <div id={styles.imageContainer}>
            {loading?<ClipLoader color='blue' size={20}/>:
                <img src={imgdata} alt="Error loading image" id={styles.image}/>}
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


