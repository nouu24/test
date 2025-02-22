'use client';

import React from 'react'
import AuthForm from '@/components/form/AuthForm'
import { SignInSchema } from '@/lib/validations'
import { signInWithCredentials } from '@/lib/actions/auth.action';

const Sign_in = () => {
  return (
    <AuthForm
      formType="SIGN_IN" 
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  )
}

export default Sign_in
