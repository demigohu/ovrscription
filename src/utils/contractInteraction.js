import { ethers } from 'ethers';
import InscriptionContract from '../contracts/InscriptionContract.json';

const contractInteraction = {
  provider: null,
  contract: null,

  // Inisialisasi provider dan kontrak cerdas
  init: async function() {
    // Menginisialisasi provider Ethereum (ubah sesuai kebutuhan Anda)
    this.provider = new ethers.providers.JsonRpcProvider('https://froopyland.dymension.xyz/26/overgear_1229724-1/evmrpc'); // Ganti dengan alamat node Ethereum yang sesuai

    // Mendapatkan ABI dan address dari smart contract
    const contractAddress = '0x68Dd9583fd56deB6778c4143f5E4bc2539b86edC'; // Address of deployed smart contract
    this.contract = new ethers.Contract(contractAddress, InscriptionContract.abi, this.provider);
  },

  // Mendeploy Inscription
  deployInscription: async function(p, op, tick, amt) {
    const signer = this.provider.getSigner();
    const tx = await this.contract.deployInscription(p, op, tick, amt);
    const txWithGas = await tx.wait();
    return txWithGas;
  },

  // Mint Inscription
  mintInscription: async function(p, op, tick, amt) {
    const signer = this.provider.getSigner();
    const tx = await this.contract.mintInscription(p, op, tick, amt);
    const txWithGas = await tx.wait();
    return txWithGas;
  },

  // Check Inscription Balance
  checkInscriptionBalance: async function(tick) {
    return this.contract.checkInscriptionBalance(tick);
  },

  // Check Inscription Owner
  checkInscriptionOwner: async function(tick) {
    return this.contract.checkInscriptionOwner(tick);
  },

  // Check Minted Inscription Balance
  checkMintedInscriptionBalance: async function() {
    return this.contract.checkMintedInscriptionBalance();
  },
};

export default contractInteraction;

