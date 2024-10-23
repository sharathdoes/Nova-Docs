import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SignInPage() {
  return (
    <div>
        <main className='auth-page'> <SignIn/></main>
    </div>
  )
}

export default SignInPage