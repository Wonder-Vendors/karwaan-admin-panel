"use client"

import Button from '@/components/ui/Button/Button';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input/Input'
import Textarea from '@/components/ui/Textarea/Textarea';
import styles from './AddProduct.module.css'
import React, { useEffect, useState } from 'react'
import { BsXLg } from "react-icons/bs";
import { useProduct } from '@/hooks/useProducts';
import { locallyStoredVariables } from '@/constants/locallyStoredVariables';
import Image from 'next/image';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';


const AddProduct = () => {
    const router = useRouter()
    const formdata = new FormData();
    const [tag, setTag] = useState('');
    // async function handleImageUpload(f:File) {

    //     const imageFile = f;
    //     // console.log('originalFile instanceof Blob', imageFile instanceof Blob ); // true
    //     // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
    //     const options = {
    //       maxSizeMB: 1,
    //       maxWidthOrHeight: 1920,
    //       useWebWorker: true,
    //     }
    //     try {
    //       const compressedFile = await imageCompression(imageFile, options);
    //       return compressedFile
      
    //     } catch (error) {
    //       toast.error("Upload Processing Failed Please try again")
    //       return null
    //     }
      
    //   }

    const {user} = locallyStoredVariables();
    if(typeof(window) !== "undefined"){
        var userID=user._id;
    }
    var [payload, setPayload] = useState<{ file: any, name: string, price: number | null, tags: string[], description: string, userId: string | null }>({
        file: null,
        name: '',
        price: null,
        tags: [],
        description: '',
        userId: userID || null,
    });

    formdata.append('name', payload.name);
    formdata.append('price', `${payload.price}`);
    payload.tags.map((tag) => {
        formdata.append('tags', tag);
    });
    formdata.append('description', payload.description);
    formdata.append('userId', payload.userId!);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0){
            // const result = await handleImageUpload(files[0])
            setPayload({...payload, file: files[0]});
        }
    };
    
    formdata.append('file', payload.file);

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // console.log("@@kk",payload.file)
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

    const {addProduct} = useProduct({
        formdata: formdata,
        payload: undefined,
        productId: undefined
    });
   
    return (
        <div id={styles.container}>
            <Form onSubmit={addProduct}>
                {imageUrl ? <Image src={imageUrl} alt="Error loading image" height={0} width={0} style={{ width: '100%', height: '500px', objectFit: 'contain'}}/> : null}
                <Input type='file' text='Upload a media' onChange={handleFileChange} name='file' />
                <Input type='text' text='Enter the name of the product' onChange={(e) => { setPayload({ ...payload, name: e.target.value }) }} name='name' />
                <Input type='number' text='Enter the price of the product' onChange={(e) => { setPayload({ ...payload, price: parseInt(e.target.value) }) }} name='price' />
                <span id={styles.text} style={{display: payload.tags.length === 0 ? 'none' : 'block'}}>Your tags will be displayed here.</span>
                <div id={styles.tagsContainer} style={{display: payload.tags.length === 0 ? 'none' : 'flex'}}>
                    {payload.tags.map((tag, index) => {
                        return (
                            <div id={styles.tag}>
                                <span key={index} id={styles.tagText}>{tag}</span>
                                <BsXLg id={styles.icon} onClick={() => {
                                    const updatedTags = [...payload.tags];
                                    updatedTags.splice(index, 1);
                                    setPayload({ ...payload, tags: updatedTags })}}/>
                            </div>
                        )
                    })}
                </div>
                <div id={styles.tagsInput}>
                    <Input type='text' text='Enter a tag and press the add tag button' onChange={(e) => setTag(e.target.value)} name='tags' value={tag} />
                    <Button type='button' text='Add tag' onClick={() => {
                        if(tag === ''){
                            return toast.error(`Cannot add an empty tag`);
                        }

                        if(payload.tags.includes(tag)){
                            return toast.error(`You have already added ${tag} as a tag`);
                        }

                        setPayload({ ...payload, tags: [...payload.tags, tag] })
                        setTag('');
                        }} theme='default' />
                </div>
                <Textarea onChange={(e) => setPayload({ ...payload, description: e.target.value })} text="Please enter a description" name='description' />
                <Button type='submit' text='Add product' theme='default'/>
            </Form>
        </div>
    )
}

export default AddProduct