"use client"

import Button from '@/components/ui/Button/Button';
import { useAxios } from '@/hooks/useAxios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { locallyStoredVariables } from '@/constants/locallyStoredVariables';

const page = () => {
    const {productId} = useParams();
    const router = useRouter();
    const {user} = locallyStoredVariables();
    if(!user){
        router.push('/signin')
        return;
    }

    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const {getCall} = useAxios(`/product/${productId}`);
                const response = await getCall();
                setProduct(response.data);
            } catch (error: any) {
                if(axios.isAxiosError(error)){
                    toast.error(error.response?.data.message);
                }
                
                toast.error(error.message);
                setProduct("not found")
            }
        }

        getProductDetails();
    }, []);

    if(product){
        return (
            <div id={styles.container}>
                <div id={styles.left}>
                    {product.media.type === 'image' ? <img src={`data:image/png;base64,${product.media.data}`} alt="Error loading image" id={styles.image}/> : <video src="" id={styles.video}></video>}
                </div>
                <div id={styles.right}>
                    <div id={styles.top}>
                        <Button theme='default' type='button' onClick={() => router.push(`/products/${productId}/update`)} text='Update Product'/>
                        <Button theme='danger' type='button' onClick={() => router.push(`/products/${productId}/delete`)} text='Delete Product'/>
                    </div>
                    <div id={styles.bottom}>
                        <span id={styles.name}>{product?.name}</span>
                        <span id={styles.price}>Rs. {product?.price}</span>
                        <span id={styles.tags}>Tags: {product?.tags.map((tag: any) => {return <span className={styles.tag}>{tag}</span>})}</span>
                        <span id={styles.description}>{product.description}</span>
                    </div>
                </div>
            </div>
          )
    }

    if(product === "not found"){
        return router.push('/not-found')
    }
 
}

export default page