const { assert, expect } = require("chai")
const { network, deployment, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nft Marketplace Test", function () {
          let nftMarketplace, basicNft, deployer
          const PRICE = ethers.parseEther("0.1")
          const TOKEN_ID = 0
          beforeEach(async function () {
              accounts = await ethers.getSigners() // could also do with getNamedAccounts
              deployer = accounts[0]
              user = accounts[1]
              await deployments.fixture(["all"])
              // if we don't specifiy the signer(add the signer param),
              // it comes default with the deployer as signer
              // which is equvalent to "ether.getContract("NftMarketplace", deployer)"
              // otherwise, if you want to switch to another signer dynamically, you need to connect()
              // something like nftMarketplace.connect(user)

              nftMarketplaceContract = await ethers.getContractAt(
                  "NftMarketplace",
                  (await deployments.get("NftMarketplace")).address,
              )
              nftMarketplace = nftMarketplaceContract.connect(deployer)
              basicNftContract = await ethers.getContractAt(
                  "BasicNft",
                  (await deployments.get("BasicNft")).address,
              )
              basicNft = basicNftContract.connect(deployer)
              const mintNftTx = await basicNft.mintNft()
              const mintNftReceipt = await mintNftTx.wait(1)
              console.log(`mintEvent: ${mintNftReceipt.events[0]}`)
              await nftMarketplace.getListing(basicNft.target, TOKEN_ID)
              nftMarketplaceContractAddress = await nftMarketplaceContract.getAddress()
              await basicNft.approve(nftMarketplaceContractAddress, TOKEN_ID)
          })

          describe("ListItem", function () {
              it("lists and can be bought", async function () {
                  // first off, list the nft item
                  const basicNftAddress = await basicNft.getAddress()
                  await nftMarketplace.listItem(basicNftAddress, TOKEN_ID, PRICE)
                  // then buy it using another signer
                  // firstly we need to connect the contract to another signer
                  const userConnectedNftMarketplace = nftMarketplace.connect(user)
                  await userConnectedNftMarketplace.buyItem(basicNftAddress, TOKEN_ID, {
                      value: PRICE,
                  })
                  // after buying nft, we need to check to see that the player indeed own the nft
                  const newOwner = await basicNft.ownerOf(TOKEN_ID)
                  const deployerProceeds = await nftMarketplace.getProceeds(deployer)
                  assert(newOwner.toString() == user.address)
                  console.log(`proceeds : ${deployerProceeds.toString()}`)
                  assert(deployerProceeds.toString() == PRICE.toString())
              })

              it("Already listed", async function () {
                  basicNftAddress = await basicNft.getAddress()
                  await nftMarketplace.listItem(basicNftAddress, TOKEN_ID, PRICE)

                  const error = `NftMarketplace__AlreadyListed(${basicNftAddress}, ${TOKEN_ID})`
                  console.log(`error:${error}`)
                  await expect(
                      nftMarketplace.listItem(basicNftAddress, TOKEN_ID, PRICE),
                  ).to.be.revertedWith(error)
              })
          })

          describe("buyItem", async function () {
              it("tranfers the nft to the buyer and updates internal proceeds record", async function () {
                  // first of all, list the nft item
                  const basicNftAddress = await basicNft.getAddress()
                  await nftMarketplace.listItem(basicNftAddress, TOKEN_ID, PRICE)
                  const userConnectedNftMarketplace = nftMarketplaceContract.connect(user)
                  expect(
                      await userConnectedNftMarketplace.buyItem(basicNftAddress, TOKEN_ID, {
                          value: PRICE,
                      }),
                  ).to.emit("ItemBought")
                  // check the owner
                  const newOwner = await basicNft.ownerOf(TOKEN_ID)
                  assert(newOwner.toString() == user.address)

                  // check proceeds of the deployer
                  const deployerProceeds = await nftMarketplace.getProceeds(deployer.address)
                  console.log(`proceeds : ${deployerProceeds}`)
                  assert(deployerProceeds.toString() == PRICE.toString())
              })
          })

          describe("update listing", function () {
              it("reverts if not listed", async function () {
                  const basicNftAddress = await basicNft.getAddress()
                  //   nftMarketplace.listItem(basicNftAddress, TOKEN_ID, PRICE)

                  const error = `NftMarketplace__NotListed(${basicNftAddress}, ${TOKEN_ID})`
                  await expect(
                      nftMarketplace.updateListing(
                          basicNftAddress,
                          TOKEN_ID,
                          PRICE + ethers.parseEther("0.1"),
                      ),
                  ).to.be.revertedWith(error)
              })
          })

          describe("withdraw proceeds", function () {
              it("withdraw proceeds amount", async function () {
                  // first of all, list the nft item
                  const deployerBeforeEverythingBalance = await deployer.provider.getBalance(
                      deployer.address,
                  )
                  const basicNftAddress = await basicNft.getAddress()
                  await nftMarketplace.listItem(basicNftAddress, TOKEN_ID, PRICE)
                  const userConnectedNftMarketplace = nftMarketplaceContract.connect(user)
                  await userConnectedNftMarketplace.buyItem(basicNftAddress, TOKEN_ID, {
                      value: PRICE,
                  })
                  const deployerProceedsBefore = await nftMarketplace.getProceeds(deployer.address)
                  const deployerBeforeBalance = await deployer.provider.getBalance(deployer.address)
                  const txResponse = await nftMarketplace.withdrawProceeds()
                  const txReceipt = await txResponse.wait(1)
                  const deployerAfterBalance = await deployer.provider.getBalance(deployer.address)
                  const { gasUsed, gasPrice, effectiveGasPrice } = txReceipt
                  const gasCost = gasUsed * gasPrice
                  console.log(`gasCost: ${gasCost}`)
                  console.log(`gasPrice: ${gasPrice}`)
                  console.log(`effectiveGasPrice: ${effectiveGasPrice}`)
                  console.log(`proceedsBefore: ${deployerProceedsBefore}`)
                  console.log(`beforeEverything: ${deployerBeforeEverythingBalance.toString()}`)
                  console.log(`total1: ${deployerBeforeBalance.toString()}`)
                  console.log(`total2: ${(deployerAfterBalance + gasCost).toString()}`)
                  assert(
                      (deployerBeforeBalance + deployerProceedsBefore).toString() ==
                          (deployerAfterBalance + gasCost).toString(),
                  )
              })
          })
      })
