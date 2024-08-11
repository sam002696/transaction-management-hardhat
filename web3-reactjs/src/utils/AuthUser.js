class AuthUserHelper {
  getUserWalletAddress() {
    const walletAddress = localStorage.getItem("wallet_address")
      ? JSON.parse(localStorage.getItem("wallet_address"))
      : "";
    return walletAddress || "";
  }

  getProvider() {
    const signer = localStorage.getItem("signer");
    return signer || [];
  }
}
