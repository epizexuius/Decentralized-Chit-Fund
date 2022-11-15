//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./libraries/IterableMapping.sol";

contract ChitFundManager {
    //libraries
    using IterableMapping for IterableMapping.Map;

    //Variables
    address payable public foreman;
    uint256 public foremanFee;
    uint256 public baseMonthlyFee;

    //Mappings
    IterableMapping.Map private map;

    //Errors
    error PaymentNotMeetingRequirements();

    //Modifiers
    modifier valueIsGreaterThan(uint256 amount) {
        if (msg.value < amount) {
            revert PaymentNotMeetingRequirements();
        }
        _;
    }

    //Events
    event StrayEtherDetected(address sender, uint256 amount);

    constructor(uint256 _fee, uint256 _baseMonthlyFee) {
        foreman = payable(msg.sender);
        foremanFee = _fee;
        baseMonthlyFee = _baseMonthlyFee;
    }

    function enterFund() external payable valueIsGreaterThan(baseMonthlyFee) {
        map.set(msg.sender, baseMonthlyFee);
    }

    /// @dev Catch stray eth transfer calls
    receive() external payable {
        emit StrayEtherDetected(msg.sender, msg.value);
        payable(msg.sender).transfer(msg.value);
    }
}
