"use client";

import Image from 'next/image'
import Link from 'next/link'
import { AuthPageInvisible } from "@/app/lib/protect-page";
import { deleteCookie } from "cookies-next";

function handleClick() {
  deleteCookie("accessToken")
  window.location.href = "/";
}

export default function items() {
   return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 font-mono">
      <div className="z-10 w-full max-w-5xl items-center justify-between  text-sm lg:flex">
        <div className="grid grid-cols-2 gap-8">
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
            onClick={handleClick}
            className="mb-3 w-32 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="button"
            style={{
              background:
                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
            }}
          >
            odjava
          </button>
      </div>

      <div className="mt-24 grid text-center lg:mb-0 lg:grid-cols-2 gap-24 lg:text-left">
        <div>
            <h3 className="mb-3 text-xl">Preuzete nagrade</h3>
            <p>Nagrada 1</p>
            <p>Nagrada 1</p>
            <p>Nagrada 1</p>
            <p>Nagrada 1</p>
            <p>Nagrada 1</p>
        </div>
        <div>
            <h3 className="mb-3 text-xl">Moj uspjeh</h3>
            <p>Nagrada 1</p>
        </div>
      </div>

    </main>
    <AuthPageInvisible />
    </>
  ) 
}
