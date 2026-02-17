import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import EnrolledCourses from './_components/EnrolledCourses'
import ExploreMore from './_components/ExploreMore'
import InviteFriend from './_components/InviteFriend'
import UserStatus from './_components/UserStatus'
import UpgradeToPro from './_components/UpgradeToPro'
import ExploreMoreCourses from './_components/ExploreMoreCourses'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-32 xl:px-48'>
        <div className='grid grid-cols-3 mt-15 gap-7'>
          {/*left*/}
            <div className='col-span-2'>
                <WelcomeBanner/>
                <EnrolledCourses/>
                <ExploreMoreCourses/>
                <ExploreMore/>
                <InviteFriend/>
            </div>
            {/*right*/}
            <div>
                <UserStatus/>
                <UpgradeToPro/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard