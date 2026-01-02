import React from 'react'
import { Course } from '../../_components/CourseList'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  loading: boolean,
  courseDetails: Course | undefined
}

function CourseDetailsBanner({ loading, courseDetails }: Props) {
  return (
    <div>
      {!courseDetails?
      <Skeleton className='w-full h-[300px] rounded-2xl'/>
      : <div className='relative'>
        <Image src={courseDetails?.bannerImage} alt={courseDetails?.title} width={1400} height={300} className='w-full h-[350px] object-cover'/>
        <div className='font-game absolute h-full top-0 pt-28 p-10 md:px-24 lg:px-36 bg-linear-to-r from-black to-white-50/50'>
          <h2 className='text-6xl mt-3'>{courseDetails?.title}</h2>
          <p className='text-3xl text-gray-300'>{courseDetails?.desc}</p>
          <Link href={'/'}>
            <Button className='text-2xl mt-4' variant={'pixel'}>
              Enroll now 
            </Button>
          </Link>
        </div>
      </div>
      }
    </div>
  )
}

export default CourseDetailsBanner
