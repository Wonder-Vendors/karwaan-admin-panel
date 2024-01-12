"use client";

import styles from './Textarea.module.css'
import React from 'react'

type Props = {
    onChange:React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    text: string;
    name: string;
}

const Textarea = ({name, onChange, text}: Props) => {
  return (
    <label htmlFor={name} id={styles.container}>
        <span id={styles.text}>{text}</span>
        <textarea name={name} id={styles.textarea} onChange={onChange}/>
    </label>
  )
}

export default Textarea