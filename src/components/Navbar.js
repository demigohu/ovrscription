import React, { useState } from 'react';
import { ethers } from 'ethers';

function Navbar() {
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = await signer.getAddress();
        setWalletAddress(address);
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);
        setBalance(formattedBalance);
        setWalletInfoVisible(true);
      } else {
        console.error('Metamask not found');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletInfoVisible(false);
    setWalletAddress('');
    setBalance('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/your-logo.png" alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
        <span>Your App Name</span>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={connectWallet}>Connect Wallet</button>
        {walletInfoVisible && (
          <div>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
            <div>
              <p>Wallet Address: {walletAddress}</p>
              <p>Balance: {balance} ETH</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <button>Deploy</button>
        <button>Mint</button>
        <button>Wallet</button>
      </div>
    </div>
  );
}

export default Navbar;
