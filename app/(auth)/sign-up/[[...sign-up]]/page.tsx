import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpPage() {
  return (
    <div>
        <main className='auth-page'> <SignUp/></main>
    </div>
  )
}

export default SignUpPage