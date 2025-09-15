// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RewardClaimer is Ownable {
    uint256 public claimInterval; // in seconds

    // Allowed ERC20 tokens
    mapping(address => bool) public allowedTokens;

    // Token => reward amount
    mapping(address => uint256) public rewardAmounts;

    // User => Token => Last claimed timestamp
    mapping(address => mapping(address => uint256)) public lastClaimed;

    event RewardClaimed(address indexed user, address indexed token, uint256 amount);
    event RewardAmountUpdated(address indexed token, uint256 newAmount);
    event ClaimIntervalUpdated(uint256 newInterval);
    event TokensWithdrawn(address indexed token, address to, uint256 amount);
    event TokensDeposited(address indexed token, address from, uint256 amount);
    event TokenAllowed(address indexed token, bool status);

    constructor(uint256 _claimIntervalSeconds) Ownable(msg.sender) {
        claimInterval = _claimIntervalSeconds;
    }

    // ========== CLAIM ==========

    function claim(address token) external {
        require(allowedTokens[token], "Token not allowed");

        uint256 rewardAmount = rewardAmounts[token];

        require(
            block.timestamp >= lastClaimed[msg.sender][token] + claimInterval,
            "Reward not ready yet"
        );

        require(
            IERC20(token).balanceOf(address(this)) >= rewardAmount,
            "Insufficient contract balance"
        );

        lastClaimed[msg.sender][token] = block.timestamp;
        IERC20(token).transfer(msg.sender, rewardAmount);

        emit RewardClaimed(msg.sender, token, rewardAmount);
    }

    // ========== ADMIN FUNCTIONS ==========

    function setRewardAmount(address token, uint256 _newAmount) external onlyOwner {
        require(allowedTokens[token], "Token not allowed");
        rewardAmounts[token] = _newAmount;
        emit RewardAmountUpdated(token, _newAmount);
    }

    function setClaimInterval(uint256 _newInterval) external onlyOwner {
        claimInterval = _newInterval;
        emit ClaimIntervalUpdated(_newInterval);
    }

    function setAllowedToken(address token, bool allowed) external onlyOwner {
        allowedTokens[token] = allowed;
        emit TokenAllowed(token, allowed);
    }

    function withdrawTokens(address token, uint256 amount, address to) external onlyOwner {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient balance");
        IERC20(token).transfer(to, amount);
        emit TokensWithdrawn(token, to, amount);
    }

    // ========== USER DEPOSIT ==========

    function depositTokens(address token, uint256 amount) external {
        require(allowedTokens[token], "Token not allowed");
        require(amount > 0, "Amount must be greater than 0");

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        emit TokensDeposited(token, msg.sender, amount);
    }

    // ========== VIEW FUNCTIONS ==========

    function nextClaimTimeFor(address user, address token) external view returns (uint256) {
        return lastClaimed[user][token] + claimInterval;
    }

    function nextClaimTime(address token) external view returns (uint256) {
        return lastClaimed[msg.sender][token] + claimInterval;
    }

    function canClaim(address token) external view returns (bool) {
        return block.timestamp >= lastClaimed[msg.sender][token] + claimInterval;
    }

    function canClaimFor(address user, address token) external view returns (bool) {
        return block.timestamp >= lastClaimed[user][token] + claimInterval;
    }
}
