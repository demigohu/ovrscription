import React, { useState } from 'react';
import { ethers } from 'ethers';

const Faucet = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState(null);

  const requestFaucet = async () => {
    try {
      if (!recipientAddress) {
        alert('Please enter a recipient address.');
        return;
      }

      const privateKey = 'd2aae833d170cc00e0729556f197997657b0f7ade528357e15b599f04399ba1c'; // Ganti dengan private key Anda
      const toAddress = recipientAddress.trim();
      const amountToSend = ethers.utils.parseEther('10.0');

      const provider = new ethers.providers.JsonRpcProvider('https://froopyland.dymension.xyz/26/overgear_1229724-1/evmrpc');
      const wallet = new ethers.Wallet(privateKey, provider);

      // Mendapatkan nonce
      const nonce = await provider.getTransactionCount(wallet.address, 'pending');

      const transaction = {
        to: toAddress,
        value: amountToSend,
        nonce: nonce,
      };

      // Menandatangani dan mengirimkan transaksi
      const signedTransaction = await wallet.sendTransaction(transaction);
      setTransactionHash(signedTransaction.hash);
      alert('Transaction sent successfully!');
    } catch (error) {
      console.error('Transaction failed:', error.message);
      alert('Transaction failed. Check the console for details.');
    }
  };

  return (
    <div>
      <h1>Faucet Page</h1>

      <label htmlFor="recipientAddress">Recipient Address:</label>
      <input
        type="text"
        id="recipientAddress"
        placeholder="Enter recipient address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />

      <button onClick={requestFaucet}>Request 10 Ether</button>

      {transactionHash && (
        <div>
          <p>Transaction Hash: {transactionHash}</p>
          <p>Transaction sent successfully! Check the console for details.</p>
        </div>
      )}
    </div>
  );
};

export default Faucet;
