import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import contractJSON from "../contracts/InscriptionContract.json" // Mengimpor JSON ABI kontrak

function Deploy() {
  const [p, setP] = useState("")
  const [op, setOp] = useState("")
  const [tick, setTick] = useState("")
  const [amt, setAmt] = useState("")

  const handleDeploy = async () => {
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

        // Memanggil fungsi deployInscription
        const transaction = await contract.deployInscription(
          p,
          op,
          tick,
          parseInt(amt)
        )
        await transaction.wait() // Menunggu transaksi selesai

        console.log("Inscription deployed successfully!")
      } else {
        console.error("MetaMask not found.")
      }
    } catch (error) {
      console.error("Error deploying Inscription:", error)
    }
  }

  return (
    <div className="card border shadow-md w-[90%] md:w-[80%] lg:w-1/2 mt-10 mx-auto">
      <div className="card-body flex-grow-0 p-5 md:p-10">
        <h2 className="card-title mb-5 font-bold">Deploy Inscription</h2>
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
            onClick={handleDeploy}
            className="btn btn-neutral text-white mt-5"
          >
            Deploy Inscription
          </button>
        </form>
      </div>
    </div>
  )
}

export default Deploy
