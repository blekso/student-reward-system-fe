'use client';

import React from "react";
import { LandingAuthPageInvisible } from "@/app/lib/protect-landing-page";
import Image from 'next/image'


function handleClick() {
  window.location.href = process.env.NEXT_PUBLIC_AAI_REDIRECT;
}

export default function Login() {
   return (
   <>
    <main className="h-screen flex items-center justify-center">
        <div className="p-10 bg-gray-200 rounded-md shadow-lg">
            {/* <!--Logo--> */}
            <div className="text-center">
              <Image
                src="/ferit-logo.png"
                width={259}
                height={259}
                alt="Picture of the author"
              />
              <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                Student reward system
              </h4>
            </div>

            <form>
              <p className="mb-4">Prijavi se sa svojim AAI@EduHr računom</p>

              {/* <!--Submit button--> */}
              <div className="mb-12 pb-1 pt-1 text-center">
                  <button
                    onClick={handleClick}
                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="button"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    prijava
                  </button>
              </div>
            </form>
        </div>
      </main>
      <LandingAuthPageInvisible />
    </>
  );
}