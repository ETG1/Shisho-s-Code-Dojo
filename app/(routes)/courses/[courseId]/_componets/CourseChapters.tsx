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

type Props = {
  loading: boolean,
  courseDetails: Course | undefined
}

function CourseChapters({ loading, courseDetails }: Props) {
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
          <AccordionTrigger className='p-3 hover:bg-zinc-900 font-game text-3xl rounded-xl'>
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
                  <h2 className='text-2xl'>Excercise {index* chapter?.exercises?.length+indexExc + 1}</h2>
                  <h2 className='text-2xl'>{exc.name}</h2>
                  </div>
                  {/*<Link href={''}>
                    <Button variant={'pixel'}>
                      {exc?.xp} xp
                    </Button>
                  </Link>*/}
                  <Tooltip>
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
                  </Tooltip>
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