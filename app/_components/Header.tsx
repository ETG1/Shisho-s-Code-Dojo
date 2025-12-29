'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
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

const courses = [
  {
    id: 1,
    name: 'HTML',
    desc: 'Learn the fundamentals of HTML and build the structure of modern web pages.',
    path: '/course/1/detail'
  },
  {
    id: 2,
    name: 'CSS',
    desc: 'Master CSS to style and design responsive, visually appealing web layouts.',
    path: '/course/2/detail'
  },
  {
    id: 3,
    name: 'React',
    desc: 'Build dynamic and interactive web applications using the React JavaScript library.',
    path: '/course/3/detail'
  },
  {
    id: 4,
    name: 'React Advanced',
    desc: 'Deep dive into advanced React concepts including hooks, state management, performance optimization, and architectural patterns.',
    path: '/course/4/detail'
  },
  {
    id: 5,
    name: 'Python',
    desc: 'Learn Python programming from basics to intermediate level, covering logic building, functions, and real-world applications.',
    path: '/course/5/detail'
  },
  {
    id: 6,
    name: 'Python Advanced',
    desc: 'Master advanced Python concepts such as OOP, modules, APIs, data processing, and automation.',
    path: '/course/6/detail'
  },
  {
    id: 7,
    name: 'Generative AI',
    desc: 'Explore prompt engineering, LLMs, embeddings, image generation, and build GenAI-powered applications.',
    path: '/course/7/detail'
  },
  {
    id: 8,
    name: 'Machine Learning',
    desc: 'Understand ML concepts, algorithms, data preprocessing, model training, evaluation, and deployment.',
    path: '/course/8/detail'
  },
  {
    id: 9,
    name: 'JavaScript',
    desc: 'Learn core JavaScript concepts, asynchronous programming, DOM manipulation, and modern ES6+ features.',
    path: '/course/9/detail'
  }
];

function Header() {
  const { user } = useUser();
  console.log(user)
  return (
    <div className='p-3 max-w-6xl flex justify-between items-center w-full mx-auto bg-[#000000]/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-[0px_0px_0_0_#c69405,2px_2px_0_0_#9ca3af] z-50 fixed mt-4 left-1/2 -translate-x-1/2'>
      <Link href={'/'}>
      <div className='flex gap-2 items-center'>
        <Image src={'/dojo.png'} alt='logo' width={40} height={40} />
        <h2 className='font-bold text-4xl font-game'>Code Mastery Dojo</h2>
      </div>
      </Link>
      {/* Navbar */}
      <NavigationMenu>
        <NavigationMenuList className='gap-4'>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-gray-400/10'>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid md:grid-cols-2 gap-2 p-4 sm:w-[400px] md:w-[500px] lg:w-[600px]'>
                {courses.map((course, index) => (
                  <div key={index} className='p-2 hover:bg-accent rounded-lg cursor-pointer'>
                    <h2 className='font-game text-3xl'>{course.name}</h2>
                    <p className='text-xs text-gray-400'>{course.desc}</p>
                  </div>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuLink>
            <Link href={'/projects'}>
              Projects
            </Link>
          </NavigationMenuLink>
          <NavigationMenuItem></NavigationMenuItem>
          <NavigationMenuLink>
            <Link href={'/pricing'}>
              Pricing
            </Link>
          </NavigationMenuLink>
          <NavigationMenuItem></NavigationMenuItem>
          <NavigationMenuLink>
            <Link href={'/contact us'}>
              Contact Us
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
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
