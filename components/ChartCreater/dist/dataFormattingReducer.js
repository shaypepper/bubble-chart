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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.FormatAction = exports.Steps = void 0;
var d3_1 = require("d3");
var s = function (v) { return "" + v; };
var StandardColumn;
(function (StandardColumn) {
    StandardColumn["NAME"] = "name";
    StandardColumn["grouping"] = "grouping";
    StandardColumn["ASSESSMENT"] = "assessment";
})(StandardColumn || (StandardColumn = {}));
var Steps;
(function (Steps) {
    Steps[Steps["UPLOAD_WORKERS"] = 1] = "UPLOAD_WORKERS";
    Steps[Steps["CHOOSE_COLUMNS"] = 2] = "CHOOSE_COLUMNS";
    Steps[Steps["UPLOAD_GROUPINGS"] = 3] = "UPLOAD_GROUPINGS";
    Steps[Steps["CHOOSE_COLOR_SCHEME"] = 4] = "CHOOSE_COLOR_SCHEME";
    Steps[Steps["DRAW"] = 5] = "DRAW";
})(Steps = exports.Steps || (exports.Steps = {}));
var FormatAction;
(function (FormatAction) {
    FormatAction["UPLOAD_WORKERS_CSV"] = "uploadWorkers";
    FormatAction["SET_COLUMN_MAP"] = "setColumnMap";
    FormatAction["SELECT_NAME_FIELD"] = "selectNameField";
    FormatAction["SELECT_grouping_FIELD"] = "selectgroupingField";
    FormatAction["UPLOAD_GROUPINGS_CSV"] = "uploadGroupings";
    FormatAction["STRATIFY_DATA"] = "stratifyData";
})(FormatAction = exports.FormatAction || (exports.FormatAction = {}));
var dataFormattingReducer = function (state, action) {
    console.log('dispatch', state, action);
    switch (action.type) {
        case FormatAction.UPLOAD_WORKERS_CSV:
            return uploadWorkers(state, action.parsedData);
        case FormatAction.SET_COLUMN_MAP:
            return createColumnMap(state, action.columnMap);
        case FormatAction.UPLOAD_GROUPINGS_CSV:
            return uploadGroupings(state, action.parsedData);
        case FormatAction.STRATIFY_DATA:
            return stratifyData(state);
        default:
            return state;
    }
};
exports["default"] = dataFormattingReducer;
function uploadWorkers(state, parsedData) {
    if (!parsedData.length) {
        return state;
    }
    return __assign(__assign({}, state), { workersData: parsedData, columns: parsedData.columns, currentStep: Steps.CHOOSE_COLUMNS });
}
function uploadGroupings(prevState, parsedData) {
    var nameKey = prevState.columnMap.name || '';
    var groupingKey = prevState.columnMap.grouping || '';
    var unmappedGroupings = new Set(prevState.unmappedGroupings);
    var newAllPeople = new Set(prevState.allPeople);
    parsedData.forEach(function (grouping) {
        var groupingName = s(grouping[nameKey]);
        if (unmappedGroupings.has(groupingName)) {
            unmappedGroupings["delete"](groupingName);
        }
        if (!unmappedGroupings.has(groupingName)) {
            unmappedGroupings["delete"](groupingName);
        }
        newAllPeople.add(groupingName);
    });
    return __assign(__assign({}, prevState), { groupingsData: parsedData, unmappedGroupings: unmappedGroupings, allPeople: newAllPeople, currentStep: Steps.CHOOSE_COLOR_SCHEME });
}
function createColumnMap(state, columnMap) {
    var _a, _b, _c, _d;
    (_a = state.workersData) === null || _a === void 0 ? void 0 : _a.forEach(function (worker) {
        Object.entries(columnMap).forEach(function (_a) {
            var key = _a[0], mappedKey = _a[1];
            worker[key] = worker[mappedKey];
        });
    });
    var nameKey = columnMap.name || '';
    var groupingKey = columnMap.grouping || '';
    var colorBasis = columnMap.colorBasis || '';
    var workerNameList = new Set();
    (_b = state === null || state === void 0 ? void 0 : state.workersData) === null || _b === void 0 ? void 0 : _b.forEach(function (worker) {
        workerNameList.add(s(worker[nameKey]));
    });
    var unmappedGroupings = new Set();
    (_c = state.workersData) === null || _c === void 0 ? void 0 : _c.forEach(function (worker) {
        var workerGroup = s(worker[groupingKey]);
        if (!workerNameList.has(workerGroup)) {
            unmappedGroupings.add(workerGroup);
        }
    });
    var colorValueSet = new Set((_d = state.workersData) === null || _d === void 0 ? void 0 : _d.map(function (worker) { return worker[colorBasis]; }));
    return __assign(__assign({}, state), { workersData: state.workersData, unmappedGroupings: unmappedGroupings, allPeople: workerNameList, columnMap: columnMap, currentStep: Steps.UPLOAD_GROUPINGS });
}
function stratifyData(state) {
    var strat = d3_1.stratify()
        .id(function (d) { return "" + (d === null || d === void 0 ? void 0 : d[state.columnMap.name || '']); })
        .parentId(function (d) { return "" + (d === null || d === void 0 ? void 0 : d[state.columnMap.grouping || '']); });
    if (!state.workersData || !state.groupingsData) {
        return state;
    }
    var stratifiedData = strat(__spreadArrays(state.workersData, state.groupingsData))
        .sum(function () { return 1; })
        .sort(function (a, b) { return ((b === null || b === void 0 ? void 0 : b.value) || 0) - ((a === null || a === void 0 ? void 0 : a.value) || 0); });
    return __assign(__assign({}, state), { stratifiedData: stratifiedData });
}
