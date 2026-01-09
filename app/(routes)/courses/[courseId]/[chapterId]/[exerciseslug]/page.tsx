"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
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
     <SplitterLayout percentage
        primaryMinSize={40}
        secondaryInitialSize={60}
     >
        <div><ContentSection courseExerciseData={courseExerciseData} loading={loading}/></div>
        <div>Code Editor</div>
      </SplitterLayout>
    </div>
  )
}

export default Playground