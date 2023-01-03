const { ethers } = require('ethers');
require('dotenv').config();

const INFURA_ID = process.env.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(
  `https://goerli.infura.io/v3/${INFURA_ID}`
);

const account1 = '0x26B97f99145d779D00c47aE5EB1E5852D540ABf8'; // Your account address 1
const account2 = '0xAB947f9ac0a69B653A798105861aF0F85E4f44D1'; // Your account address 2

const privateKey1 = process.env.WALLET_PRIVATE_KEY; // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account1);
  const recieverBalanceBefore = await provider.getBalance(account2);

  console.log(
    `\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `reciever balance before: ${ethers.utils.formatEther(
      recieverBalanceBefore
    )}\n`
  );

  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther('0.015'),
  });

  await tx.wait();
  console.log(tx);

  const senderBalanceAfter = await provider.getBalance(account1);
  const recieverBalanceAfter = await provider.getBalance(account2);

  console.log(
    `\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `reciever balance after: ${ethers.utils.formatEther(
      recieverBalanceAfter
    )}\n`
  );
};

main();
