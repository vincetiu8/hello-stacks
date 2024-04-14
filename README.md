# Hello Stacks

gi

This is a basic dApp to demonstrate how to build on stacks.

### Project Overview

##### `./contracts`

Contracts holds all of the clarity contracts that are published to stacks and that users can interact with.

##### `./contracts/hello-stacks.clar`

This is our clarity smart contract that we will publish to the chain and interact with from the frontend.

To test:
1. Install [Clarinet](https://github.com/hirosystems/clarinet)
2. `cd contracts`
3. `clarinet console`
    1. In the console: `(contract-call? .hello-stacks write-message u"Hello there")`

##### Running devnet

To test on devnet (required for later):
1. In `contracts`: `clarinet integrate`
2. While devnet is loading: install [Leather](https://chromewebstore.google.com/detail/leather/ldinpeekobnhjjdofggfgjlcehhmanlj) on Chrome
3. In Leather: press use existing key, then paste the mnemonic from `accounts.wallet_1` in `settings/Devnet.toml`
4. Set a password for Leather
5. Go to `localhost:8000`
6. Look through the transactions (bottom right) and find the contract deploy of hello-stacks
    1. If you can't find it, press 'View All Recent Transactions' at the bottom
7. Copy the contract field of the transaction
8. Press 'Sandbox' (top right)
9. Press 'Connect Stacks Wallet'
10. Connect with the imported account
11. Press the function symbol (call functions)
12. Paste in the copied contract field into the top input box
13. Press 'Get Contract'
14. Press 'write-message'
15. Add a message and press 'call function'
16. Confirm the transaction on the wallet
17. Go back to the 'Transactions' page and look for the confirmed transaction

##### `./frontend/src/App.tsx`

This is our basic React frontend that interacts with the smart contracts. It allows a user to send and receive a message.

To test:
1. Make sure devnet is running (follow previous instructions)
2. In a different terminal: `cd frontend`
3. `yarn install`
4. `yarn dev`
5. Go to `localhost:5173`
6. Submit a message using the UI
7. Go back to the block explorer (`localhost:8000`) and wait for the message to be processed by the chain
8. Copy the transaction ID and paste it back into the frontend (`localhost:5173`) to retrieve the message
