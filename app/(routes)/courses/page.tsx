import CourseList from '@/app/(routes)/courses/_components/CourseList'
import Image from 'next/image'
import React from 'react'

function Courses() {
  return (
    <div>
        <div className='relative'>
            <Image src={'/course-banner1.gif'} alt='banner' width={1200} height={300} className='w-full h-[350px] object-cover '/>
            <div className='absolute top-0 h-full pt-32 px-10 md:px-24 lg:px-36 bg-linear-to-r from-black to-white-50/50'>
                <h2 className='font-game text-6xl'>
                    Explore Courses
                </h2>
                <p className='font-game text-2xl'>
                    Explore all courses and enroll to learn and skill up!
                </p>
            </div>
        </div>
        <div className='mt-8 px-10 md:px-24 lg:px-36'>
            <h2 className='font-game text-4xl'>
                All Courses
            </h2>
            <CourseList/>
        </div>
    </div>
  )
}

export default Courses