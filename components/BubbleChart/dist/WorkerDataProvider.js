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
exports.WorkerDataContext = void 0;
var react_1 = require("react");
var d3_1 = require("d3");
var dataFormattingReducer_1 = require("../ChartCreater/dataFormattingReducer");
exports.WorkerDataContext = react_1.createContext({
    convertWorkerCsv: function (files) { return files && undefined; },
    convertGroupingCsv: function (files) { return files && undefined; },
    columnMap: {},
    dispatch: function () { return undefined; }
});
var WorkerDataProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useReducer(dataFormattingReducer_1["default"], { columnMap: {} }), state = _b[0], dispatch = _b[1];
    return (react_1["default"].createElement(exports.WorkerDataContext.Provider, { value: __assign(__assign({ convertWorkerCsv: convertCsv(dataFormattingReducer_1.FormatAction.UPLOAD_WORKERS_CSV, dispatch), convertGroupingCsv: convertCsv(dataFormattingReducer_1.FormatAction.UPLOAD_GROUPINGS_CSV, dispatch) }, state), { dispatch: dispatch }) },
        ' ',
        children));
};
exports["default"] = WorkerDataProvider;
function convertCsv(action, dispatch) {
    return function (files) {
        var reader = new FileReader();
        var file = files[0];
        if (file != null && file.size > 0) {
            reader.readAsText(file);
        }
        reader.addEventListener('loadend', function () {
            if (typeof reader.result !== 'string')
                return;
            var parsedWorkerData = d3_1.csvParse(reader.result);
            dispatch({
                type: action,
                parsedData: parsedWorkerData
            });
        });
    };
}
// const strat = stratify<Worker>()
// .id((d) => d?.[state.nameColumn || ''])
// .parentId((d) => d?.[state.groupingColumn || ''])
// setWorkerData(parsedWorkerData)
// console.log({ parsedWorkerData })
// console.log(parsedWorkerData.columns)
// const workerNameList = new Set()
// parsedWorkerData.forEach((worker) => {
//   workerNameList.add(worker.Name)
// })
// const unlistedgroupingList = new Set()
// parsedWorkerData.forEach((worker) => {
//   if (!workerNameList.has(worker.grouping)) {
//     unlistedgroupingList.add(worker.grouping)
//   }
// })
// console.log({ unlistedgroupingList })
// const stratifiedThing = strat(thing)
//   .sum(() => 1)
//   .sort((a, b) => (b?.value || 0) - (a?.value || 0))
// setWorkerHeirarchy(stratifiedThing)
