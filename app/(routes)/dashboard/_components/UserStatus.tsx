'use client'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'

function UserStatus() {
  const {user} = useUser();  
  return (
    <div className='p-4 border-4 rounded-2xl mt-2'>
        <div className='flex gap-3 items-center'>
    <Image src={'/alex_walk.gif'} alt='walking_user' width={100} height={100}/>
    <h2 className='font-game text-2xl truncate min-w-0 flex-1'>{user?.primaryEmailAddress?.emailAddress}</h2>
</div>

        <div className='grid grid-cols-2 gap-6'>
            <div className='flex gap-3 items-center'>
                <Image src={'/star.png'} alt='star' width={35} height={35}/>
                <div>
                    <h2 className='text-2xl font-game'>20</h2>
                    <h2 className='font-game text-gray-500'>Total Rewards</h2>
                </div>
            </div>
             <div className='flex gap-3 items-center'>
                <Image src={'/badge.png'} alt='badge' width={40} height={40}/>
                <div>
                    <h2 className='text-2xl font-game'>78</h2>
                    <h2 className='font-game text-gray-500'>Badge</h2>
                </div>
            </div>
             <div className='flex gap-3 items-center'>
                <Image src={'/fire.png'} alt='Daily Streak' width={40} height={40}/>
                <div>
                    <h2 className='text-2xl font-game'>29</h2>
                    <h2 className='font-game text-gray-500'>Daily streak</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserStatus