"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { completedExercises, exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';
import CodeEditor from './_components/CodeEditor';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export type CourseExercise = {
  chapterId: number,
  courseId: number,
  desc: string,
  name: string,
  editorType?: string,
  exercises: exercise[],
  exerciseData: ExerciseData,
  completedExercise: completedExercises[]
}

type ExerciseData = {
  chapterId: number,
  courseId: number,
  exerciseId: string,
  exerciseName: string,
  exercisesContent: ExercisesContent
}

type ExercisesContent= {
  content: string,
  hint: string,
  hintXp: string,
  starterCode: any,
  task: string
}

function Playground() {

  const { courseId, chapterId, exerciseslug } = useParams();
  const [loading,setLoading] = useState(false)

  const [courseExerciseData, setCourseExerciseData] = useState<CourseExercise>();
  const [exerciseInfo, setExerciseInfo] = useState<exercise>();
  const [nextButtonRoute, setNextButtonRoute] = useState<string>();
  const [prevButtonRoute, setPrevButtonRoute] = useState<string>();


  useEffect(() =>{
    GetExerciseCourseDetails()
  }, [])

  const GetExerciseCourseDetails = async () => {
    setLoading(true)
    const result = await axios.post('/api/exercise',{
      courseId: courseId,
      chapterId: chapterId,
      exerciseId: exerciseslug
    })

    console.log(result.data)
    setCourseExerciseData(result.data);
    setLoading(false);

  }
  
  useEffect(()=> {

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    }
  },[])

 useEffect(()=> {
 if (courseExerciseData) {
   GetExerciseDetail();
   GetPrevNextButtonRoute();
 }
}, [courseExerciseData])


  const GetExerciseDetail = ()=> {
    const exerciseInfo = courseExerciseData?.exercises?.find((item)=>item.slug==exerciseslug);
    setExerciseInfo(exerciseInfo);
  }

  const GetPrevNextButtonRoute = () => {
    //current Index of Exercise
  const CurrentExerciseIndex = courseExerciseData?.exercises?.findIndex(item=>item.slug==exerciseslug)??0;
  const currentExerciseId = CurrentExerciseIndex + 1;
  const isCurrentCompleted = courseExerciseData?.completedExercise?.find(c => c.exerciseId == currentExerciseId);

  const NextExercise = courseExerciseData?.exercises[CurrentExerciseIndex+1]?.slug;
  const PrevExercise = courseExerciseData?.exercises[CurrentExerciseIndex-1]?.slug;

  setNextButtonRoute((isCurrentCompleted && NextExercise) ? '/courses/' + courseId + "/" + chapterId + '/' + NextExercise : undefined);
  setPrevButtonRoute(PrevExercise ? '/courses/' + courseId + "/" + chapterId + '/' + PrevExercise : undefined);
  }

  return (
    <div className='border-t-4 mt-22' style={{ height: 'calc(100vh - 5.5rem)' }}>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={40} minSize={20}>
          <ContentSection courseExerciseData={courseExerciseData} loading={loading} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={20}>
          <div><CodeEditor courseExerciseData={courseExerciseData} loading={loading} refetchData={GetExerciseCourseDetails}/></div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className='font-game p-2 px-6 fixed w-full bottom-0 flex item-center justify-between backdrop-blur-sm bg-black/80'>
      <Link href={prevButtonRoute ?? '/courses/' + courseId}>
        <Button variant={'pixel'} className='text-xl'>Previous</Button>
      </Link>
        <div className='flex gap-3 items-center'>
          <Image src={'/star.png'} alt='star' width={35} height={35}/>
          <h2 className='text-xl'>You Can Earn <span className='text-yellow-400 text-3xl'> {exerciseInfo?.xp} </span> Xp</h2>
        </div>
        <Link href={nextButtonRoute ?? '/courses/' + courseId}>
        <Button variant={'pixel'} className='text-xl'>Next</Button>
        </Link>
      </div>
    </div>
  )
}

export default Playground