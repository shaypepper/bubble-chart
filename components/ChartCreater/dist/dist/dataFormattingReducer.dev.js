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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;
exports.FormatAction = void 0;

var d3_1 = require('d3');

var StandardColumn;

(function (StandardColumn) {
  StandardColumn['NAME'] = 'name';
  StandardColumn['grouping'] = 'grouping';
  StandardColumn['ASSESSMENT'] = 'assessment';
})(StandardColumn || (StandardColumn = {}));

var FormatAction;

(function (FormatAction) {
  FormatAction['UPLOAD_WORKERS_CSV'] = 'uploadWorkers';
  FormatAction['SET_COLUMN_MAP'] = 'seetColumnMap';
  FormatAction['SELECT_NAME_FIELD'] = 'selectNameField';
  FormatAction['SELECT_grouping_FIELD'] = 'selectgroupingField';
  FormatAction['UPLOAD_groupingS_CSV'] = 'uploadGroupings';
  FormatAction['STRATIFY_DATA'] = 'stratifyData';
})(FormatAction = exports.FormatAction || (exports.FormatAction = {}));

var dataFormattingReducer = function dataFormattingReducer(state, action) {
  console.log('dispatch', state, action);

  switch (action.type) {
    case FormatAction.UPLOAD_WORKERS_CSV:
      return uploadWorkers(state, action.parsedData);

    case FormatAction.SET_COLUMN_MAP:
      return createColumnMap(state, action.columnMap);

    case FormatAction.UPLOAD_groupingS_CSV:
      return uploadGroupings(state, action.parsedData);

    case FormatAction.STRATIFY_DATA:
      return stratifyData(state);

    default:
      return state;
  }
};

exports['default'] = dataFormattingReducer;

function uploadWorkers(state, parsedData) {
  return __assign(__assign({}, state), {
    workersData: parsedData,
    columns: parsedData.columns
  });
}

function uploadGroupings(state, parsedData) {
  var _a = state.columnMap,
      nameKey = _a.name,
      groupingKey = _a.grouping;
  var newUnmappedGroupingset = new Set(state.unmappedGroupings);
  var newAllPeople = new Set(state.allPeople);
  parsedData.forEach(function (grouping) {
    if (newUnmappedGroupingset.has(grouping[nameKey])) {
      newUnmappedGroupingset['delete'](grouping[nameKey]);
    }

    if (!newUnmappedGroupingset.has(grouping[nameKey])) {
      newUnmappedGroupingset['delete'](grouping[nameKey]);
    }

    newAllPeople.add(grouping[nameKey]);
  });
  return __assign(__assign({}, state), {
    groupingsData: parsedData,
    unmappedGroupings: newUnmappedGroupingset,
    allPeople: newAllPeople
  });
}

function createColumnMap(state, columnMap) {
  var _a, _b, _c;

  (_a = state.workersData) === null || _a === void 0 ? void 0 : _a.forEach(function (worker) {
    Object.entries(columnMap).forEach(function (_a) {
      var key = _a[0],
          mappedKey = _a[1];
      worker[key] = worker[mappedKey];
    });
  });
  var nameKey = columnMap.name;
  var groupingKey = columnMap.grouping;
  var workerNameList = new Set();
  (_b = state === null || state === void 0 ? void 0 : state.workersData) === null || _b === void 0 ? void 0 : _b.forEach(function (worker) {
    workerNameList.add(worker[nameKey]);
  });
  var unlistedGroupingset = new Set();
  (_c = state === null || state === void 0 ? void 0 : state.workersData) === null || _c === void 0 ? void 0 : _c.forEach(function (worker) {
    console.log(worker, groupingKey, workerNameList.has(worker[groupingKey]));

    if (!workerNameList.has(worker[groupingKey])) {
      unlistedGroupingset.add(worker[groupingKey]);
    }
  });
  return __assign(__assign({}, state), {
    workersData: state.workersData,
    unmappedGroupings: unlistedGroupingset,
    allPeople: workerNameList,
    columnMap: columnMap
  });
}

function stratifyData(state) {
  var strat = d3_1.stratify().id(function (d) {
    return d === null || d === void 0 ? void 0 : d[state.columnMap.name || ''];
  }).parentId(function (d) {
    return d === null || d === void 0 ? void 0 : d[state.columnMap.grouping || ''];
  });

  if (!state.workersData || !state.groupingsData) {
    return state;
  }

  var stratifiedData = strat(__spreadArrays(state.workersData, state.groupingsData)).sum(function () {
    return 1;
  }).sort(function (a, b) {
    return ((b === null || b === void 0 ? void 0 : b.value) || 0) - ((a === null || a === void 0 ? void 0 : a.value) || 0);
  });
  return __assign(__assign({}, state), {
    stratifiedData: stratifiedData
  });
}