'use client'
import React from 'react'
import { FaGithub, FaHome, FaMoneyCheckAlt, FaPlane } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='w-[20vw] h-[100vh] bg-[#010409]'>

        {pathname}

      <div className='p-8'>
      <Link href="/dashboard" className={`text-white cursor-pointer p-4 mt-2 font-semibold w-full flex items-center rounded-md text-lg ${pathname === "/dashboard" && "bg-[#161B22]  border-solid border-[1px] border-[#30363D]"} hover:bg-[#161B22] hover:border-solid hover:border-[1px] border-[1px] border-transparent hover:border-[#30363D] transition-all ease-in-out duration-300` }><FaHome className='mr-2' /> Home
      </Link>

      <Link href="/expenses" className={`text-white p-4 mt-2 cursor-pointer font-semibold w-full flex items-center rounded-md text-lg ${pathname === "/expenses" && "bg-[#161B22] border-solid border-[1px] border-[#30363D]"} hover:bg-[#161B22] hover:border-solid hover:border-[1px] hover:border-[#30363D] border-[1px] border-transparent transition-all ease-in-out duration-300`}><FaMoneyCheckAlt 
      className='mr-2' /> Expenses
      </Link>

      <Link href="/trips" className={`text-white p-4 mt-2 font-semibold cursor-pointer w-full flex items-center rounded-md text-lg ${pathname === "/trips" && "bg-[#161B22] border-solid border-[1px] border-[#30363D]"} hover:bg-[#161B22] hover:border-solid hover:border-[1px] hover:border-[#30363D] transition-all ease-in-out border-[1px] border-transparent duration-300 `}><FaPlane className='mr-2' /> Trips
      </Link>

      <Link href="https://github.com/vaibhavgupta5" className={`text-white p-4 mt-2 font-semibold  w-full flex items-center cursor-pointer rounded-md text-lg ${pathname === "/support" && "bg-[#161B22] border-solid border-[1px] border-[#30363D]"} border-[1px] border-transparent hover:bg-[#161B22] hover:border-solid hover:border-[#30363D] transition-all ease-in-out duration-300`}><FaGithub className='mr-2' /> Support
      </Link>

      </div>
    </div>
  )
}

export default Sidebar