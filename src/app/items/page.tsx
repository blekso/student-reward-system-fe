'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AuthPageInvisible } from '@/app/lib/protect-page';
import { getCookie, deleteCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import axios from 'axios';

function handleLogout() {
  deleteCookie('accessToken');
  window.location.href = '/';
}

export default function Items() {
  const [isLoading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reward`,
        {
          headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
        }
      );
      setRewards(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center md:p-24 p-8 font-mono">
        <div className="z-10 w-full max-w-5xl items-center justify-between text-sm flex">
          <div className="grid lg:grid-cols-2 gap-8">
            <Link href="items">
              <h2 className={`mb-3 text-2xl font-semibold underline`}>
                Dostupne nagrade
              </h2>
            </Link>
            <Link href="profile">
              <h2 className={`mb-3 text-2xl font-semibold`}>Moj profil</h2>
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="mb-3 w-32 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="button"
            style={{
              background:
                'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
            }}
          >
            Odjava
          </button>
        </div>

        <div
          className={`md:mt-24 mt-8 grid text-center lg:mb-0 ${
            rewards.length > 0 ? 'lg:grid-cols-2' : ''
          } gap-8 lg:text-left`}
        >
          {isLoading ? (
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              Učitavanje..
            </span>
          ) : (
            <>
              {rewards.length > 0 ? (
                rewards.map((reward: any) => (
                  <Link
                    key={reward.id}
                    href={`reward/${reward.id.toString()}`}
                    className="grid md:grid-cols-2 gap-4 border-2 border-gray-300 
                    max-w-lg group rounded-lg border border-transparent px-5 py-4 
                    transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 
                    hover:dark:bg-neutral-800/30"
                  >
                    <div className="flex items-center justify-center">
                      <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                        src={reward.imageUrl}
                        alt="Next.js Logo"
                        width={200}
                        height={200}
                        priority
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <h2 className={`mb-3 text-2xl font-semibold`}>
                        {reward.name}{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                          -&gt;
                        </span>
                      </h2>
                      {reward.shortDescription ? (
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                          {reward.shortDescription}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ))
              ) : (
                <>Trenutno nema dostupnih nagrada :(</>
              )}
            </>
          )}
        </div>
      </main>
      {<AuthPageInvisible />}
    </>
  );
}
