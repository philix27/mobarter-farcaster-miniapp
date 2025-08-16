import { HDNodeWallet, Wallet } from "ethers";

export function findWallet() {

    // your 12/24 word mnemonic seed phrase
    const mnemonic = "your seed phrase goes here";

    // derive the HD node from the mnemonic
    const hdNode = HDNodeWallet.fromPhrase(mnemonic);

    // example: default derivation path for Ethereum wallets (m/44'/60'/0'/0/0)
    const wallet0 = Wallet.fromPhrase(mnemonic);
    // const wallet0 = Wallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/0`);
    console.log("Address 0:", wallet0.address);
    console.log("Private Key 0:", wallet0.privateKey);

    // if you want to find the private key for a known wallet address
    const targetAddress = "0xYourWalletAddressHere".toLowerCase();

    let privateKey;
    for (let i = 0; i < 20; i++) { // loop through first 20 accounts
        // const w = Wallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/${i}`);
        const w = Wallet.fromPhrase(mnemonic);
        if (w.address.toLowerCase() === targetAddress) {
            privateKey = w.privateKey;
            console.log(`Found address at index ${i}:`, w.address);
            console.log("Private Key:", privateKey);
            break;
        }
    }

    if (!privateKey) {
        console.log("Address not found in first 20 derivations. Try more indexes.");
    }

}