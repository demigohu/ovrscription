import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import contractJSON from "../contracts/InscriptionContract.json" // Mengimpor JSON ABI kontrak

function Homey() {
  const [p, setP] = useState("ovr-20")
  const [op, setOp] = useState("mint")
  const [tick, setTick] = useState("ovr")
  const [amt, setAmt] = useState("1000")
  const [balance, setBalance] = useState(0) // State untuk menampung balance Inscription

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)

          const contractAddress = "0x68Dd9583fd56deB6778c4143f5E4bc2539b86edC" // Address of deployed smart contract
          const contract = new ethers.Contract(
            contractAddress,
            contractJSON.abi,
            provider
          )

          // Memanggil fungsi checkInscriptionBalance untuk mendapatkan balance Inscription
          const inscriptionBalance = await contract.checkInscriptionBalance(
            tick
          )
          setBalance(inscriptionBalance.toString())
        } else {
          console.error("MetaMask not found.")
        }
      } catch (error) {
        console.error("Error fetching Inscription balance:", error)
      }
    }

    fetchBalance()
  }, [tick]) // Menggunakan tick sebagai dependency agar useEffect dijalankan ketika tick berubah

  const handleMint = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contractAddress = "0x68Dd9583fd56deB6778c4143f5E4bc2539b86edC" // Address of deployed smart contract
        const contract = new ethers.Contract(
          contractAddress,
          contractJSON.abi,
          signer
        )

        // Memanggil fungsi mintInscription
        const transaction = await contract.mintInscription(
          p,
          op,
          tick,
          parseInt(amt)
        )
        await transaction.wait() // Menunggu transaksi selesai

        console.log("Inscription minted successfully!")
      } else {
        console.error("MetaMask not found.")
      }
    } catch (error) {
      console.error("Error minting Inscription:", error)
    }
  }

  return (
    <>
      <div className="w-[90%] md:w-[80%] mt-10 mx-auto text-white">
        <div className="card border shadow-md mb-10">
          <div className="card-body p-5 md:p-10">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">Available Mint {balance}</h1>
              <p className="text-end font-bold"></p>
            </div>
            <progress
              className="progress progress-success w-full h-3"
              value={balance}
              max="100"
            ></progress>
          </div>
        </div>

        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="card border shadow-md flex-1">
            <div className="card-body p-5 md:p-10">
              <h2 className="card-title mb-5">Overview!</h2>
              <div className="flex flex-col justify-around h-full">
                <div className="flex">
                  <p>P: {p}</p>
                  <p className="text-end">OP: {op}</p>
                </div>
                <div className="flex">
                  <p>Tick: {tick}</p>
                  <p className="text-end">Total Supply: 100000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card border shadow-md flex-1">
            <div className="card-body flex-grow-0 p-5 md:p-10">
              <h2 className="card-title mb-5">Mint!</h2>
              <div className="flex items-center justify-between">
                <p>Tick: {tick}</p>
                <p className="text-end">Limit Per Mint: 1000</p>
              </div>
              <input
                type="text"
                placeholder="OVRS"
                disabled
                className="input input-bordered w-full bg-white"
              />
              <button
                onClick={handleMint}
                className="btn btn-neutral text-white mt-5"
              >
                Mint Inscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homey
