import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function InviteFriend() {
  return (
    <div>
     <h2 className='text-3xl font-game flex flex-col items-center mb-2 mt-6'>
          Invite a Friend
        </h2>
    <div className='flex flex-col items-center  p-4 border rounded-xl bg-zinc-900'>
        <Image src={'/mail.png'} alt='mail' width={60} height={60}/>
        <p className='font-game text-gray-400 text-xl'>Having Fun? Invite a friend !</p>
        <div className='flex flex-col gap-2 items-center'>
            <Input placeholder='Enter Invitee Email' className='text-center mt-2 min-w-sm'/>
            <Link href={'/'}>
                <Button variant={'pixel'} className='font-game text-xl'>
                    Invite
                </Button>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default InviteFriend