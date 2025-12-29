import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UpgradeToPro() {
  return (
    <div className='mt-4 flex flex-col items-center p-5 border-4 rounded-2xl'>
        <Image src={'/logo.png'} alt='logo' width={60} height={60}/>
        <h2 className='text-3xl font-game'>
            Upgrade To Pro
        </h2>
        <p className='font-game text-gray-400 text-md text-center'>
            Join Pro Membership and Get Access To All Courses
        </p>
        <Link href={'/pricing'}>
            <Button variant={'pixel'} className='font-game text-xl'>
                Upgrade
            </Button>
        </Link>
    </div>
  )
}

export default UpgradeToPro