import React from 'react';
import styled from 'styled-components';
import { Title, TextField, Button } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { useSafeBalances } from './hooks/useSafeBalances';
import BalancesTable from './components/BalancesTable';
import { getTransferTransaction } from "./apis/transfers";
import { ethers } from 'ethers';
import { Auth, FunWallet, User, configureEnvironment, fundWallet, randomBytes } from '@fun-xyz/core'

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
  const [newAddress, setNewAddress] = React.useState<any>(null)
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
    console.log("Owners", owners)
    const auth = new Auth({ privateKey: '0x9097b7693d3c8d027238561c33fa9c79faa9d2d7845d82e4208164db122f687d' })

    await configureEnvironment({
      chain: 5,
      apiKey: "g2K4RcTBXe7ni54JUS2UjambCHaIEWEWQ3mMunC6"
    })
    const users: User[] = []
    for (let i = 0; i < owners.length; i++) {
      users.push({ userId: owners[i] })
    }
    users.push({ userId: await auth.getAddress() })
    console.log("Users", users);
    const wallet = new FunWallet({
      users: users, //users,
      uniqueId: randomBytes(32)
    })
    const address = await wallet.getAddress()
    console.log("New wallet address", address)
    setNewAddress(address)
    await fundWallet(auth, wallet, 0.01)
    await wallet.create(auth, await auth.getAddress())
    console.log(wallet)
    const walletAddress = await wallet.getAddress()
    const transactions = balances.map((balance) => getTransferTransaction(balance, walletAddress));

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
      <Title size="sm" className='text-white'>Safe: {safe.safeAddress}</Title>
      <BalancesTable balances={balances} />
      <Button size="lg" color="primary" onClick={handleTransfer}>
        Migrate to Fun Wallet
      </Button>
      {newAddress &&

        <Title size="sm" className='text-white'>Fun Wallet Address:  <a className='text-blue-50 underline' target="_blank"  href={`https://goerli.etherscan.io/address/${newAddress}`}>{newAddress}</a>
        </Title>

      }

    </Container>
  );
};

export default SafeApp;