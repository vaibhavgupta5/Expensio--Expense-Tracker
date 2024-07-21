"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

function LoginPage() {
  return (
    <button onClick={() => {signIn("google")}}> ok click here </button>
  )
}

export default LoginPage