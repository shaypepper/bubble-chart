'use strict'
exports.__esModule = true
var react_1 = require('react')
var WorkerDataProvider_1 = require('../BubbleChart/WorkerDataProvider')
var react_bootstrap_1 = require('react-bootstrap')
var GroupingsInput = function () {
  var _a = react_1.useContext(WorkerDataProvider_1.WorkerDataContext),
    convertGroupingCsv = _a.convertGroupingCsv,
    unmappedGroupings = _a.unmappedGroupings
  var groupingListInputRef = react_1.useRef(null)
  var unmappedGroupingsArray = Array.from(unmappedGroupings || [])
  return react_1['default'].createElement(
    react_bootstrap_1.Form.Group,
    null,
    react_1['default'].createElement(
      react_bootstrap_1.Form.Label,
      { htmlFor: 'grouping-data' },
      'It seems that you are missing some grouping data. There are',
      ' ',
      unmappedGroupingsArray.length,
      " workers whose groupings haven't been loaded (Ex. ",
      unmappedGroupingsArray.slice(0, 2).join(', '),
      '...). Load your grouping data here:',
      react_1['default'].createElement(react_bootstrap_1.Form.Control, {
        className: 'form-control',
        ref: groupingListInputRef,
        type: 'file',
        name: 'outreach-data',
        accept: '.csv',
        onChange: function () {
          if (!groupingListInputRef.current) return
          var files = groupingListInputRef.current.files
          if (files) {
            convertGroupingCsv(files)
          }
        },
      })
    )
  )
}
exports['default'] = GroupingsInput
