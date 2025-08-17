"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/")
    }

  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-slate-700/30 rounded-2xl p-5 flex flex-col items-center justify-center w-[90vw] md:w-[500px] '>
      <h1 className='text-2xl font-semibold mb-2' >Login</h1>
        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col mt-5' >
          <label htmlFor="email" className='mb-2'>Email:</label>
          <input
            name='email'
            className='w-full px-3 py-1 text-xl outline-none border-1 border-gray-500 focus:border-white rounded-md mb-2'
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className='mb-2'>Password:</label>
          <input
            name='password'
            className='w-full px-3 py-1 text-xl outline-none border-1 border-gray-500 focus:border-white rounded-md mb-2'
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button type="submit" className='mt-4 bg-blue-800 text-xl py-2 rounded-xl cursor-pointer'>Login</button>
      </form>
      <div className='mt-2'>
        Don't have an account? <Link href={"/register"} className='text-blue-500 cursor-pointer' >Create a new Account</Link> 
      </div>
      </div>
    </div>
  )
}

export default LoginPage
