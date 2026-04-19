"use strict";

const requireUseClient = require("./rules/require-use-client");
const noSubTouchTargetSizes = require("./rules/no-sub-touch-target-sizes");

module.exports = {
  rules: {
    "require-use-client": requireUseClient,
    "no-sub-touch-target-sizes": noSubTouchTargetSizes,
  },
};
