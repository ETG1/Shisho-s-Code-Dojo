import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function CommunityHelpSection() {
  return (
    <div className='mt-4 flex flex-col items-center p-5 border-4 rounded-2xl font-game'>
        <h2 className='text-3xl'>Need Help?</h2>
        <p className='text-md text-gray-400'>Ask questions in our community.</p>
        <Link href={''}>
            <Button variant={'pixel'} className='text-xl'> 
                Go To Community
            </Button>
        </Link>
    </div>
  )
}

export default CommunityHelpSection