import React from 'react';
import styled from 'styled-components';
import { Title, TextField, Button } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { useSafeBalances } from './hooks/useSafeBalances';
import BalancesTable from './components/BalancesTable';
import { getTransferTransaction } from "./apis/transfers";
import { ethers } from 'ethers';
// import { FunWallet } from "@fun-xyz/core";
// import { keccak256, toBytes } from "viem";

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK();
  const [balances] = useSafeBalances(sdk);
  const [recipient, setRecipient] = React.useState('');

  const handleTransfer = async (): Promise<void> => {
    const safeAddress = safe.safeAddress
    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/ev5UT9SghDasYMQqBwAgKCm0axotZVAi")
    const safeContract: ethers.Contract = new ethers.Contract(safeAddress, [{
      "inputs": [],
      "name": "getOwners",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }], provider)
    const owners = await safeContract.getOwners()
    console.log(owners)
    // const wallet = new FunWallet({
    //   users: [{ userId: owners[0] }],
    //   uniqueId: keccak256(toBytes(Math.ceil(Math.random() * 100000)))
    // })
    // console.log(wallet)
    const transactions = balances.map((balance) => getTransferTransaction(balance, recipient));

    const { safeTxHash } = await sdk.txs.send({ txs: transactions });

    console.log({ safeTxHash });
  };

  // Get the owners of the gnosis safe
  // Create the funwallet with multiple users
  // const wallet = new FunWallet({
  //   users: [{ userId: await auth.getAddress() }],
  //   uniqueId: keccak256(toBytes(Math.ceil(Math.random() * 100000)))
  // })
  // Initialize the funwallet
  // Return the address of the funwallet

  return (
    <Container>
      <Title size="sm">Safe: {safe.safeAddress}</Title>
      <BalancesTable balances={balances} />

      <TextField
        label="Recipient"
        onChange={(e) => {
          setRecipient(e.target.value);
        }}
        value={recipient}
      />
      <Button size="lg" color="primary" onClick={handleTransfer}>
        Send the assets
      </Button>
    </Container>
  );
};

export default SafeApp;