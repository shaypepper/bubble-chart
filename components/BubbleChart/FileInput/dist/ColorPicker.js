'use strict'
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j]
    return r
  }
exports.__esModule = true
var react_1 = require('react')
var react_bootstrap_1 = require('react-bootstrap')
var WorkerDataProvider_1 = require('../BubbleChart/WorkerDataProvider')
var dataFormattingReducer_1 = require('../ChartCreater/data/dataFormattingReducer')
var ColorPicker = function () {
  var _a = react_1.useContext(WorkerDataProvider_1.WorkerDataContext),
    workersData = _a.workersData,
    unmappedGroupings = _a.unmappedGroupings,
    columns = _a.columns,
    columnMap = _a.columnMap,
    dispatch = _a.dispatch
  var colorMap = react_1.useRef({})
  var uniqueValues = __spreadArrays(
    new Set(
      workersData === null || workersData === void 0
        ? void 0
        : workersData.map(function (w) {
            return w[
              (columnMap === null || columnMap === void 0
                ? void 0
                : columnMap.colorBasis) || ''
            ]
          })
    )
  ).sort(function (a, b) {
    return a < b ? -1 : 1
  })
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      react_bootstrap_1.Form.Group,
      null,
      'How would you like to map your values to colors?',
      uniqueValues.map(function (v) {
        return react_1['default'].createElement(
          react_bootstrap_1.InputGroup,
          { key: v },
          react_1['default'].createElement(
            react_bootstrap_1.InputGroup.Text,
            null,
            v
          ),
          react_1['default'].createElement(react_bootstrap_1.FormControl, {
            type: 'color',
            onBlur: function (e) {
              colorMap.current[v] = e.target.value
            },
          })
        )
      })
    ),
    react_1['default'].createElement(
      react_bootstrap_1.Button,
      {
        onClick: function () {
          dispatch({
            type: dataFormattingReducer_1.FormatAction.SET_COLORS,
            colorMap: colorMap.current,
          })
        },
      },
      'Apply'
    )
  )
}
exports['default'] = ColorPicker
