// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InscriptionContract {
    mapping(address => uint256) public inscriptionBalances;
    mapping(string => address) public inscriptionOwners;
    mapping(string => bool) public isDeployed; // Penanda untuk Inscription yang sudah dideploy

    event InscriptionDeployed(address indexed owner, string p, string op, string tick, uint256 amt);
    event InscriptionMinted(address indexed minter, string p, string op, string tick, uint256 amt);

    // Function to deploy Inscription
    function deployInscription(string memory p, string memory op, string memory tick, uint256 amt) external {
        require(!isDeployed[tick], "Inscription already deployed");
        
        inscriptionOwners[tick] = msg.sender;
        inscriptionBalances[msg.sender] += amt;
        isDeployed[tick] = true; // Tandai Inscription sebagai sudah dideploy
        emit InscriptionDeployed(msg.sender, p, op, tick, amt);
        // Perform other deployment logic here
    }

    // Function to mint Inscription
    function mintInscription(string memory p, string memory op, string memory tick, uint256 amt) external {
        require(inscriptionOwners[tick] != address(0), "Inscription not deployed");
        require(inscriptionBalances[inscriptionOwners[tick]] >= amt, "Insufficient balance");

        inscriptionBalances[inscriptionOwners[tick]] -= amt;
        inscriptionBalances[msg.sender] += amt;

        emit InscriptionMinted(msg.sender, p, op, tick, amt);
        // Perform other minting logic here
    }

    // Function to check Inscription balance
    function checkInscriptionBalance(string memory tick) external view returns (uint256) {
        return inscriptionBalances[inscriptionOwners[tick]];
    }

    // Function to check Inscription owner
    function checkInscriptionOwner(string memory tick) external view returns (address) {
        return inscriptionOwners[tick];
    }

    // Function to check Inscription balance after minting
    function checkMintedInscriptionBalance() external view returns (uint256) {
        return inscriptionBalances[msg.sender];
    }
}
