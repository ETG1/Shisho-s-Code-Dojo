import Image from 'next/image';
import React from 'react'


const ExplorMoreOptions = [
    {
        id: 1,
        title: 'Quizz Pack',
        desc: 'Practice what you learned with bite-sized code challenges.',
        icon: '/lightning-bolt.png'
    },
    {
        id: 2,
        title: 'Video Courses',
        desc: 'Learn with structured video lessons taught step-by-step.',
        icon: '/game.png'
    },
    {
        id: 3,
        title: 'Community Project',
        desc: 'Build real-world apps by collaborating with the community.',
        icon: '/team.png'
    },
    {
        id: 4,
        title: 'Talk with AI',
        desc: 'Chat with AI to get help, explanations, and debugging tips.',
        icon: '/judo.png'
    }
];


function ExploreMore() {
  return (
    <div>
        <h2 className='text-3xl font-game flex flex-col items-center mb-2 mt-6'>
          Explore More
        </h2>
        <div className='grid grid-cols-2 gap-5'>
          {ExplorMoreOptions.map((option, index) => (
            <div key={index} className='flex gap-2 p-2 border rounded-xl bg-zinc-900'>
              <Image src={option?.icon} alt={option.title} width={60} height={60}/>
               <div>
                <h2 className='font-medium text-2xl font-game'>{option?.title}</h2>
                <p className='font-game text-gray-400'>{option?.desc}</p>
              </div>
            </div>
          ))}
        </div>  
    </div>
  )
}

export default ExploreMore