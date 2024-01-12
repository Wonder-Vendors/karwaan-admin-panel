"use client"

import React, { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'
import ProductCard from '@/components/card/ProductCard/ProductCard'
import { useAxios } from '@/hooks/useAxios';
import toast from 'react-hot-toast';

const page = () => {
    const [products, setProducts] = useState<{
        _id: string,
        userId: string,
        name: string,
        tags: string[],
        price: number,
        description: string;
        media: {
            data: string,
            url: null,
            type: 'image' | 'video',
        },
        paid: boolean
    }[]>([]);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const { getCall } = useAxios('/product');
                const response = await getCall();
                console.log('API Response:', response);
                setProducts(response.data);
            } catch (error: any) {
                toast.error(error.message);
                console.log(error);
            }
        }

        getAllProducts();
    }, []);

    const cachedProducts = useMemo(() => products, [products]);
    return (
        <div id={styles.container}>
            <span id={styles.heading}>View all products</span>
            <span id={styles.text}>Here is the list of all the products available.</span>
            <div id={styles.wrapper}>
                {products && products?.map((product) => {
                    return <ProductCard
                        _id={product?._id}
                        data={product?.media.data}
                        description={product.description}
                        tags={product.tags}
                        name={product.name}
                        price={product.price}
                        type={product.media.type}
                        userId={product.userId}
                        key={product._id}
                    />
                })}
            </div>
        </div>
    )
}

export default page