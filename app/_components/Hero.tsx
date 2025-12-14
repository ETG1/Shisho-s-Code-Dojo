import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Hero() {
  return (
    <div className='w-full relative h-screen overflow-hidden'>
      <Image src={'/hero.gif'} alt='hero' width={1000} height={1000} className='w-full h-full object-cover absolute inset-0' 
      />
      <div className='absolute w-full flex flex-col items-center mt-48'>
        <h2 className=' text-7xl font-game text-center'>Start Your</h2>
        <h2 className='font-bold text-8xl font-game text-center text-gray-400  rounded-lg '
        style={{
          textShadow:"2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,-2px 2px 0 #000"
        }}
        >Coding Journey </h2>
        <p className='mt-5 font-game text-3xl'>
          Begginer friendly coding courses and projects
        </p>
        <Link href={'/sign-up'}>
        <Button className='mt-2 font-game text-2xl' variant={'pixel'}>GET STARTED</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero