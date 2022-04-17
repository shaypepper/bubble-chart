'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
exports.__esModule = true
var react_1 = require('react')
var react_bootstrap_1 = require('react-bootstrap')
var WorkerDataProvider_1 = require('../BubbleChart/WorkerDataProvider')
var dataFormattingReducer_1 = require('../ChartCreater/data/dataFormattingReducer')
var MapColumns = function () {
  var _a = react_1.useContext(WorkerDataProvider_1.WorkerDataContext),
    columns = _a.columns,
    workersData = _a.workersData,
    dispatch = _a.dispatch,
    unmappedGroupings = _a.unmappedGroupings
  var _b = react_1.useState({
      name: undefined,
      grouping: undefined,
      colorBasis: undefined,
    }),
    tempColumnMap = _b[0],
    setTempColumnMap = _b[1]
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    Object.entries(tempColumnMap).map(function (_a) {
      var key = _a[0],
        label = _a[1]
      return react_1['default'].createElement(
        react_bootstrap_1.Form.Group,
        { key: key },
        react_1['default'].createElement(
          react_bootstrap_1.Form.Label,
          null,
          "Which column should be used for the workers' ",
          key,
          '?',
          react_1['default'].createElement(
            react_bootstrap_1.Dropdown,
            {
              role: 'select',
              onSelect: function (eventKey, event) {
                setTempColumnMap(function (currentTempColumnMap) {
                  var _a
                  return __assign(
                    __assign({}, currentTempColumnMap),
                    ((_a = {}), (_a[key] = eventKey), _a)
                  )
                })
              },
            },
            react_1['default'].createElement(
              react_bootstrap_1.Dropdown.Toggle,
              { variant: 'success', id: 'dropdown-basic' },
              label
            ),
            react_1['default'].createElement(
              react_bootstrap_1.Dropdown.Menu,
              { role: 'select' },
              (columns || []).map(function (col) {
                return react_1['default'].createElement(
                  react_bootstrap_1.Dropdown.Item,
                  { key: col, eventKey: col, as: react_bootstrap_1.Button },
                  col
                )
              })
            )
          )
        )
      )
    }),
    react_1['default'].createElement(
      react_bootstrap_1.Button,
      {
        onClick: function () {
          dispatch({
            type: dataFormattingReducer_1.FormatAction.SET_COLUMN_MAP,
            columnMap: tempColumnMap,
          })
        },
      },
      'Apply'
    )
  )
}
exports['default'] = MapColumns
