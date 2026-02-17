'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { useParams, usePathname } from 'next/navigation'
import axios from 'axios'
import { Course } from '../(routes)/courses/_components/CourseList'

// const courses = [
//   {
//     id: 1,
//     name: 'HTML',
//     desc: 'Learn the fundamentals of HTML and build the structure of modern web pages.',
//     path: '/course/1/detail'
//   },
//   {
//     id: 2,
//     name: 'CSS',
//     desc: 'Master CSS to style and design responsive, visually appealing web layouts.',
//     path: '/course/2/detail'
//   },
//   {
//     id: 3,
//     name: 'React',
//     desc: 'Build dynamic and interactive web applications using the React JavaScript library.',
//     path: '/course/3/detail'
//   },
//   {
//     id: 4,
//     name: 'React Advanced',
//     desc: 'Deep dive into advanced React concepts including hooks, state management, performance optimization, and architectural patterns.',
//     path: '/course/4/detail'
//   },
//   {
//     id: 5,
//     name: 'Python',
//     desc: 'Learn Python programming from basics to intermediate level, covering logic building, functions, and real-world applications.',
//     path: '/course/5/detail'
//   },
//   {
//     id: 6,
//     name: 'Python Advanced',
//     desc: 'Master advanced Python concepts such as OOP, modules, APIs, data processing, and automation.',
//     path: '/course/6/detail'
//   },
//   {
//     id: 7,
//     name: 'Generative AI',
//     desc: 'Explore prompt engineering, LLMs, embeddings, image generation, and build GenAI-powered applications.',
//     path: '/course/7/detail'
//   },
//   {
//     id: 8,
//     name: 'Machine Learning',
//     desc: 'Understand ML concepts, algorithms, data preprocessing, model training, evaluation, and deployment.',
//     path: '/course/8/detail'
//   },
//   {
//     id: 9,
//     name: 'JavaScript',
//     desc: 'Learn core JavaScript concepts, asynchronous programming, DOM manipulation, and modern ES6+ features.',
//     path: '/course/9/detail'
//   }
// ];

function Header() {
  const { user } = useUser();
  const path = usePathname();
  const { exerciseslug } = useParams();
  const [courses,setCourses] = useState<Course[]>();

  useEffect(()=> {
    GetCourses();
  }, [])

  const GetCourses = async () => {
    const result = await axios.get('/api/course');
    console.log(result.data);
    setCourses(result.data)
  }

  return (
    <div className='p-2 px-3 max-w-6xl flex justify-between items-center w-full mx-auto bg-[#000000]/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-[0px_0px_0_0_#c69405,2px_2px_0_0_#9ca3af] z-50 fixed mt-4 left-1/2 -translate-x-1/2 '>
      <Link href={'/'}>
      <div className='flex gap-3 items-center'>
        <Image src={'/dojo.png'} alt='logo' width={35} height={35} />
        <h2 className='font-bold text-4xl font-game'>Code Mastery Dojo</h2>
      </div>
      </Link>
      {/* Navbar */}
      {!exerciseslug && courses ? <NavigationMenu className='font-game'>
        <NavigationMenuList className='gap-4'>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-gray-400/10 text-xl'>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid md:grid-cols-2 gap-2 p-4 sm:w-[400px] md:w-[500px] lg:w-[600px]'>
                {courses.map((course, index) => (
                  <Link href={'/courses/'+course?.courseId} key={index}>
                  <div  className='p-2 hover:bg-accent rounded-lg cursor-pointer'>
                    <h2 className='font-game text-3xl'>{course?.title}</h2>
                    <p className='text-xs text-gray-400'>{course?.desc}</p>
                  </div>
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink>
            <Link href={'/projects'} className='text-xl'>
              Projects
            </Link>
          </NavigationMenuLink>
          <NavigationMenuItem></NavigationMenuItem>
          <NavigationMenuLink>
            <Link href={'/pricing'} className='text-xl'>
              Pricing
            </Link>
          </NavigationMenuLink>
          <NavigationMenuItem></NavigationMenuItem>
          <NavigationMenuLink>
            <Link href={'/contact us'}className='text-xl'>
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>:
      <h2 className='font-game text-3xl'>{exerciseslug?.toString()?.replaceAll("-", ' ').toLocaleUpperCase()}</h2>
      }
      {/* Signup Button */}
      {!user ?
        <Link href='/sign-in'>
          <Button className='font-game text-2xl' variant={'pixel'}>Log In</Button>
        </Link>
        :
        <div className='flex gap-4 items-center'>
          <Link href={'/dashboard'}>
            <Button className='font-game text-2xl' variant={'pixel'}>Dashboard</Button>
          </Link>
          <UserButton/> 
        </div>
      }
    </div>
  )
}

export default Header
