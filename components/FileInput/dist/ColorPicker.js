"use strict";
exports.__esModule = true;
var react_1 = require("react");
var WorkerDataProvider_1 = require("../BubbleChart/WorkerDataProvider");
var react_bootstrap_1 = require("react-bootstrap");
var ColorInput = function () {
    var _a = react_1.useContext(WorkerDataProvider_1.WorkerDataContext), workersData = _a.workersData, unmappedGroupings = _a.unmappedGroupings;
    return (react_1["default"].createElement(react_bootstrap_1.Form.Group, null,
        react_1["default"].createElement(react_bootstrap_1.Form.Label, null,
            "Pick a color, any color!",
            react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "color" }))));
};
exports["default"] = ColorInput;
