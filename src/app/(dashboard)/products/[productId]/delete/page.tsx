'use client'

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input'
import { useAxios } from '@/hooks/useAxios';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import styles from './page.module.css'
import { useProduct } from '@/hooks/useProducts';

const page = () => {
    const { productId } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [input, setInput] = useState<string>('');
const {deleteProduct} =useProduct({productId:productId as string});
    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const { getCall } = useAxios(`/product/${productId}`);
                const response = await getCall();
                setProduct(response.data);
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                }

                toast.error(error.message);
                setProduct("not found")
            }
        }

        getProductDetails();
    }, []);
    if (product) {
        return (
            <div id={styles.container}>
                <div id={styles.wrapper}>
                    <span id={styles.heading}>Are you sure you want to delete this product?</span>
                    <span id={styles.text}>Please type in "{product.name.trim()}" of the product to continue.</span>
                    <Input type='text' onChange={(e) => { setInput(e.target.value) }} name='name' text='Please enter the name of the product' />
                    <div id={styles.buttonContainer}>
                        <Button theme='default' text='Cancel' onClick={() => {router.push(`/products/${productId}`)}} type='button' />
                        <Button theme='danger' text='Delete' onClick={deleteProduct} type='button' loading={product.name.trim() !== input} />
                    </div>
                </div>
            </div>
        )
    }

    // router.push('/not-found')

    return;
}

export default page