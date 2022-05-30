// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Dority {
    struct Organisation {
        uint256 id;
        address owner;
        string ipfsHash;
        uint256 raised;
        uint256 needed;
        bool isFullfilled;
        uint256 timestamp;
    }

    struct Donors {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    uint256 public totalOrganisations = 0;

    // mapping of organisation id to organisation
    mapping(uint256 => Organisation) public organisations;

    // mapping of organisation id to Donors
    mapping(uint256 => Donors[]) public donors;

    // Events
    event OrganisationAdded(
        uint256 indexed id,
        address owner
    );

    event OrganisationUpdated(
        uint256 indexed id,
        address owner
    );

    event Donate(
        uint256 indexed id,
        address donor,
        uint256 amount,
        uint256 timestamp
    );

     // Modifier to check for validity of the id
    modifier isValidId(uint256 _id) {
        require(_id != 0 && _id <= totalOrganisations, "Invalid id");
        _;
    }

    // Modifier to check whether the organisation is fullfilled
    modifier isOrganisationFulfilled(uint256 _id) {
        require(!organisations[_id].isFullfilled, "Organisation is already fulfilled");
        _;
    }

    function createOrganisation(
        string memory _hash,
        uint256 _needed
    ) public{
        totalOrganisations = unsafe_inc(totalOrganisations);
        organisations[totalOrganisations] = Organisation({
            id: totalOrganisations,
            owner: msg.sender,
            ipfsHash: _hash,
            raised: 0,
            needed: _needed,
            isFullfilled: false,
            timestamp: block.timestamp
        });

        emit OrganisationAdded(totalOrganisations, msg.sender);
    }

    function updateOrganisation(
        uint256 _id,
        string memory _hash,
        uint256 _needed,
        bool _isFullfilled
    ) public isValidId(_id) {
        require(msg.sender == organisations[_id].owner, "You are not the owner of this organisation");

        organisations[_id].ipfsHash = _hash;
        organisations[_id].needed = _needed;
        organisations[_id].isFullfilled = _isFullfilled;
        emit OrganisationUpdated(_id, msg.sender);
    }

    function donate(uint256 _id) public payable isValidId(_id) isOrganisationFulfilled(_id) {
        address owner = organisations[_id].owner;

        payable(owner).transfer(msg.value);

        organisations[_id].raised += msg.value;
        donors[_id].push(Donors({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit Donate(_id, msg.sender, msg.value, block.timestamp);

        if(organisations[_id].raised >= organisations[_id].needed){
            organisations[_id].isFullfilled = true;
        }
    }

    function getDonors(uint256 _id) public view isValidId(_id) returns(Donors[] memory){
        return donors[_id];
    }

    // Function for gas optimization
    function unsafe_inc(uint256 x) private pure returns (uint256) {
        unchecked { return x + 1; }
    }
}