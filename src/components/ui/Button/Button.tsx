import React from 'react'
import styles from './Button.module.css'

type Props = {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    theme?: "default" | "danger";
    loading?: boolean
}

const Button = ({type, text, onClick, theme, loading}: Props) => {
  return <button type={type} onClick={onClick} style={{backgroundColor: theme === "default" ? "#007bff" : "tomato"}} id={styles.button}>{text}</button>
}

export default Button;