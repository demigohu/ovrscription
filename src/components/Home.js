import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractJSON from '../contracts/InscriptionContract.json'; // Mengimpor JSON ABI kontrak

function Homey() {
  const [p, setP] = useState('ovr-20');
  const [op, setOp] = useState('mint');
  const [tick, setTick] = useState('ovr');
  const [amt, setAmt] = useState('1000');
  const [balance, setBalance] = useState(0); // State untuk menampung balance Inscription

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          const contractAddress = '0x68Dd9583fd56deB6778c4143f5E4bc2539b86edC'; // Address of deployed smart contract
          const contract = new ethers.Contract(contractAddress, contractJSON.abi, provider);

          // Memanggil fungsi checkInscriptionBalance untuk mendapatkan balance Inscription
          const inscriptionBalance = await contract.checkInscriptionBalance(tick);
          setBalance(inscriptionBalance.toString());
        } else {
          console.error('MetaMask not found.');
        }
      } catch (error) {
        console.error('Error fetching Inscription balance:', error);
      }
    }

    fetchBalance();
  }, [tick]); // Menggunakan tick sebagai dependency agar useEffect dijalankan ketika tick berubah

  const handleMint = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractAddress = '0x68Dd9583fd56deB6778c4143f5E4bc2539b86edC'; // Address of deployed smart contract
        const contract = new ethers.Contract(contractAddress, contractJSON.abi, signer);

        // Memanggil fungsi mintInscription
        const transaction = await contract.mintInscription(p, op, tick, parseInt(amt));
        await transaction.wait(); // Menunggu transaksi selesai

        console.log('Inscription minted successfully!');
      } else {
        console.error('MetaMask not found.');
      }
    } catch (error) {
      console.error('Error minting Inscription:', error);
    }
  };

  return (
    <div>
      <h1>Default Mint Inscription</h1>
      <div>
        <p>P: {p}</p>
        <p>OP: {op}</p>
        <p>Tick: {tick}</p>
        <p>Amt: {amt}</p>
        <p>Balance OVR: {balance}</p> {/* Menampilkan balance Inscription */}
        <button onClick={handleMint}>Mint Inscription</button>
      </div>
    </div>
  );
}

export default Homey;
