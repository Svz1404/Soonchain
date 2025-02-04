import { ethers } from 'ethers';
import dotenv from 'dotenv';
import cfonts from "cfonts";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const sender = process.env.SENDER_ADDRESS;
const routerAddress = "0xf15235FE8BdC1e66dBd185b9739319fAd79E13d3";
const amountIn = ethers.parseEther('0.0000001');
const path = [
    "0xe0bF6c9D1e5345F6a30925525649b1193D7A50e1",
    "0x3A1Cb10E2BB0a3d36D1AB673DDEB9e1CD4660504",
    "0x7FcC9A71E1613A740920F4579472356780B6e68C",
    "0x2bA7974eDa5d9b020F79574CC5944a30BD5162A6"
];
const recipient = sender;

const routerABI = [
    {
        "inputs": [
            { "name": "amountIn", "type": "uint256" },
            { "name": "path", "type": "address[]" },
            { "name": "to", "type": "address" },
            { "name": "deadline", "type": "uint256" }
        ],
        "name": "swapExactETHForTokens",
        "outputs": [{ "name": "amounts", "type": "uint256[]" }],
        "stateMutability": "payable",
        "type": "function"
    }
];

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const routerContract = new ethers.Contract(routerAddress, routerABI, wallet);

async function swapExactETHForTokens() {
    for (let i = 0; i < 10000; i++) {
        try {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10;
            const tx = await routerContract.swapExactETHForTokens(
                amountIn,
                path,
                recipient,
                deadline,
                { value: amountIn, gasLimit: 250000 }
            );
            console.log("\n==============================");
            console.log(`✅ Transaction ${i + 1} Successful!`);
            console.log("🔗 Transaction Hash:", tx.hash);
            console.log("==============================\n");
        } catch (error) {
            console.log("\n==============================");
            console.error(`❌ Transaction ${i + 1} Failed:`, error.message);
            console.log("==============================\n");
        }
            
        console.log("Waiting 10 minutes before the next transaction...");
        await new Promise(resolve => setTimeout(resolve, 10 * 60 * 1000));
    }
}
cfonts.say('NT Exhaust', {
    font: 'block',        // Options: 'block', 'simple', '3d', etc.
    align: 'center',
    colors: ['cyan', 'magenta'],
    background: 'black',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
  });
console.log("=== Telegram Channel : NT Exhaust ( @NTExhaust ) ===")

swapExactETHForTokens();