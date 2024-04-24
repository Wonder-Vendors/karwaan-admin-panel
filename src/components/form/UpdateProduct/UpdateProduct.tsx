"use client"
import Button from '@/components/ui/Button/Button';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input/Input'
import Textarea from '@/components/ui/Textarea/Textarea';
import styles from '../AddProduct/AddProduct.module.css'
import React, { useEffect, useState, FC } from 'react'
import { BsXLg } from "react-icons/bs";
import { useProduct } from '@/hooks/useProducts';
import { locallyStoredVariables } from '@/constants/locallyStoredVariables';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ProductIdProps {
    productId: string | string[];
}

const UpdateProduct: FC<ProductIdProps> = ({ productId }) => {
    const formdata = new FormData();
    const [tag, setTag] = useState('');
    

    const { user } = locallyStoredVariables(); 
    type payloadType = {
        file: any,
        name: string,
        price: any,
        tags: string[],
        description: string,
        userId: string | null
    }
    const [payload, setPayload] = useState<payloadType>({
        file: null,
        name: "",
        price: "",
        tags: [],
        description: "",
        userId: user?._id || null,
    });

    const { handleGetProduct } = useProduct({ payload: {...payload}, productId: productId as string })
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFromDb, setImageFromDb] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const data = await handleGetProduct();
            setPayload({
                file: data?.file || null,
                name: data?.name || "",
                price: data?.price || "",
                tags: data?.tags || [],
                description: data?.description || "",
                userId: user?._id || null,
            }
            )
            setImageFromDb(data?.url|| null);

        })();
    }, [productId])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0){
            setPayload({...payload, file: files[0]});
        }
    };


    useEffect(() => {
        if (payload.file) {
            const imageUrl = URL.createObjectURL(payload.file);
            setImageUrl(imageUrl);
        }
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [payload.file]);

    formdata.append('file', payload.file);
    formdata.append('name', payload.name);
    formdata.append('price', `${payload.price}`);
    payload?.tags?.map((tag) => {
        formdata.append('tags', tag);
    });
    formdata.append('description', payload.description);
    formdata.append('userId', payload.userId!);

    const  {updateProduct} = useProduct({
        formdata: formdata,
        payload: undefined,
        productId: productId
    })
    return (
        <div id={styles.container}>
            {payload &&
                <Form onSubmit={updateProduct}>
                    {imageUrl ? <Image src={imageUrl} alt="Error loading image" height={0} width={0} style={{ width: '100%', height: '500px', objectFit: 'contain' }} /> : null}
                    {(!imageUrl &&imageFromDb) ? <img src={imageFromDb} alt="Error loading image" height={0} width={0} style={{ width: '100%', height: '500px', objectFit: 'contain' }} /> : null}
                    <Input type='file' text='Upload a media' onChange={handleFileChange} name='file' />
                    <Input type='text' text='Update the name of the product' onChange={(e) => { setPayload({ ...payload, name: e.target.value }) }} name='name' value={payload.name} />
                    <Input type='number' text='Update the price of the product' onChange={(e) => { setPayload({ ...payload, price: parseInt(e.target.value) }) }} name='price' value={payload.price} />
                    <span id={styles.text} style={{ display: payload?.tags?.length === 0 ? 'none' : 'block' }}>Your tags will be displayed here.</span>
                    <div id={styles.tagsContainer} style={{ display: payload?.tags?.length === 0 ? 'none' : 'flex' }}>
                        {payload?.tags?.map((tag, index) => {
                            return (
                                <div key={index} id={styles.tag}>
                                    <span key={index} id={styles.tagText}>{tag}</span>
                                    <BsXLg id={styles.icon} onClick={() => {
                                        const updatedTags = [...payload?.tags];
                                        updatedTags.splice(index, 1);
                                        setPayload({ ...payload, tags: updatedTags })
                                    }} />
                                </div>
                            )
                        })}
                    </div>
                    <div id={styles.tagsInput}>
                        <Input type='text' text='Enter a tag and press the add tag button' onChange={(e) => setTag(e.target.value)} name='tags' value={tag} />
                        <Button type='button' text='Add tag' onClick={() => {
                            if (tag === '') {
                                return toast.error(`Cannot add an empty tag`);
                            }

                            if (payload.tags.includes(tag)) {
                                return toast.error(`You have already added ${tag} as a tag`);
                            }

                            setPayload({ ...payload, tags: [...payload.tags, tag] })
                            setTag('');
                        }} theme='default' />
                    </div>
                    <Textarea onChange={(e) => setPayload({ ...payload, description: e.target.value })} text="Please enter a description" name='description' value={payload.description} />
                    <Button type='submit' text='Update product' theme='default' />
                </Form>}
        </div>
    )
}

export default UpdateProduct