"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user}=useUser();
  return (
    <div className='flex gap-3 items-center'>
        <Image src={'/machine.webp'} alt='robo' width={120} height={120}/>
        <h2 className='font-game text-2xl p-2 border bg-zinc-900 rounded-lg rounded-bl-none'>Welcome Back <span className='text-gray-400'>{user?.fullName},</span> Start learning something new...</h2>
    </div>
  )
}

export default WelcomeBanner