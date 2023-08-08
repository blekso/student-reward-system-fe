"use client";

import Link from 'next/link'
import { AuthPageInvisible } from "@/app/lib/protect-page";
import { deleteCookie } from "cookies-next";
import { useEffect, useState } from 'react';
import axios from 'axios';

function handleLogout() {
  deleteCookie("accessToken")
  window.location.href = "/";
}


export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if(!user){
      try {
        const response = await axios.get('http://localhost:3001/api/user/test');
        setUser(response.data); // Assuming the response data contains user information
        //setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        //setLoading(false);
      }
    }
  };

   return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 font-mono">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm flex">
          <div className="grid lg:grid-cols-2 gap-8">
            <Link href="items">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Dostupne nagrade
                </h2>
              </Link>
              <Link href="profile">
                <h2 className={`mb-3 text-2xl font-semibold underline`}>
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

      <div className="mt-24 grid text-center lg:mb-0 gap-24 lg:text-left">
        <div>
            <h3 className="mb-3 text-xl">Moj uspjeh</h3>
            {user ? (
              <div> 
                  <p>Prosjek ocjena: {user.statistics.gpa}</p>
                  <p>Riješeni kolegiji: {user.statistics.solvedCourses}</p>
                </div>
              ) : null}
        </div>
        <div>
            <h3 className="mb-3 text-xl">Preuzete nagrade</h3>
            {user ? (<></>) : null}
        </div>
      </div>

    </main>
    <AuthPageInvisible />
    </>
  ) 
}
