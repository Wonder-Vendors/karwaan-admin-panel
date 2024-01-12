"use client"

import Button from '@/components/ui/Button/Button';
import Form from '@/components/ui/Form/Form'
import Input from '@/components/ui/Input/Input';
import React, { useState } from 'react'

export const ForgotPassword = () => {
    const handleSubmit = () => {};
    const [email, setEmail] = useState('');
  return (
    <Form onSubmit={handleSubmit}>
        <Input type='email' text='Please enter your registered email.' onChange={(e) => {setEmail(e.target.value)}} name='email'/>
        <Button text='Send email' type='submit' theme='default'/>
    </Form>
  )
}
