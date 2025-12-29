'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

function EnrolledCourses() {
    const [enrolledCourses,setEnrolledCourses] = useState([]);
  return (
    <div className='mt-6'>
        <h2 className='text-3xl font-game flex flex-col items-center mb-2'>Enrolled Courses</h2>
        {enrolledCourses?.length == 0 ?
        <div className='flex flex-col items-center gap-3 p-4 border rounded-2xl bg-zinc-900'>
            <Image src={'/books.png'} alt='books' width={90} height={90}/>
            <h2 className='font-game text-2xl text-gray-400'>You dont have any enrolled courses</h2>
            <Link href={'/'}>
                <Button variant={'pixel'} className='font-game text-xl'>
                    Browse Courses
                </Button>
            </Link>
        </div>
        : <div>
            List
        </div>
        }
    </div>
  )
}

export default EnrolledCourses