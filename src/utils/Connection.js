import { ThirdwebProvider } from "@thirdweb-dev/react";

const customChain = {
  // Required information for connecting to the network
  chainId: 1229724, // Chain ID of the network
  rpc: ["https://froopyland.dymension.xyz/26/overgear_1229724-1/evmrpc"], // Array of RPC URLs to use

  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "Overgear",
    symbol: "OVR",
  },
  shortName: "Overgear", // Display value shown in the wallet UI
  slug: "Overgear", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "Overgear", // Name of the network
  name: "Overgear", // Name of the network
};

function MyApp({ Component, pageProps } ) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={customChain}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp