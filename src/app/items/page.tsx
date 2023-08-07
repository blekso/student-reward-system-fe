"use client";

import Image from 'next/image'
import Link from 'next/link'
import { AuthPageInvisible } from "@/app/lib/protect-page";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from 'react';
import axios from 'axios';

function handleLogout() {
  deleteCookie("accessToken")
  window.location.href = "/";
}

export default function Items() {
  const [rewards, serRewards] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/reward', {
        headers: {Authorization: `Bearer ${getCookie("accessToken")}`,}
      });
      serRewards(response.data); // Assuming the response data contains user information
      //setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      //setLoading(false);
    }
  };
  
   return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 font-mono">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
          <div className="grid grid-cols-2 gap-8">
            <Link href="items">
                <h2 className={`mb-3 text-2xl font-semibold underline`}>
                  Dostupne nagrade
                </h2>
              </Link>
              <Link href="profile">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Moj profil
                </h2>
              </Link>
          </div>
          
          <button
            onClick={handleLogout}
            className="mb-3 w-32 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="button"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            odjava
          </button>
      </div>

      <div className="mt-24 grid text-center lg:mb-0 lg:grid-cols-2 gap-8 lg:text-left">
      {rewards.map((reward: any) => (
        <Link
        key={reward.id}
        href={`reward/${reward.name}`}
        className="grid grid-cols-2 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <div className="flex items-center justify-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/next.svg"
            alt="Next.js Logo"
            width={120}
            height={120}
            priority
          />
        </div>
        
        <div>
          <h2 className={`mb-3 text-2xl font-semibold`}>
          {reward.name}{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          {reward.description}
        </p>
      </div>
      </Link>
      ))}
        
      </div>
    </main>
    {/* <AuthPageInvisible /> */}
    </>
  ) 
}
