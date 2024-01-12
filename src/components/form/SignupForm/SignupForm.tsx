"use client"

import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input'
import Form from '@/components/ui/Form/Form'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';

const SignupForm = () => {
    const [payload, setPayload] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const {handleSignup} = useAuth(payload);
  return (
    <Form onSubmit={handleSignup}>
        <Input type='text' onChange={(e) => {setPayload({...payload, firstName: e.target.value})}} text='Please enter your first name.' name='fistName'/>
        <Input type='text' onChange={(e) => {setPayload({...payload, lastName: e.target.value})}} text='Please enter your last name.' name='lastName'/>
        <Input type='text' onChange={(e) => {setPayload({...payload, email: e.target.value})}} text='Please enter your email.' name='email'/>
        <Input type='password' onChange={(e) => {setPayload({...payload, password: e.target.value})}} text='Please create a password.' name='password'/>
        <Button type='submit' text='Sign up' theme='default'/>
    </Form>
  )
}

export default SignupForm