const { moveBlocks } = require("../utils/move-blocks")
const { ethers, deployments, network } = require("hardhat")
const BLOCKS = 5

async function mint() {
    const acounts = await ethers.getSigners()
    const deployer = acounts[0]
    const nftMarketplaceContract = await ethers.getContractAt(
        "NftMarketplace",
        (await deployments.get("NftMarketplace")).address,
    )
    const basicNftContract = await ethers.getContractAt(
        "BasicNft",
        (await deployments.get("BasicNft")).address,
    )
    deployerConnectedBasicNft = basicNftContract.connect(deployer)
    console.log("Minting...")
    const mintTx = await deployerConnectedBasicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)

    if (network.config.chainId == 31337) {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
