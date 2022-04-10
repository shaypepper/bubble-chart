"use strict";
exports.__esModule = true;
var react_1 = require("react");
var WorkerDataProvider_1 = require("../BubbleChart/WorkerDataProvider");
var react_bootstrap_1 = require("react-bootstrap");
var dataFormattingReducer_1 = require("../ChartCreater/data/dataFormattingReducer");
var BubbleChart_1 = require("../BubbleChart");
var WorkersInput_1 = require("./WorkersInput");
var GroupingsInput_1 = require("./GroupingsInput");
var ColorPicker_1 = require("./ColorPicker");
var MapColumns_1 = require("./MapColumns");
var FileInput = function () {
    var _a;
    var _b = react_1.useContext(WorkerDataProvider_1.WorkerDataContext), dispatch = _b.dispatch, unmappedGroupings = _b.unmappedGroupings, stratifiedData = _b.stratifiedData, currentStep = _b.currentStep;
    return (react_1["default"].createElement(react_bootstrap_1.Form, null,
        currentStep === dataFormattingReducer_1.Steps.UPLOAD_WORKERS && react_1["default"].createElement(WorkersInput_1["default"], null),
        currentStep === dataFormattingReducer_1.Steps.CHOOSE_COLUMNS && react_1["default"].createElement(MapColumns_1["default"], null),
        currentStep === dataFormattingReducer_1.Steps.UPLOAD_GROUPINGS && react_1["default"].createElement(GroupingsInput_1["default"], null),
        currentStep === dataFormattingReducer_1.Steps.CHOOSE_COLOR_SCHEME && react_1["default"].createElement(ColorPicker_1["default"], null),
        currentStep === dataFormattingReducer_1.Steps.DRAW && (react_1["default"].createElement(react_bootstrap_1.Button, { onClick: function () {
                dispatch({ type: dataFormattingReducer_1.FormatAction.STRATIFY_DATA });
            } }, "Draw!")),
        stratifiedData && react_1["default"].createElement(BubbleChart_1["default"], null), (_a = Array.from(unmappedGroupings || [])) === null || _a === void 0 ? void 0 :
        _a.map(function (m) { return (react_1["default"].createElement("p", { key: m }, m)); })));
};
exports["default"] = FileInput;
