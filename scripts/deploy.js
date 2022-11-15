const { ethers } = require("hardhat")
const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

async function main() {
  //const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  //const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
  //const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

  //const lockedAmount = hre.ethers.utils.parseEther("1")

  //Deploy libraries
  const iterableMappingFactory = await ethers.getContractFactory(
    "IterableMapping"
  )
  const iterableMapping = await iterableMappingFactory.deploy()

  //Link libraries
  const chitFundFactory = await ethers.getContractFactory("ChitFundManager", {
    libraries: { IterableMapping: iterableMapping.address },
  })

  const foremanFee = 5
  const baseMonthlyFee = toWei(5)
  const chitFund = await chitFundFactory.deploy(foremanFee, baseMonthlyFee)

  console.log(await chitFund.foreman())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
