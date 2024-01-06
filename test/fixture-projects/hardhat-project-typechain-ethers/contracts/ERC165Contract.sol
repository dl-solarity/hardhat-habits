// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC1271} from "@openzeppelin/contracts/interfaces/IERC1271.sol";
import {IERC1967} from "@openzeppelin/contracts/interfaces/IERC1967.sol";
import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";
import {IERC5313} from "@openzeppelin/contracts/interfaces/IERC5313.sol";
import {IERC721Enumerable} from "@openzeppelin/contracts/interfaces/IERC721Enumerable.sol";

interface IERC20Custom is IERC20, IERC1271 {}

contract ERC165Contract is ERC165 {
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return
            interfaceId == type(IERC20).interfaceId ||
            interfaceId == type(IERC1967).interfaceId ||
            interfaceId == type(IERC5313).interfaceId ||
            interfaceId == type(IERC1271).interfaceId ||
            interfaceId == type(IERC4626).interfaceId ||
            interfaceId == type(IERC20Custom).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
