async function main() {
  const [deployer] = await ethers.getSigners();
  //   console.log("deployer :>> ", deployer);
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));

  const TransactionManager = await ethers.getContractFactory(
    "TransactionManager"
  );
  const transactionManager = await TransactionManager.deploy();
  console.log("TransactionManager deployed to:", transactionManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
