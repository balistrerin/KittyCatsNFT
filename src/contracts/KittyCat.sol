pragma solidity ^0.5.0;


import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";


contract KittyCat is ERC721Full{


	string[] public kitties;
	string public NameFromId; 
	mapping(string => bool) nameExists;

	constructor() ERC721Full("KittyCats", "CAT") public {
    }

    function AdoptCat(string memory catName) public {

    	require(!nameExists[catName]);
    	//uint tokenId = kitties.push(catName);
    	kitties.push(catName);
		uint tokenId = kitties.length - 1;
    	_mint(msg.sender, tokenId);
    	nameExists[catName] = true;

    }

    function GetCatName(uint id) public returns(string memory) {
    	
        NameFromId = kitties[id];

    	return NameFromId;

    }
}