"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { exercise } from '../../../_components/CourseList';
import ContentSection from './_components/ContentSection';

export type CourseExercise = {
  chapterId: number,
  courseId: number,
  desc: string,
  name: string,
  exercises: exercise[],
  exerciseData: ExerciseData
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
  

  return (
    <div className='border-t-4 mt-22'>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={40} minSize={20}>
          <ContentSection courseExerciseData={courseExerciseData} loading={loading} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={20}>
          <div>Code Editor</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Playground