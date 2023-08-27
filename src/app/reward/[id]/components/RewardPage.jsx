'use client';

import Image from 'next/image';
import { Web3Button } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Claim from '../components/Claim';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function RewardPage() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [isRewardLoading, setLoading] = useState(true);
  const [reward, setReward] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetchReward();
  }, []);

  const fetchReward = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reward/${params.id}`,
        {
          headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
        }
      );
      setReward(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (isRewardLoading) {
    return <div>Loading...</div>;
  }

  if (reward) {
    return (
      <div>
        <main className="grid grid-cols-1 md:gap-16 gap-8 font-mono md:mb-64 mb-24">
          <div className="h-96 bg-black relative overflow-hidden flex items-center justify-center place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src={reward.imageUrl}
              alt="Next.js Logo"
              width={1000}
              height={400}
              priority
            />
            <h2 className="absolute md:text-6xl text-3xl mb-3 text-white md:text-2xl text-xl font-semibold">
              {reward.name}
            </h2>
          </div>

          <div className="md:mx-24 mx-8">
            <Link href={'..'}>
              <h2
                className={`inline mb-3 md:text-2xl text-xl font-semibold underline`}
              >
                &lt;- Povratak na izbornik
              </h2>
            </Link>
          </div>

          {reward.description ? (
            <div className="md:mx-24 mx-8">
              <p className={`md:text-xl text-lg tracking-wide leading-loose`}>
                {reward.description}
              </p>
            </div>
          ) : null}

          <div className="md:mx-24 mx-8">
            <p className="md:text-2xl text-xl tracking-wide leading-loose">
              Reward type: NFT
            </p>
          </div>

          <div className="md:mx-24 mx-8">
            <p className="md:text-2xl text-xl tracking-wide leading-loose">
              Preuzmi nagradu
            </p>
            {!reward.userClaimed ? (
              <>
                <p className="info">Odaberi web3 novčanik</p>
                <Web3Button />
                {address ? (
                  <div className="my-4">
                    {
                      <Claim
                        contractAddress={reward.contractAddress}
                        address={address}
                        rewardId={reward.id}
                        claimed={reward.claimed}
                        txHash={reward.txHash}
                      />
                    }
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </main>
      </div>
    );
  }

  return <div>No reward found.</div>;
}
