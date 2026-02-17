'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface EnrolledCourse {
    courseId: number;
    title: string;
    bannerImage: string;
    totalExercises: number;
    completedExercises: number;
    xpEarned: number;
    level: string;
}

function EnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await fetch('/api/course?enrolled=true');
                const data = await response.json();
                setEnrolledCourses(data);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEnrolledCourses();
    }, []);

    if (loading) {
        return (
            <div className='mt-6'>
                <h2 className='text-3xl font-game flex flex-col items-center mb-2'>Enrolled Courses</h2>
                <div className='flex flex-col items-center gap-3 p-4 border rounded-2xl bg-zinc-900'>
                    <p className='font-game text-xl text-gray-400'>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-6'>
            <h2 className='text-3xl font-game flex flex-col items-center mb-2'>Enrolled Courses</h2>
            {enrolledCourses?.length === 0 ?
                <div className='flex flex-col items-center gap-3 p-4 border rounded-2xl bg-zinc-900'>
                    <Image src={'/books.png'} alt='books' width={90} height={90}/>
                    <h2 className='font-game text-2xl text-gray-400'>You dont have any enrolled courses</h2>
                    <Link href={'/courses'}>
                        <Button variant={'pixel'} className='font-game text-xl'>
                            Browse Courses
                        </Button>
                    </Link>
                </div>
                : 
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {enrolledCourses.map((course) => (
                        <Link key={course.courseId} href={`/courses/${course.courseId}`}>
                            <div className='border-4 rounded-2xl  overflow-hidden hover:bg-zinc-900 transition-colors cursor-pointer'>
                                <Image 
                                    src={course.bannerImage} 
                                    alt={course.title} 
                                    width={500} 
                                    height={500}
                                    className='w-full h-[150px] object-cover'
                                />
                                <div className='p-4'>
                                    <h3 className='font-game text-xl mb-2'>{course.title}</h3>
                                    <div className='flex justify-between text-sm text-gray-400 mb-2'>
                                        <span>Level: {course.level}</span>
                                        <span>XP: {course.xpEarned}</span>
                                    </div>
                                    <div className='w-full bg-zinc-700 rounded-full h-2 mb-2'>
                                        <div 
                                            className='bg-primary h-2 rounded-full' 
                                            style={{ 
                                                width: `${course.totalExercises > 0 
                                                    ? (course.completedExercises / course.totalExercises) * 100 
                                                    : 0}%` 
                                            }}
                                        ></div>
                                    </div>
                                    <p className='text-sm text-gray-400'>
                                        {course.completedExercises}/{course.totalExercises} completed
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}

export default EnrolledCourses