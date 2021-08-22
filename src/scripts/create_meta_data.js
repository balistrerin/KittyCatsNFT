const KittyCat = artifacts.require('./KittyCat.sol')
const fs = require('fs')

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Cuteness",
            "value": 0
        }
    ]
}
module.exports = async callback => {
    const kitty = await KittyCat.deployed()
    length = await kitty.getNumberOfCats()
    index = 0
    while (index < length) {
        console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
        let catMetadata = metadataTemple
        let catName = await kitty.kitties(index)
        index++
        catMetadata['name'] = catName
        if (fs.existsSync('../metadata/' + catMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
            console.log('test')
            continue
        }
        catMetadata['description'] = 'One of the cutest cats in the world!'
        catMetadata['image'] = 'https://anterrisbucket.s3.amazonaws.com/kitty.jpeg'
        catMetadata['attributes'][0]['value'] = 100
        filename = '../metadata/' + catMetadata['name'].toLowerCase().replace(/\s/g, '-')
        let data = JSON.stringify(catMetadata)
        fs.writeFileSync(filename + '.json', data)
    }
    callback(kitty)
}
