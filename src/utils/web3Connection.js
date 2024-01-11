import Web3 from 'web3';

const rpcURL = 'https://froopyland.dymension.xyz/26/overgear_1229724-1/evmrpc'; // URL RPC dari jaringan Ethereum
const chainID = 1229724; // ChainID jaringan Ethereum Anda

let web3;

const initWeb3 = () => {
  // Inisialisasi Web3 dengan URL RPC
  web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

  // Periksa koneksi dan info jaringan
  web3.eth.net.getId().then((networkId) => {
    console.log('Connected to network:', networkId);
    if (networkId !== chainID) {
      console.error('Connected to an unexpected network!');
    } else {
      console.log('Connected to the expected network!');
      // Lanjutkan dengan interaksi kontrak atau operasi lainnya di sini
    }
  }).catch((error) => {
    console.error('Error connecting to the network:', error);
  });
};

const getWeb3 = () => {
  if (!web3) {
    initWeb3();
  }
  return web3;
};

export { initWeb3, getWeb3 };
