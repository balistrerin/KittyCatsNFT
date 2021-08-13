const KittyCat = artifacts.require('./KittyCat.sol')

require('chai')
	.use(require('chai-as-promised'))
	.should()

	contract('KittyCat',(accounts) => {
		let contract

		before(async () => {
			contract = await KittyCat.deployed()
		})

		describe('deployment', async() => {
			it('deploys successfully', async () => {

				const address = contract.address
				console.log(address)
				assert.notEqual(address, '')
				assert.notEqual(address, 0X0)
				assert.notEqual(address, null)
				assert.notEqual(address, undefined)

			})
			it('has a name', async () => {
				const name = await contract.name()
				assert.equal(name, 'KittyCat')
			
			})
			it('has a symbol', async () => {
				const symbol = await contract.symbol()
				assert.equal(symbol, 'CAT')
			
			})

		})

		describe('minting', async() => {

			it('creates a new token', async() => {
				//const result = await contract.mint('Kelsey')
				//const totalSupply = await contract.totalSupply()
				//assert.equal(totalSupply, 1)
				//console.log(result)
			})

		}) 

		describe('indexing', async() => {

			it('list cat names', async() => {
				await contract.mint('Kelsey')
				await contract.mint('Goober')
				await contract.mint('Bruce')
			})

		}) 


	})