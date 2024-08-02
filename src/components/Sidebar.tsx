"use client";
import React, { useState } from "react";
import {
  FaGithub,
  FaHome,
  FaMoneyCheckAlt,
  FaPlane,
  FaUser,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ImMenu } from "react-icons/im";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Sidebar() {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();

  const [expandMenue, setexpandMenue] = useState(false);


  const onSignOut = async (e: any) => {
    e.preventDefault();
    await signOut().then(() => {
      router.push("/login");
    });
  };

  return (
    <div className={`md:w-[20vw] w-[100vw]  h-[100vh] `}>
      <div
        onClick={() => setexpandMenue(!expandMenue)}
        className=" md:hidden p-4 bg-[#161B22]  cursor-pointer text-white flex md:justify-center md:items-center justify-start items-start text-4xl "
      >
        <ImMenu />
      </div>

      <div
        className={`${
          !expandMenue && "hidden md:flex md:flex-col"
        } transition-all bg-[#010409]  h-[100%] ease-in-out duration-500`}
      >
        <div className="text-white p-4 flex md:justify-center md:items-center justify-start items-start flex-col ">
          <Image
            src="/user.png"
            width={200}
            height={200}
            alt="Picture of the user"
            className="rounded-full m-4 p-2 mb-2 border-solid border-[2px] border-transparent border-[#30363D] cursor-pointer bg-[#161B22] transition-all ease-in-out duration-300"
          />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="ml-[97px] md:ml-0 font-semibold opacity-[1]">
                {session.data?.user.username}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onClick={(e:any) => onSignOut(e)
            } className="cursor-pointer">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-8">
          <Link
            href="/dashboard"
            className={`text-white cursor-pointer p-4 mt-2 font-semibold w-full flex items-center rounded-md text-lg ${
              pathname === "/dashboard" &&
              "bg-[#161B22]  border-solid border-[1px] border-[#30363D]"
            } hover:bg-[#161B22] hover:border-solid hover:border-[1px] border-[1px] border-transparent hover:border-[#30363D] transition-all ease-in-out duration-300`}
          >
            <FaHome className="mr-2" /> Home
          </Link>

          <Link
            href="/expenses"
            className={`text-white p-4 mt-2 cursor-pointer font-semibold w-full flex items-center rounded-md text-lg ${
              pathname === "/expenses" &&
              "bg-[#161B22] border-solid border-[1px] border-[#30363D]"
            } hover:bg-[#161B22] hover:border-solid hover:border-[1px] hover:border-[#30363D] border-[1px] border-transparent transition-all ease-in-out duration-300`}
          >
            <FaMoneyCheckAlt className="mr-2" /> Expenses
          </Link>

          <Link
            href="/trips"
            className={`text-white p-4 mt-2 font-semibold cursor-pointer w-full flex items-center rounded-md text-lg ${
              pathname === "/trips" &&
              "bg-[#161B22] border-solid border-[1px] border-[#30363D]"
            } hover:bg-[#161B22] hover:border-solid hover:border-[1px] hover:border-[#30363D] transition-all ease-in-out border-[1px] border-transparent duration-300 `}
          >
            <FaPlane className="mr-2" /> Trips
          </Link>

          <Link
            href="https://github.com/vaibhavgupta5"
            className={`text-white p-4 mt-2 font-semibold  w-full flex items-center cursor-pointer rounded-md text-lg ${
              pathname === "/support" &&
              "bg-[#161B22] border-solid border-[1px] border-[#30363D]"
            } border-[1px] border-transparent hover:bg-[#161B22] hover:border-solid hover:border-[#30363D] transition-all ease-in-out duration-300`}
          >
            <FaGithub className="mr-2" /> Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
