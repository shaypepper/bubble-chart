'use strict';

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__esModule = true;
exports.WorkerDataContext = void 0;

var react_1 = require('react');

var d3_1 = require('d3');

var dataFormattingReducer_1 = require('../ChartCreater/dataFormattingReducer');

exports.WorkerDataContext = react_1.createContext({
  convertWorkerCsv: function convertWorkerCsv(files) {
    return files && undefined;
  },
  convertGroupingCsv: function convertGroupingCsv(files) {
    return files && undefined;
  },
  columnMap: {}
});

var WorkerDataProvider = function WorkerDataProvider(_a) {
  var children = _a.children;

  var _b = react_1.useState(),
      workerHeirarchy = _b[0],
      setWorkerHeirarchy = _b[1];

  var _c = react_1.useState([]),
      bubbleData = _c[0],
      setBubbleData = _c[1];

  var _d = react_1.useReducer(dataFormattingReducer_1['default'], {
    columnMap: {}
  }),
      state = _d[0],
      dispatch = _d[1];

  console.log(state, dispatch);

  var _e = react_1.useState([]),
      workerData = _e[0],
      setWorkerData = _e[1];

  var workerSet = react_1.useRef(new Set());

  var convertCsv = function convertCsv(action) {
    return function (files) {
      var reader = new FileReader();
      var file = files[0];

      if (file != null && file.size > 0) {
        var t = reader.readAsText(file);
      }

      reader.addEventListener('loadend', function () {
        if (typeof reader.result !== 'string') return;
        var parsedWorkerData = d3_1.csvParse(reader.result, d3_1.autoType);
        console.log({
          parsedWorkerData: parsedWorkerData
        });
        dispatch({
          type: action,
          parsedData: parsedWorkerData
        });
      });
    };
  };

  return react_1['default'].createElement(exports.WorkerDataContext.Provider, {
    value: __assign(__assign({
      convertWorkerCsv: convertCsv(dataFormattingReducer_1.FormatAction.UPLOAD_WORKERS_CSV),
      convertGroupingCsv: convertCsv(dataFormattingReducer_1.FormatAction.UPLOAD_GROUPINGS_CSV)
    }, state), {
      dispatch: dispatch
    })
  }, ' ', children);
};

exports['default'] = WorkerDataProvider; // const strat = stratify<Worker>()
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