'use client'

import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import ROUTES from '@/constants/routes'

const SocialAuthForm = () => {
  const buttonClass = "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5 hover:shadow-md hover:scale-105 hover:transition-all after:ease-in-out after:duration-300"

  const handle_SignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      })
    } 
    catch (error) {
      console.log(error);

      toast({
        title: "Sign-in Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occured during sign-in",
        variant: "destructive",
      })
    }
  }

  return (
    <div className='mt-10 flex flex-wrap gap-6' >
      <Button className={buttonClass} onClick={() => handle_SignIn("github")}>
        <Image
            src="/icons/github.svg"
            width={22}
            height={20}
            alt="Github Logo"
            className='invert-colors mr-2.5 object-contain'
        />
        <span>Log in with Github</span>
      </Button>

      <Button className={buttonClass} onClick={() => handle_SignIn("google")}>
        <Image
            src="/icons/google.svg"
            width={20}
            height={20}
            alt="Google Logo"
            className='invert-colors mr-2.5 object-contain'
        />
        <span>Log in with Google</span>
      </Button>
      
    </div>
  )
}

export default SocialAuthForm
