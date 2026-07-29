export function version() {
  return "OnchainKit Core v0.2.0";
}

export function getNetwork(chainId) {
  const networks = {
    1: "Ethereum",
    8453: "Base",
    84532: "Base Sepolia"
  };

  return networks[chainId] || "Unknown";
}

export function isSupportedChain(chainId) {
  return [1, 8453, 84532].includes(chainId);
}
