
import React, { useEffect } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import Contract from "../../../../../abi/Reward.json";
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

const Claim = ({address, rewardId, claimed, txHash}) => {
  const { config } = usePrepareContractWrite({
    address: '0x84537610cf1e46dC5d255712314f0c5164F12F40',
    abi: Contract.abi,
    functionName: 'claim',
    args: [address]
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const transactionURL = `https://mumbai.polygonscan.com/tx/${data?.hash ?? txHash}`

  useEffect(() => {
    if (data && isSuccess) {
      postClaim()
    }
  }, [data]);

  const postClaim = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/claim', {
        "userAai": "test",
        "txHash": data?.hash,
        "rewardId": rewardId
      },{
        headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
      });

      console.log(response.data)
    } catch (error) {
      console.error('Error on post claim:', error);
    }
  };


  return (
  <div>
    {!isSuccess && claimed ? 
    (
      <div >
        {claimed ? <p className="info">Nagrada je već preuzeta.</p> : <p className="info">Uspješno preuzimanje!</p>}
        <div>
            <Link href={transactionURL} target={"_blank"}><button>Pogledaj transakciju</button></Link>
          </div>
      </div>
    ) : (
      <button
      onClick={() => write?.()}
          className="mb-3 w-32 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          type="button"
          style={{
            background:
              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
          }}
        >
          Preuzmi Nagradu
        </button>
    )}
  </div>
  )
    
  
}

export default Claim