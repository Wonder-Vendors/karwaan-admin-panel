"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import ProductCard from '@/components/card/ProductCard/ProductCard'
import { useAxios } from '@/hooks/useAxios';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
// import { locallyStoredVariables } from '@/constants/locallyStoredVariables';
// import { useRouter } from 'next/router';

const page = () => {
    // const router = useRouter();

    // const { user } = locallyStoredVariables();
    // if (typeof(window) !== "undefined") {
    //     if(!user){
    //         router.push('/signin');
    //     }
    // }
type productType={
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
}[]
    const [products, setProducts] = useState<productType|null>(null);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const { getCall } = useAxios('/product');
                const response = await getCall();
                setProducts(response.data);
            } catch (error: any) {
                toast.error(error.message);
            }
        }

        getAllProducts();
    }, []);

    return (
        <div id={styles.container}>
            <span id={styles.heading}>View all products</span>
            <span id={styles.text}>Here is the list of all the products available.</span>
            <div id={styles.wrapper}>
                {products ? products.length ? products.map((product) => {
                    return <ProductCard
                        _id={product?._id!}
                        data={product?.media.data!}
                        description={product.description!}
                        tags={product.tags!}
                        name={product.name!}
                        price={product.price!}
                        type={product.media.type!}
                        userId={product.userId!}
                        key={product._id!}
                    />
                }) :
                    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                    no item in cart
                    </div>
                    :
                    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                        <ClipLoader color="blue" size={60} speedMultiplier={0.5} />
                        <div>loading</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default page