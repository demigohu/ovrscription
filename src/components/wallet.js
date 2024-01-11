import React, { useState, useEffect } from 'react';
import contractInteraction from '../utils/contractInteraction';

function Wallet() {
  const [inscriptionBalance, setInscriptionBalance] = useState('');
  const [inscriptionOwner, setInscriptionOwner] = useState('');
  const [mintedInscriptionBalance, setMintedInscriptionBalance] = useState('');
  const [tick, setTick] = useState('ops'); // Ganti dengan tick inskripsi Anda

  useEffect(() => {
    async function fetchData() {
      // Inisialisasi kontrak saat komponen dimuat
      await contractInteraction.init();

      if (tick !== '') {
        // Mendapatkan inscription balance
        const balance = await contractInteraction.checkInscriptionBalance(tick);
        setInscriptionBalance(balance.toString()); // Konversi ke string

        // Mendapatkan inscription owner
        const owner = await contractInteraction.checkInscriptionOwner(tick);
        setInscriptionOwner(owner.toString()); // Konversi ke string

        // Mendapatkan minted inscription balance
        const mintedBalance = await contractInteraction.checkMintedInscriptionBalance();
        setMintedInscriptionBalance(mintedBalance.toString()); // Konversi ke string
      }
    }

    fetchData(); // Panggil fungsi fetchData di sini untuk menjalankannya saat komponen dimuat pertama kali
  }, [tick]);

  const handleInputChange = (event) => {
    setTick(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ketika formulir dikirim, fetchData akan dipanggil dengan nilai tick yang baru
    await fetchData();
  };

  return (
    <div>
      <h1>Wallet Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input Tick Inscription:
          <input type="text" value={tick} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Inscription Balance: {inscriptionBalance}</p>
      <p>Inscription Owner: {inscriptionOwner}</p>
      <p>Minted Inscription Balance: {mintedInscriptionBalance}</p>
    </div>
  );
}

export default Wallet;
