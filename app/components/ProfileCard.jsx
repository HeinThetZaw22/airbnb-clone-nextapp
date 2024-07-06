import React from 'react'

const ProfileCard = ({icon: Icon, title, subtitle}) => {
  return (
    <div>
         <div className=" sm:px-5 py-3 flex items-center hover:bg-neutral-100 transition duration-150 flex-row sm:flex-col sm:w-[300px] sm:h-[150px] gap-2 rounded-lg cursor-pointer sm:shadow-lg">
            <Icon size={30} />
            <p className=' text-md font-semibold'>{title}</p>
            <p className=' max-sm:hidden text-light tracking-tighter text-neutral-600'>{subtitle}</p>
         </div>
    </div>
  )
}

export default ProfileCard