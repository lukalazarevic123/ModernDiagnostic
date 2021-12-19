pragma solidity >= 0.6.0 <= 0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface IMedicalResult is IERC721{

    function mint(address patient, string memory result) external;

    function resultData(uint256 tokenId, address patient) external view returns(string memory);
    function tokenIds(address patient) external view returns(uint256[] memory);
}