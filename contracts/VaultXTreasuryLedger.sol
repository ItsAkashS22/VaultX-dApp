// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title VaultX Treasury Ledger
/// @notice Governance-facing treasury accounting records without holding funds
contract VaultXTreasuryLedger is Ownable {
    /// @notice Treasury allocation record
    struct AllocationRecord {
        string category;
        uint256 amount;
        string referenceURI;
        bytes32 referenceHash;
        uint256 createdAt;
        bool active;
    }

    /// @notice Allocation records stored on-chain for governance transparency
    AllocationRecord[] public allocationRecords;

    /// @notice Emitted when a new allocation record is created
    /// @param recordId Index of the created record
    /// @param category Allocation category
    /// @param amount Allocation amount
    /// @param referenceHash Hash of the off-chain reference document
    event AllocationRecordCreated(
        uint256 indexed recordId,
        string category,
        uint256 amount,
        bytes32 referenceHash
    );

    /// @notice Emitted when an allocation record's active status is updated
    /// @param recordId Index of the updated record
    /// @param active New active status
    event AllocationRecordStatusUpdated(
        uint256 indexed recordId,
        bool active
    );

    /// @notice Creates a new treasury allocation record
    /// @param category Treasury allocation category
    /// @param amount Allocation amount
    /// @param referenceURI Off-chain document URI
    /// @param referenceHash Hash of referenced document
    /// @return recordId The newly created record index
    function createAllocationRecord(
        string calldata category,
        uint256 amount,
        string calldata referenceURI,
        bytes32 referenceHash
    ) external onlyOwner returns (uint256 recordId) {
        require(bytes(category).length > 0, "Category required");
        require(amount > 0, "Invalid amount");

        recordId = allocationRecords.length;
        allocationRecords.push(
            AllocationRecord({
                category: category,
                amount: amount,
                referenceURI: referenceURI,
                referenceHash: referenceHash,
                createdAt: block.timestamp,
                active: true
            })
        );

        emit AllocationRecordCreated(recordId, category, amount, referenceHash);
    }

    /// @notice Updates the active status of an allocation record
    /// @param recordId Index of the record to update
    /// @param active New active status
    function updateAllocationStatus(
        uint256 recordId,
        bool active
    ) external onlyOwner {
        require(recordId < allocationRecords.length, "Record does not exist");

        AllocationRecord storage record = allocationRecords[recordId];
        if (record.active != active) {
            record.active = active;
        }

        emit AllocationRecordStatusUpdated(recordId, active);
    }

    /// @notice Returns the total number of allocation records
    /// @return count Number of allocation records
    function getAllocationRecordCount() external view returns (uint256 count) {
        return allocationRecords.length;
    }

    /// @notice Returns details for a given allocation record
    /// @param recordId Index of the allocation record
    /// @return category Allocation category
    /// @return amount Allocation amount
    /// @return referenceURI Off-chain document URI
    /// @return referenceHash Hash of referenced document
    /// @return createdAt Timestamp when the record was created
    /// @return active Active status of the record
    function getAllocationRecord(
        uint256 recordId
    ) external view returns (
        string memory category,
        uint256 amount,
        string memory referenceURI,
        bytes32 referenceHash,
        uint256 createdAt,
        bool active
    ) {
        require(recordId < allocationRecords.length, "Record does not exist");

        AllocationRecord storage record = allocationRecords[recordId];
        return (
            record.category,
            record.amount,
            record.referenceURI,
            record.referenceHash,
            record.createdAt,
            record.active
        );
    }
}
