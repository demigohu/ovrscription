"use client"
import contractInteraction from '../utils/contractInteraction';
import Deploy from "../components/deploy.js"
import { ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import MintInscription from '@/components/mint';
import Wallet from '@/components/wallet';
import Navbar from '@/components/Navbar';
import Homey from '@/components/Home';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Homey />
      <Deploy />
      {/* <ThirdwebProvider>
            <ConnectWallet
                    theme={"dark"}
                    switchToActiveChain={true}
                    modalSize={"compact"}
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </ThirdwebProvider> */}
        <MintInscription />
        {/* <Wallet /> */}
    </main>
  )
}
