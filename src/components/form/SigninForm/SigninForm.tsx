"use client"

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input'
import Form from '@/components/ui/Form/Form'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';

const SigninForm = () => {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
    });

    const {handleSignin} = useAuth(payload);
  return (
    <Form onSubmit={handleSignin}>
        <Input type='text' onChange={(e) => {setPayload({...payload, email: e.target.value})}} text='Please enter your email.' name='email'/>
        <Input type='password' onChange={(e) => {setPayload({...payload, password: e.target.value})}} text='Please create a password.' name='password'/>
        <Button type='submit' text='Sign in' theme='default'/>
    </Form>
  )
}

export default SigninForm;