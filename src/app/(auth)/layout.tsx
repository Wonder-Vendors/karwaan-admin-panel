"use client"

import { locallyStoredVariables } from '@/constants/locallyStoredVariables'
import { useRouter } from 'next/navigation';
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  const router = useRouter();
  const {user, token} = locallyStoredVariables();
  if(user && token) {
    router.push('/');
    return;
  }
  return (
    <div>{children}</div>
  )
}

export default layout