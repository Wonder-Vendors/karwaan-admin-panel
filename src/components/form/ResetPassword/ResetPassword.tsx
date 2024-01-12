"use client"

import Button from '@/components/ui/Button/Button'
import Form from '@/components/ui/Form/Form'
import Input from '@/components/ui/Input/Input'
import React, { useState } from 'react'

const ResetPassword = () => {
    const handleSubmit = () => {}
    const [payload, setPayload] = useState({
        newPassword: '',
        confirmNewPassword: ''
    })
  return (
    <Form onSubmit={handleSubmit}>
        <Input type='password' text='Please create a new password' onChange={(e) => setPayload({...payload, newPassword: e.target.value})} name='newPassword'/>
        <Input type='password' text='Please confirm your new password' onChange={(e) => setPayload({...payload, confirmNewPassword: e.target.value})} name='confirmNewPassword'/>
        <Button type='submit' text='Save new password' theme='default'/>
    </Form>
  )
}

export default ResetPassword