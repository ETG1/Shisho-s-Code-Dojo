import React, { useState, useMemo } from 'react'
import { Course } from '../../_components/CourseList'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  loading: boolean,
  courseDetails: Course | undefined
  refreshData: () => void
}

function CourseDetailsBanner({ loading, courseDetails, refreshData }: Props) {

  const [loading_, setLoading_] = useState(false);
  
  const EnrollCourse = async() => {
    setLoading_(true);
    const result = await axios.post('/api/enroll-course',{
      courseId:courseDetails?.courseId
    })
    toast.success('Course Enrolled')
    refreshData();
    setLoading_(false);
  }

  // Calculate the next exercise to continue learning
  const continueLearningPath = useMemo(() => {
    if (!courseDetails?.chapters || courseDetails.chapters.length === 0) {
      return `/courses/${courseDetails?.courseId}`;
    }

    const completedExercises = courseDetails.completedExercises || [];
    
    // If no exercises completed, go to first exercise of first chapter
    if (completedExercises.length === 0) {
      const firstChapter = courseDetails.chapters[0];
      const firstExercise = firstChapter?.exercises?.[0];
      if (firstExercise) {
        return `/courses/${courseDetails.courseId}/${firstChapter.chapterId}/${firstExercise.slug}`;
      }
      return `/courses/${courseDetails.courseId}`;
    }

    // Find the next incomplete exercise
    for (const chapter of courseDetails.chapters) {
      for (const exercise of chapter.exercises || []) {
        const exerciseIndex = chapter.exercises.findIndex(e => e.slug === exercise.slug);
        const isCompleted = completedExercises.some(
          ce => ce.chapterId === chapter.chapterId && ce.exerciseId === exerciseIndex + 1
        );
        
        if (!isCompleted) {
          return `/courses/${courseDetails.courseId}/${chapter.chapterId}/${exercise.slug}`;
        }
      }
    }

    // All exercises completed - go to course page
    return `/courses/${courseDetails.courseId}`;
  }, [courseDetails]);

  return (
    <div>
      {!courseDetails?
      <Skeleton className='w-full h-[300px] rounded-2xl'/>
      : <div className='relative'>
        <Image src={courseDetails?.bannerImage} alt={courseDetails?.title} width={1400} height={300} className='w-full h-[350px] object-cover'/>
        <div className='font-game absolute h-full top-0 pt-28 p-10 md:px-24 lg:px-36 bg-linear-to-r from-black to-white-50/50'>
          <h2 className='text-6xl mt-3'>{courseDetails?.title}</h2>
          <p className='text-3xl text-gray-300'>{courseDetails?.desc}</p>
          
            {!courseDetails?.userEnrolled? 
              <Button className='text-2xl mt-4' variant={'pixel'} disabled={loading_}
              onClick={EnrollCourse}>
                {loading_ && <Loader2Icon className='animate-spin'/>}
                Enroll now 
              </Button>
            : 
              <Link href={continueLearningPath}>
                <Button variant={'pixel'} className='text-xl mt-4'>
                  Continue Learning...
                </Button>
              </Link>
            }
        </div>
      </div>
      }
    </div>
  )
}

export default CourseDetailsBanner
