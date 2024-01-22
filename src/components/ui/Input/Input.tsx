import React, { useState, ChangeEvent, useRef } from 'react';
import styles from './Input.module.css';
import Button from '../Button/Button';

type Props = {
    type: string;
    text?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    value?: any;
    placeholder?:string
};

const Input = ({ type, text, onChange, name, value, placeholder }: Props) => {
    const [toggle, setToggle] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (type === 'text' || type === 'number' || type === 'email') {
        return (
            <label htmlFor={name} id={styles.container}>
                <span id={styles.text}>{text}</span>
                <input type={type} name={name} id={styles.input} onChange={onChange} value={value} placeholder={placeholder}/>
            </label>
        );
    }

    if (type === 'password') {
        return (
            <label htmlFor={name} id={styles.container}>
                <span id={styles.text}>{text}</span>
                <input type={toggle ? 'text' : 'password'} name={name} id={styles.input} onChange={onChange} value={value}/>
                <label htmlFor="checkbox" id={styles.wrapper}>
                    <span>Show password</span>
                    <input type="checkbox" onChange={() => setToggle(!toggle)} />
                </label>
            </label>
        );
    }

    if (type === 'file') {

        const [fileName, setFileName] = useState<string | null>(null);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleButtonClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        };

        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setFileName(e.target.files[0].name);
            } else {
                setFileName(null);
            }

            onChange(e);
        };


        return (
            <label htmlFor={styles.input} id={styles.container}>
                <span id={styles.text}>{text}</span>
                <input
                    type={type}
                    name={name}
                    id={styles.input}
                    onChange={handleFileChange}
                    hidden
                    ref={fileInputRef}
                    value={value}
                />
                {type === 'file' && fileName && <span>Uploaded file: {fileName}</span>}
                <Button text="Upload a file" type="button" onClick={handleButtonClick} theme='default' />

            </label>
        );
    }

    return null; // Return null if the type is not recognized
};

export default Input;
