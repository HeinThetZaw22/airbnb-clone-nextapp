import React from 'react'

const ProfileCard = ({icon: Icon, title, subtitle}) => {
  return (
    <div>
         <div className="px-10 py-5 flex flex-col gap-2 rounded-lg cursor-pointer shadow-lg">
            <Icon />
            <p className=' text-md font-semibold'>{title}</p>
            <p className=' text-light text-neutral-600'>{subtitle}</p>
         </div>
    </div>
  )
}

export default ProfileCard