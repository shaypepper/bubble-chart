"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var WorkerDataProvider_1 = require("../BubbleChart/WorkerDataProvider");
var react_bootstrap_1 = require("react-bootstrap");
var dataFormattingReducer_1 = require("../ChartCreater/dataFormattingReducer");
var BubbleChart_1 = require("../BubbleChart");
var WorkersInput_1 = require("./WorkersInput");
var GroupingsInput_1 = require("./GroupingsInput");
var ColorPicker_1 = require("./ColorPicker");
var FileInput = function () {
    var _a;
    var _b = react_1.useContext(WorkerDataProvider_1.WorkerDataContext), convertGroupingCsv = _b.convertGroupingCsv, convertWorkerCsv = _b.convertWorkerCsv, columns = _b.columns, workersData = _b.workersData, columnMap = _b.columnMap, dispatch = _b.dispatch, unmappedGroupings = _b.unmappedGroupings, stratifiedData = _b.stratifiedData;
    console.log({ unmappedGroupings: unmappedGroupings, workersData: workersData });
    var outreachDataInputRef = react_1.useRef(null);
    var groupingListInputRef = react_1.useRef(null);
    var _c = react_1.useState({
        name: undefined,
        grouping: undefined
    }), tempColumnMap = _c[0], setTempColumnMap = _c[1];
    return (react_1["default"].createElement(react_bootstrap_1.Form, null,
        react_1["default"].createElement(ColorPicker_1["default"], null),
        !workersData && react_1["default"].createElement(WorkersInput_1["default"], null),
        workersData && !columnMap && (react_1["default"].createElement(react_bootstrap_1.Form.Group, null,
            Object.entries(tempColumnMap).map(function (_a) {
                var key = _a[0], label = _a[1];
                return (react_1["default"].createElement(react_1["default"].Fragment, { key: key },
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null,
                        "Which column should be used for the workers' ",
                        key,
                        "?",
                        react_1["default"].createElement(react_bootstrap_1.Dropdown, { role: "select", onSelect: function (eventKey, event) {
                                setTempColumnMap(function (currentTempColumnMap) {
                                    var _a;
                                    return (__assign(__assign({}, currentTempColumnMap), (_a = {}, _a[key] = eventKey, _a)));
                                });
                            } },
                            react_1["default"].createElement(react_bootstrap_1.Dropdown.Toggle, { variant: "success", id: "dropdown-basic" }, label),
                            react_1["default"].createElement(react_bootstrap_1.Dropdown.Menu, { role: "select" }, (columns || []).map(function (col) { return (react_1["default"].createElement(react_bootstrap_1.Dropdown.Item, { key: col, eventKey: col, as: react_bootstrap_1.Button }, col)); })))),
                    react_1["default"].createElement("br", null)));
            }),
            react_1["default"].createElement(react_bootstrap_1.Button, { onClick: function () {
                    dispatch({
                        type: dataFormattingReducer_1.FormatAction.SET_COLUMN_MAP,
                        columnMap: tempColumnMap
                    });
                } }, "Apply"))),
        !!(unmappedGroupings === null || unmappedGroupings === void 0 ? void 0 : unmappedGroupings.size) && react_1["default"].createElement(GroupingsInput_1["default"], null),
        !(unmappedGroupings === null || unmappedGroupings === void 0 ? void 0 : unmappedGroupings.size) && workersData && columnMap && (react_1["default"].createElement(react_bootstrap_1.Button, { onClick: function () {
                dispatch({ type: dataFormattingReducer_1.FormatAction.STRATIFY_DATA });
            } }, "Draw!")),
        stratifiedData && react_1["default"].createElement(BubbleChart_1["default"], null), (_a = Array.from(unmappedGroupings || [])) === null || _a === void 0 ? void 0 :
        _a.map(function (m) { return (react_1["default"].createElement("p", { key: m }, m)); })));
};
exports["default"] = FileInput;
