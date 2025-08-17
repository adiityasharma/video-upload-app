"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match")
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Conten-Type": "application/json" },
        body: JSON.stringify({email, password})
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "registration faild")
      }
      
      console.log(data);
      router.push("/login")

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-slate-700/30 rounded-2xl p-5 flex flex-col items-center justify-center w-[90vw] md:w-[500px] '>
      <h1 className='text-2xl font-semibold mb-2' >Register</h1>
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
          <label htmlFor="confirmPassword" className='mb-2'>Confirm Password:</label>
          <input
            name='confirmPassword'
            className='w-full px-3 py-1 text-xl outline-none border-1 border-gray-500 focus:border-white rounded-md mb-2'
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className='mt-4 bg-amber-900 text-xl py-2 rounded-xl cursor-pointer'>Register</button>
      </form>
      <div className='mt-2'>
        <p>Already have an account? <Link href={"/login"} className='text-blue-500 cursor-pointer' >Login</Link> </p>
      </div>
      </div>
    </div>
  )
}

export default RegisterPage
