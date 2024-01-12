"use client"

import Button from '@/components/ui/Button/Button';
import Form from '@/components/ui/Form/Form';
import Input from '@/components/ui/Input/Input'
import Textarea from '@/components/ui/Textarea/Textarea';
import styles from './AddProduct.module.css'
import React, { useState } from 'react'
import { BsXLg } from "react-icons/bs";
import { useProduct } from '@/hooks/useProducts';


const AddProduct = () => {
    const formdata = new FormData();
    const [tag, setTag] = useState('');
    
    const [payload, setPayload] = useState<{ file: any, name: string, price: number | null, tags: string[], description: string, userId: string | null }>({
        file: null,
        name: '',
        price: null,
        tags: [],
        description: '',
        userId: JSON.parse(localStorage?.getItem('user')!)._id || null,
    });

    formdata.append('file', payload.file);
    formdata.append('name', payload.name);
    formdata.append('price', `${payload.price}`);
    payload.tags.map((tag) => {
        formdata.append('tags', tag);
    });
    formdata.append('description', payload.description);
    formdata.append('userId', payload.userId!);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setPayload({ ...payload, file: files[0] });
        }
    };

    const {addProduct} = useProduct(formdata)
    return (
        <div id={styles.container}>
            <Form onSubmit={addProduct}>
                <Input type='file' text='Upload a media' onChange={handleFileChange} name='file' />
                <Input type='text' text='Enter the name of the product' onChange={(e) => { setPayload({ ...payload, name: e.target.value }) }} name='name' />
                <Input type='number' text='Enter the price of the product' onChange={(e) => { setPayload({ ...payload, price: parseInt(e.target.value) }) }} name='price' />
                <span id={styles.text}>Your tags will be displayed here.</span>
                <div id={styles.tagsContainer}>
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
                    <Input type='text' text='Enter a tag and press the add tag button' onChange={(e) => setTag(e.target.value)} name='tags' />
                    <Button type='button' text='Add tag' onClick={() => setPayload({ ...payload, tags: [...payload.tags, tag] })} theme='default' />
                </div>
                <Textarea onChange={(e) => setPayload({ ...payload, description: e.target.value })} text="Please enter a description" name='description' />
                <Button type='submit' text='Add prodcut' theme='default'/>
            </Form>
        </div>
    )
}

export default AddProduct