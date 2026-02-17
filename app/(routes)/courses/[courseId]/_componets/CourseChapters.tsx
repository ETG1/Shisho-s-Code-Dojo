import React from 'react'
import { Course } from '../../_components/CourseList'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Item } from '@radix-ui/react-navigation-menu'

type Props = {
  loading: boolean,
  courseDetails: Course | undefined
}

function CourseChapters({ loading, courseDetails }: Props) {

  const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number,
    chapterExercisesLength: number
  ) => {
    // CHECK ENROLLMENT FIRST - If not enrolled, disable ALL exercises
    if (!courseDetails?.userEnrolled) {
      return false;
    }

    const completed = courseDetails?.completedExercises;

    // If nothing is completed, enable FIRST exercise ONLY
    if (!completed || completed.length === 0) {
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    // Filter completed for this chapter
    const chapterCompleted = completed.filter(c => c.chapterId === chapterIndex + 1);

    if (chapterCompleted.length === 0) {
      // If no completed in this chapter, enable first if it's the first chapter
      return chapterIndex === 0 && exerciseIndex === 0;
    }

    // Last completed in this chapter (highest exerciseId)
    const last = chapterCompleted[0];

    // Enable the next exercise
    return exerciseIndex + 1 === last.exerciseId + 1;
  };

  const isExerciseCompleted = (chapterId: number, exerciseId: number) => {
    const completeChapters = courseDetails?.completedExercises;
    console.log('Checking:', chapterId, exerciseId, completeChapters);
    const completeChapter = completeChapters?.find(Item => Item.chapterId == chapterId && Item.exerciseId == exerciseId);
    console.log('Result:', completeChapter);
    return completeChapter ? true : false;
  };

  return (
    <div>
      {courseDetails?.chapters?.length === 0 ? (
        <div>
          <Skeleton className='w-full h-[100px] rounded-2xl'/>
          <Skeleton className='w-full mt-5 h-[100px] rounded-2xl'/>
        </div>
      ) : (
        <div className='p-5 border-4 rounded-2xl'>
          {courseDetails?.chapters?.map((chapter, index)=> (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1">
                <AccordionTrigger className='p-3 hover:bg-zinc-900 hover:no-underline font-game text-3xl rounded-xl'>
                  <div>
                    <h2 className='h-10 w-10 bg-zinc-800 flex items-center justify-center rounded-xl'>
                      {index+1}
                    </h2>
                  </div>
                  {chapter?.name}</AccordionTrigger>
                <AccordionContent>
                  <div className='p-4 bg-zinc-900 rounded-xl mt-2'>
                    {chapter?.exercises.map((exc, indexExc) => (
                      <div key={indexExc} className='flex items-center justify-between mt-4 '>
                        <div className='flex items-center gap-10 font-game'>
                          <h2 className='text-2xl'>Exercise {index* chapter?.exercises?.length+indexExc + 1}</h2>
                          <h2 className='text-2xl'>{exc.name}</h2>
                        </div>

                        {isExerciseCompleted(chapter?.chapterId, indexExc + 1) ?
                          <Button variant={'pixel'} className='bg-green-600'>
                            Completed
                          </Button>
                        : EnableExercise(index, indexExc, chapter?.exercises?.length) ?
                          <Link href={'/courses/'+courseDetails?.courseId+'/' + chapter?.chapterId + '/' +exc?.slug}>
                            <Button variant={'pixel'}>
                              {exc?.xp} xp
                            </Button>
                          </Link>
                        : courseDetails?.userEnrolled ?
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={''}>
                                <Button variant={'pixelDisabled'}>
                                  ???
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent className='font-game text-lg'>
                              <p>Complete previous exercises first</p>
                            </TooltipContent>
                          </Tooltip>
                        : <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={''}>
                                <Button variant={'pixelDisabled'}>
                                  ???
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent className='font-game text-lg'>
                              <p>Please Enroll First</p>
                            </TooltipContent>
                          </Tooltip>}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseChapters