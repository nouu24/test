'use client';

import React from 'react'
import AuthForm from '@/components/form/AuthForm'
import { SignUpSchema } from '@/lib/validations'
import { signUpWithCredentials } from '@/lib/actions/auth.action';

const Sign_up = () => {
  return (
    <AuthForm
      formType="SIGN_UP" 
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={signUpWithCredentials}
    />
  )
}

export default Sign_up
