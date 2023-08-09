"use client";

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import RewardPage from "./components/RewardPage";
import { AuthPageInvisible } from "@/app/lib/protect-page";


const chains = [arbitrum, mainnet, polygon]
const projectId = process.env.NEXT_PUBLIC_W3C_PID

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)



export default function Reward() {
  
  return (

    <>
      <WagmiConfig config={wagmiConfig}>
        <RewardPage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <AuthPageInvisible />
    </>
      
  )
}
