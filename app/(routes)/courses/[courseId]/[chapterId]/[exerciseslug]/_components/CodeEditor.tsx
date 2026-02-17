import React from 'react'
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { CourseExercise } from '../page';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useParams } from 'next/navigation';
import { ExerciseTable } from '@/config/schema';
import axios from 'axios';
import { toast } from 'sonner';

type Props = {
    courseExerciseData:CourseExercise | undefined,
    loading: boolean,
    refetchData?: () => void
}



const CodeEditorChildren = ({onCompleteExercise, IsCompleted}: any)=>{
 
  const { sandpack } = useSandpack();
  return(
    <div className='font-game absolute flex gap-4 bottom-20 px-13 '>
      <Button variant={'pixel'} className='text-xl' onClick={()=>sandpack.runSandpack()}>Run Code</Button>
      <Button variant={'pixel'} className='bg-[#a3e534] text-xl' onClick={()=>onCompleteExercise()} disabled={IsCompleted} >{IsCompleted ? 'Already Completed': 'Mark As Completed'}</Button>
    </div>
  )
}

function CodeEditor({courseExerciseData, loading, refetchData}:Props) {

  const {exerciseslug} = useParams();
  const exerciseIndex = courseExerciseData?.exercises?.findIndex(item=>item.slug==exerciseslug)

  const IsCompleted = courseExerciseData?.completedExercise?.find(item => item?.exerciseId==Number(exerciseIndex)+1);

   const onCompleteExercise = async()=> {
    
    if (exerciseIndex==undefined)
    {
      return;
    }
    const results = await axios.post('/api/exercise/complete',{
      courseId: courseExerciseData?.courseId,
      chapterId: courseExerciseData?.chapterId,
      exerciseId: exerciseIndex + 1,
      xpEarned: courseExerciseData?.exercises[exerciseIndex].xp
    })
    console.log(results)
    toast.success('Exercise Completed')
    refetchData?.();
  }

  return (
    <div>
      <SandpackProvider
        //@ts-ignore
        template={courseExerciseData?.editorType??'static'}
        theme={'dark'}   
        style={{height: '100vh'}}
        files={courseExerciseData?.exerciseData?.exercisesContent?.starterCode}
        options={{autorun: false, autoReload: false}}
      >
        {/* <SandpackFileExplorer className='flex flex-row items-center justify-between' /> */}
        <ResizablePanelGroup direction="horizontal" style={{height: '100%'}}>
          <ResizablePanel defaultSize={50}>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
              <SandpackCodeEditor
              showRunButton={false}
              showTabs
              style={{flex: 1}}/>
              <CodeEditorChildren
                onCompleteExercise={onCompleteExercise}
                IsCompleted={IsCompleted}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <SandpackPreview 
            showNavigator
            showOpenInCodeSandbox={false}  
            showOpenNewtab          
            style={{height: '100%'}}/>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SandpackProvider>
    </div>
  )
}

export default CodeEditor
