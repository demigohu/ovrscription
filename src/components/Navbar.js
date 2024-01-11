"use client"

import React, { useState } from "react"
import { ethers } from "ethers"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../public/logo.jpg"
import a from "../../public/a.jpg"

function Navbar() {
  const [walletInfoVisible, setWalletInfoVisible] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [change, setChange] = useState(false)

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const address = await signer.getAddress()
        setWalletAddress(address)
        const balance = await provider.getBalance(address)
        const formattedBalance = ethers.utils.formatEther(balance)
        setBalance(formattedBalance)
        setWalletInfoVisible(true)
      } else {
        console.error("Metamask not found")
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setWalletInfoVisible(false)
    setWalletAddress("")
    setBalance("")
  }

  const handleChange = () => {
    setChange(!change)
  }

  return (
    <>
      <div className="flex justify-between items-center px-20 py-5 text-white">
        <div className="flex items-center gap-2">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={Logo}
              alt=""
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <p className="text-xl font-bold">OVRS</p>
        </div>
        <div className="flex gap-10 font-semibold">
          <Link href={"/"}>Home</Link>
          <Link href={"deploy"}>Deploy</Link>
          <Link href={"mint"}>Mint</Link>
          <Link
            href={"https://portal.dymension.xyz/rollapp/overgear_1229724-1"}
          >
            RollApp
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {walletInfoVisible ? (
            <div>
              <div className="flex gap-5">
                <button className="btn bg-transparent text-black hover:bg-transparent ">
                  {balance}
                </button>
                <div
                  className="border text-white shadow-md px-2 rounded-lg cursor-pointer flex items-center gap-2 max-w-40 overflow-hidden"
                  onClick={handleChange}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={a}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="max-w-20 text-xs text-black font-semibold overflow-hidden">
                    {walletAddress}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-neutral text-white border-none"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      {change ? (
        <div
          className="flex items-center max-w-64 gap-5 overflow-hidden rounded-lg absolute right-10 shadow-xl top-[80px] z-50 border"
          onClick={handleChange}
        >
          <div className="p-2 overflow-hidden">
            <p className="text-xs font-semibold">{walletAddress}</p>
          </div>
          <button
            onClick={disconnectWallet}
            className="btn bg-[#f83600] text-white border-none"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : null}
    </>
  )
}

export default Navbar
