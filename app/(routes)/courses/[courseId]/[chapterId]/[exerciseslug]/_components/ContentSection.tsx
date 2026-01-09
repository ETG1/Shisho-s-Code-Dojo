import React from 'react'
import { CourseExercise } from '../page'
import { Skeleton } from '@/components/ui/skeleton'
import { Lightbulb, Shovel } from 'lucide-react'

type Props = {
    courseExerciseData:CourseExercise | undefined,
    loading: boolean
}

function ContentSection({courseExerciseData, loading}: Props) {

    const ContentInfo = courseExerciseData?.exerciseData;

  return (
    <div className='p-10'>
        {loading || !ContentInfo?
        <Skeleton className='h-full w-full m-10 rounded-2xl'/>
        : 
        <div>
            <h2 className='font-game text-3xl my-3'>{courseExerciseData?.name}</h2>
        <div dangerouslySetInnerHTML={{__html: ContentInfo?.exercisesContent?.content}} />
        <div>
            <h2 className='font-game text-3xl mt-4 flex gap-2 items-center'><Shovel/> Task</h2>
            <div className='p-4 border rounded-2xl bg-zinc-800' dangerouslySetInnerHTML={{__html: ContentInfo?.exercisesContent?.task}} />

            <h2 className='font-game flex gap-2 items-center text-3xl mt-4'><Lightbulb/> Hint</h2>
            <div className='p-4 border rounded-2xl bg-zinc-800' dangerouslySetInnerHTML={{__html: ContentInfo?.exercisesContent?.hint}} />
        </div>
        </div>
    }
    </div>
  )
}

export default ContentSection