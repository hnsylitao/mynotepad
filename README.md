## MY NOTEPAD

### Introduction
MY NOTEPAD is a Dapp deployed on Nebulas testnet.

### Dapp Structure
#### Smart contract
The source code of MY NOTEPAD smart contract is [`notepad.js`](notepad/notepad.js). And the contract address after deployed on testnet is `n1MvaVWwHdvy55tMkZ5YX7vydV22a4r5M5M`.

It has five functions for Dapp user to use:
* `save(title, value, type)`
* `len()`
* `getNotePad(key)`
* `getAuthorNotePads(author)`
* `getAuthorNotePadsPagination(author,current,pageSize)`
