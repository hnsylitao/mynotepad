## MY NOTEPAD

### Introduction
MY NOTEPAD is a Dapp deployed on Nebulas testnet.

### Dapp Structure
#### Smart contract
The source code of MY NOTEPAD smart contract is [`notepad.js`](notepad/notepad.js). And the contract address after deployed on testnet is `n1ra35A5Rc9mJZ9AkX3tKv6LQt3vKfZpPNx`.
mainnet is `n1kVaL1kaTZLaXWQQY2jC3F9h6Gifc1dQQc`.

It has five functions for Dapp user to use:
* `save(title, value, type)`
* `len()`
* `getNotePad(key)`
* `getAuthorNotePads(author)`
* `getAuthorNotePadsPagination(author,current,pageSize)`
