'use client'
import { Button } from '@/components/ui/button';
import { ChartNoAxesColumnIncreasingIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface UnenrolledCourse {
    id: number;
    courseId: number;
    title: string;
    desc: string;
    bannerImage: string;
    level: string;
    tags: string | null;
    editorType: string | null;
}

function ExploreMoreCourses() {
    const [courses, setCourses] = useState<UnenrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnenrolledCourses = async () => {
            try {
                const response = await fetch('/api/course?unenrolled=true');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching unenrolled courses:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUnenrolledCourses();
    }, []);

    if (loading) {
        return (
            <div className='mt-6'>
                <div className='mt-4 flex justify-between items-center'>
                    <h2 className='text-3xl font-game flex flex-col items-center mb-2'>Explore Other Courses</h2>
                    <Link href='/courses'>
                    <Button className='font-game text-lg' variant={'pixel'}>View all</Button>
                </Link>
                </div>
                <div className='flex flex-col items-center gap-3 p-4 border rounded-2xl bg-zinc-900'>
                    <p className='font-game text-xl text-gray-400'>Loading courses...</p>
                </div>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className='mt-6'>
                <div className='mt-4 flex justify-between items-center'>
                    <h2 className='text-3xl font-game flex flex-col items-center mb-2'>Explore Other Courses</h2>
                </div>
                <div className='flex flex-col items-center gap-3 p-4 border rounded-2xl bg-zinc-900'>
                    <p className='font-game text-xl text-gray-400'>You've enrolled in all available courses!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-6'>
            <div className='mt-4 flex justify-between items-center'>
                <h2 className='text-3xl font-game flex flex-col items-center mb-2'>Explore Other Courses</h2>
                <Link href='/courses'>
                    <Button className='font-game text-lg' variant={'pixel'}>View all</Button>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3'>
                {courses.map((course) => (
                    <Link href={`/courses/${course.courseId}`} key={course.courseId}>
                        <div className='border-4 rounded-2xl hover:bg-zinc-900 cursor-pointer'>
                            <Image 
                                src={course.bannerImage.trimEnd()} 
                                alt={course.title} 
                                width={400} 
                                height={400} 
                                className='w-full h-[100px] object-cover rounded-t-2xl'
                            />
                            <div className='p-4'>
                                <h2 className='font-game text-2xl'>{course.title}</h2>
                                <p className='font-game text-xl text-gray-400 line-clamp-2'>{course.desc}</p>
                                <h2 className='bg-zinc-900 px-4 gap-2 font-game p-1 mt-3 rounded-lg items-center inline-flex'>
                                    <ChartNoAxesColumnIncreasingIcon className='h-4 w-4'/>
                                    {course.level}
                                </h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ExploreMoreCourses
