'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseDetailsBanner from './_componets/CourseDetailsBanner';
import axios from 'axios';
import { Course } from '../_components/CourseList'
import CourseChapters from './_componets/CourseChapters';
import CourseStatus from './_componets/CourseStatus';
import UpgradeToPro from '../../dashboard/_components/UpgradeToPro';
import CommunityHelpSection from './_componets/CommunityHelpSection';

type courseDetails ={

}

function CourseDetails() {
   
    const {courseId} = useParams();
    const [courseDetails,setCourseDetails] = useState<Course>();
    const [loading,setLoading] = useState(false);
    useEffect(() => {
  if (courseId) {
    GetCourseDetails();
  }
}, [courseId]);

// Add a window focus listener to refresh data when returning to the page
useEffect(() => {
  const handleFocus = () => {
    if (courseId) {
      GetCourseDetails();
    }
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, [courseId]);


    const GetCourseDetails = async() => {
      setLoading(true);
      const result = await axios.get('/api/course?courseid='+courseId)
      console.log(result.data);
      setCourseDetails(result?.data);
      setLoading(false);
    }
  return (
    <div>
        <CourseDetailsBanner loading={loading} courseDetails={courseDetails}
        refreshData={()=> GetCourseDetails()}
        />
        <div className='grid grid-cols-3 p-10 md:px-24 lg:px-36 gap-6'>
          <div className='col-span-2'>
            <CourseChapters loading={loading} courseDetails={courseDetails}/>
          </div>
          <div>
            <CourseStatus courseDetails={courseDetails}/>
            <UpgradeToPro/>
            <CommunityHelpSection/>
          </div>
        </div>
    </div>
  )
}

export default CourseDetails