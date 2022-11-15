const { expect } = require("chai")
const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("unit tests", () => {
  let deployer, _foremanFee, _baseMonthlyFee

  beforeEach(async () => {
    ;[deployer] = await ethers.getSigners()
    //Deploy libraries
    const iterableMappingFactory = await ethers.getContractFactory(
      "IterableMapping",
      deployer
    )
    this.iterableMapping = await iterableMappingFactory.deploy()

    //Link libraries
    const chitFundFactory = await ethers.getContractFactory(
      "ChitFundManager",
      {
        libraries: { IterableMapping: this.iterableMapping.address },
      },
      deployer
    )

    _foremanFee = 5
    _baseMonthlyFee = toWei(5)
    this.chitFund = await chitFundFactory.deploy(_foremanFee, _baseMonthlyFee)
  })

  describe("Deploying Contract", async () => {
    it("Should deploy contracts and update contract variables correctly", async () => {
      //assertions
      expect(await this.chitFund.foremanFee()).to.equal(_foremanFee)
      expect(await this.chitFund.baseMonthlyFee()).to.equal(_baseMonthlyFee)
      expect(await this.chitFund.foreman()).to.equal(deployer.address)
    })
  })
})
