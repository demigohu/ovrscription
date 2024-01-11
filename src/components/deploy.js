import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractJSON from '../contracts/InscriptionContract.json'; // Mengimpor JSON ABI kontrak

function Deploy() {
  const [p, setP] = useState('');
  const [op, setOp] = useState('');
  const [tick, setTick] = useState('');
  const [amt, setAmt] = useState('');

  const handleDeploy = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractAddress = '0x68Dd9583fd56deB6778c4143f5E4bc2539b86edC'; // Address of deployed smart contract
        const contract = new ethers.Contract(contractAddress, contractJSON.abi, signer);

        // Memanggil fungsi deployInscription
        const transaction = await contract.deployInscription(p, op, tick, parseInt(amt));
        await transaction.wait(); // Menunggu transaksi selesai

        console.log('Inscription deployed successfully!');
      } else {
        console.error('MetaMask not found.');
      }
    } catch (error) {
      console.error('Error deploying Inscription:', error);
    }
  };

  return (
    <div>
      <h1>Deploy Inscription</h1>
      <div>
        <label htmlFor="pInput">P: </label>
        <input id="pInput" value={p} onChange={(e) => setP(e.target.value)} />
      </div>
      <div>
        <label htmlFor="opInput">OP: </label>
        <input id="opInput" value={op} onChange={(e) => setOp(e.target.value)} />
      </div>
      <div>
        <label htmlFor="tickInput">Tick: </label>
        <input id="tickInput" value={tick} onChange={(e) => setTick(e.target.value)} />
      </div>
      <div>
        <label htmlFor="amtInput">Amt: </label>
        <input
          id="amtInput"
          type="number"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />
      </div>
      <button onClick={handleDeploy}>Deploy Inscription</button>
    </div>
  );
}

export default Deploy;
