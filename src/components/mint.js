import React, { useState } from "react"
import { ethers } from "ethers"
import contractJSON from "../contracts/InscriptionContract.json" // Mengimpor JSON ABI kontrak

function MintInscription() {
  const [p, setP] = useState("")
  const [op, setOp] = useState("")
  const [tick, setTick] = useState("")
  const [amt, setAmt] = useState("")

  const handleMint = async (e) => {
    e.preventDefault()
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contractAddress = "0xf5059a5D33d5853360D16C683c16e67980206f36" // Address of deployed smart contract
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
    <div className="card border shadow-md w-[90%] md:w-[80%] lg:w-1/2 mt-10 mx-auto">
      <div className="card-body flex-grow-0 p-5 md:p-10">
        <h2 className="card-title mb-5 font-bold">Mint Inscription</h2>
        <form className="flex flex-col gap-3">
          <div>
            <label className="">P</label>
            <input
              type="text"
              placeholder="Type Here"
              className="input input-bordered w-full bg-white"
              id="pInput"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
          </div>

          <div>
            <label>OP :</label>
            <input
              type="text"
              placeholder="Type Here"
              className="input input-bordered w-full bg-white"
              id="opInput"
              value={op}
              onChange={(e) => setOp(e.target.value)}
            />
          </div>

          <div>
            <label>Tick :</label>
            <input
              type="text"
              placeholder="Type Here"
              className="input input-bordered w-full bg-white"
              id="tickInput"
              value={tick}
              onChange={(e) => setTick(e.target.value)}
            />
          </div>

          <div>
            <label>Amt :</label>
            <input
              placeholder="Type Here"
              className="input input-bordered w-full bg-white"
              id="amtInput"
              type="number"
              value={amt}
              onChange={(e) => setAmt(e.target.value)}
            />
          </div>

          <button
            onClick={handleMint}
            className="btn btn-neutral text-white mt-5"
          >
            Mint Inscription
          </button>
        </form>
      </div>
    </div>
  )
}

export default MintInscription
