pragma solidity >= 0.6.0 <= 0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import './interfaces/IMedicalResult.sol';

contract MedicalResult is IMedicalResult, ERC721URIStorage{
    uint256 public nextTokenId = 1;

    mapping(address => uint256[]) public userTokenIds;

    constructor () public ERC721("Medical Result", "MR"){

    }

    function mint(address to, string memory result) override external{
        _safeMint(to, nextTokenId);
        userTokenIds[to].push(nextTokenId);
        _setResultURI(nextTokenId++, result);
    }

    function _setResultURI(uint256 tokenId, string memory result) internal {
        _setTokenURI(tokenId, result);
    }

    function resultData(uint256 tokenId, address patient) override external view returns(string memory){
        require(ownerOf(tokenId) == patient, "MedicalResult::Only the patient can see his result!");
        
        return tokenURI(tokenId);
    }

    function tokenIds(address patient) override external view returns(uint256[] memory){
        return userTokenIds[patient];
    }
}