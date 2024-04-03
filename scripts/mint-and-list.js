const { deployments, ethers } = require("hardhat")

async function mintAdnList() {
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
    deployerConnectedNftMarketplace = nftMarketplaceContract.connect(deployer)
    console.log("Minting...")
    const mintTx = await deployerConnectedBasicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    // deployerConnectedBasicNft.events
    //     .DogMinted()
    //     .on("data", (event) => console.log("event:", event))
    //     .on("error", (error) => console.log("error:", error))
    // receive the nft tokenId from events
    // const tokenId = mintTxReceipt.events[0].arges.tokenId
    const tokenId = 8
    const nftMarketplaceAddress = await deployerConnectedNftMarketplace.getAddress()
    const basicNftAddress = await deployerConnectedBasicNft.getAddress()
    const approveTx = await deployerConnectedBasicNft.approve(nftMarketplaceAddress, tokenId)
    await approveTx.wait(1)
    const approvedAddr = await deployerConnectedBasicNft.getApproved(0)
    console.log(`isApproved ${approvedAddr.toString()}`)
    console.log("Listing NFT...")
    const listItemTx = await deployerConnectedNftMarketplace.listItem(
        basicNftAddress,
        tokenId,
        ethers.parseEther("0.1"),
    )
    await listItemTx.wait(1)
    console.log("Listed!")
}

mintAdnList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
