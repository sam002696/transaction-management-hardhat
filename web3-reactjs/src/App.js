import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
// import TransactionManager from "../../hardhat-project/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import TransactionManager from "./utils/TransactionManager/TransactionManager.json";

const transactionManagerAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
    } else {
      alert(
        "MetaMask is required to use this application. Please install MetaMask."
      );
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const signer = await provider.getSigner();
      console.log("signer", signer);
      const transactionManagerContract = new ethers.Contract(
        transactionManagerAddress,
        TransactionManager.abi,
        signer
      );
      setContract(transactionManagerContract);
    }
  };

  console.log("contract :>> ", contract);
  console.log("account :>> ", account);

  const sendTransaction = async () => {
    console.log("receiver :>> ", typeof receiver);
    if (contract && account) {
      try {
        console.log("Sending transaction...");
        const tx = await contract.sendTransaction(receiver, {
          value: ethers.parseEther(amount),
        });
        await tx.wait();
        alert("Transaction successful");
        loadTransactions();
      } catch (error) {
        console.error("Error sending transaction:", error);
        alert("Error sending transaction: " + error.message);
      }
    }
  };

  const loadTransactions = async () => {
    if (contract && account) {
      try {
        const txs = await contract.getTransactions(account);
        console.log("txs :>> ", txs);
        if (Array.isArray(txs)) {
          setTransactions(txs);
        } else {
          console.error("Unexpected response format:", txs);
        }
      } catch (error) {
        console.error("Error loading transactions:", error);
      }
    }
  };

  // console.log("transactionManagerAddress :>> ", transactionManagerAddress);

  return (
    <div className="App">
      <h1>Web3 Transaction Management</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <div>
            <input
              type="text"
              placeholder="Receiver Address"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount (ETH)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendTransaction}>Send Transaction</button>
          </div>
          <div>
            <h2>Transactions</h2>
            <button onClick={loadTransactions}>Load Transactions</button>
            <ul>
              {transactions?.map((tx, index) => (
                <li key={index}>
                  {tx.sender} sent {ethers.formatEther(tx.amount)} ETH to{" "}
                  {tx.receiver} at{" "}
                  {new Date(tx.timestamp * 1000).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
