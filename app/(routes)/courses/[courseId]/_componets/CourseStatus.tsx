import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Course } from '../../_components/CourseList'


type Props = {
    courseDetails:Course | undefined
}

function CourseStatus({courseDetails}:Props) {

    const [counts, setCounts] = useState<{
        totalExc: number,
        totalXp: number
    }>()

    useEffect(() => {
        courseDetails && GetCounts()
    }, [courseDetails])

    const GetCounts = () => {
        let totalExercises = 0;
        let totalXp =0;
        courseDetails?.chapters?.forEach((chapter)=> {
            totalExercises = totalExercises+ chapter.exercises?.length
            chapter?.exercises?.forEach(exc => {
                totalXp = totalXp + exc?.xp;
            })
        })

        setCounts({
            totalExc: totalExercises,
            totalXp: totalXp
        })
    }

    const UpdateProgress = (currentValue: number, totalValue: number) => {
        if(currentValue && totalValue)
        {
            const percent = (currentValue*100)/totalValue;
            return percent
        }
        return 0
    }

  return (
    <div className='font-game p-4 border-4 rounded-xl w-ful'>
        <h2 className='text-3xl'>Course Progress</h2>
        <div className='flex items-center gap-5 mt-4'>
            <Image src={'/book.png'} alt='book' width={50} height={50}/>
            <div className='w-full'>
                <h2 className='flex justify-between text-2xl'>Exercises <span className='text-gray-400'>{courseDetails?.completedExercises?.length}/{counts?.totalExc}</span></h2>
                <Progress value={UpdateProgress(courseDetails?.completedExercises?.length??0, counts?.totalExc??0)} className='mt-2'/>
            </div>
        </div>
        <div className='flex items-center gap-5 mt-4'>
            <Image src={'/star.png'} alt='book' width={50} height={50}/>
            <div className='w-full'>
                {/*@ts-ignore*/}
                <h2 className='flex justify-between text-2xl'>XP Earned <span className='text-gray-400'>{courseDetails?.courseEnrolledInfo?.[0]?.xpEarned ?? 0}/{counts?.totalXp}</span></h2>
                {/*@ts-ignore*/}
                <Progress value={UpdateProgress(courseDetails?.courseEnrolledInfo?.[0]?.xpEarned ?? 0,counts?.totalXp ?? 0)} className='mt-2'/>
            </div>
        </div>
    </div>
  )
}

export default CourseStatus