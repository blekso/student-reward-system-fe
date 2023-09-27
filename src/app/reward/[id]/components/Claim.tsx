import React, { useEffect } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import Contract from '../../../../../abi/Reward.json';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { DecodedUser } from '@/app/profile/page';
import jwt from 'jwt-decode';

type Props = {
  contractAddress: any;
  rewardId: number;
  claimed: boolean;
  txHash: string;
};

const Claim = ({ contractAddress, rewardId, claimed, txHash }: Props) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: Contract.abi,
    functionName: 'claim',
  });

  const { data, isSuccess, write } = useContractWrite(config);
  const transactionURL = `https://mumbai.polygonscan.com/tx/${
    data?.hash ?? txHash
  }`;

  useEffect(() => {
    if (data && isSuccess) {
      postClaim();
    }
  }, [data]);

  const postClaim = async () => {
    const userJwt = getCookie('accessToken') as string;
    const decodedJwt: DecodedUser = jwt(userJwt);

    try {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/claim`,
        {
          userAai: decodedJwt.aai,
          txHash: data?.hash,
          rewardId: rewardId,
        },
        {
          headers: { Authorization: `Bearer ${userJwt}` },
        }
      );
    } catch (error) {
      console.error('Error on post claim:', error);
    }
  };

  return (
    <div>
      {!isSuccess && !claimed ? (
        <button
          onClick={() => write?.()}
          className="mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          type="button"
          style={{
            background:
              'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
          }}
        >
          Preuzmi Nagradu
        </button>
      ) : isSuccess && !claimed ? (
        <>
          <p className="info">Uspješno preuzimanje!</p>
          <Link href={transactionURL} target={'_blank'}>
            <button
              className="mb-3 w-32 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="button"
              style={{
                background:
                  'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
              }}
            >
              Pogledaj transakciju
            </button>
          </Link>
        </>
      ) : null}
      {claimed ? (
        <div>
          {claimed ? <p className="info">Nagrada je već preuzeta.</p> : null}
          <div>
            <Link href={transactionURL} target={'_blank'}>
              <button
                className="mb-3 w-32 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="button"
                style={{
                  background:
                    'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                }}
              >
                Pogledaj transakciju
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Claim;
