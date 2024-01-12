import React from 'react'
import styles from './Form.module.css'

type Props = {
    children: React.ReactNode;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

const Form = ({children, onSubmit}: Props) => {
  return (
    <form onSubmit={onSubmit} id={styles.container}>
        {children}
    </form>
  )
}

export default Form