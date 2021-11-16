"use strict";
exports.__esModule = true;
var react_1 = require("react");
var tokens_1 = require("./tokens");
var d3_1 = require("d3");
var WorkerDataProvider_1 = require("./WorkerDataProvider");
var utils_1 = require("./utils");
// const legendSize = height * 0.001
// const strat = stratify<Worker>()
//   .id((d) => d?.[state.nameColumn || ''])
//   .parentId((d) => d?.[state.groupingColumn || ''])
var myZoom = d3_1.zoom().scaleExtent([1, 100]);
var defaultViewBox = "-" + tokens_1.margin + " -" + tokens_1.margin + " " + (tokens_1.height + tokens_1.margin * 2) + " " + (tokens_1.width + tokens_1.margin * 2);
var BubbleChart = function () {
    var _a = react_1.useState(defaultViewBox), viewBox = _a[0], setViewBox = _a[1];
    var textArcPaths = {};
    var bubbleChartSVG = react_1.useRef(null);
    react_1.useEffect(function () {
        if (bubbleChartSVG === null || bubbleChartSVG === void 0 ? void 0 : bubbleChartSVG.current) {
            d3_1.select(bubbleChartSVG.current).call(myZoom);
        }
    }, []);
    var _b = react_1.useContext(WorkerDataProvider_1.WorkerDataContext), stratifiedData = _b.stratifiedData, colorMap = _b.colorMap;
    var bubbleData = stratifiedData && stratifiedData
        ? d3_1.pack().padding(0.005)(stratifiedData).descendants()
        : [];
    textArcPaths =
        (bubbleData === null || bubbleData === void 0 ? void 0 : bubbleData.reduce(function (memo, d) {
            if (memo[d.r])
                return memo;
            var r = d.r * tokens_1.height;
            var groupingR = r;
            var workerR = r * 0.7;
            var getTextPath = function (R) {
                return "M 0," + R + " a " + R + "," + R + " 0 1,1 0," + -2 * R + " a " + R + "," + R + " 0 1,1 0," + 2 * R + " ";
            };
            memo[d.r] = {
                grouping: getTextPath(groupingR),
                worker: getTextPath(workerR)
            };
            return memo;
        }, {})) || [];
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("button", { onClick: function (e) {
                setViewBox(defaultViewBox);
                e.preventDefault();
            } }, "Reset zoom"),
        react_1["default"].createElement("svg", { viewBox: viewBox, xmlns: "http://www.w3.org/2000/svg", height: '100%', width: '100%', ref: bubbleChartSVG },
            react_1["default"].createElement("rect", { height: tokens_1.height + tokens_1.margin * 2, width: tokens_1.width + tokens_1.margin * 2, fill: "gainsboro", x: -tokens_1.margin, y: -tokens_1.margin }),
            Object.entries(textArcPaths).map(function (_a) {
                var r = _a[0], paths = _a[1];
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("path", { id: "worker-text-arc-" + r, d: paths.worker, fill: 'transparent' }),
                    react_1["default"].createElement("path", { id: "grouping-text-arc-" + r, d: paths.grouping, fill: 'transparent' })));
            }), bubbleData === null || bubbleData === void 0 ? void 0 :
            bubbleData.map(function (d, idx) {
                var isWorker = !d.children;
                var translation = {
                    x: (idx ? d.x : 0.5) * tokens_1.width,
                    y: (idx ? d.y : 0.5) * tokens_1.height
                };
                var r = d.r * tokens_1.height;
                return (react_1["default"].createElement("g", { key: d.id, className: 'leaf', transform: "translate(" + translation.x + "," + translation.y + ")", onClick: function () {
                        setViewBox(translation.x - r - 10 + " " + (translation.y - r - 10) + " " + (r * 2 + 20) + " " + (r * 2 + 20));
                    } },
                    react_1["default"].createElement("circle", { r: r, fill: utils_1.getBubbleFillColor(isWorker, d.data.Assessment, colorMap || {}), strokeWidth: isWorker ? 0 : 2, stroke: 'darkgray' }),
                    react_1["default"].createElement("text", null,
                        react_1["default"].createElement("textPath", { href: "#" + (isWorker ? 'worker' : 'grouping') + "-text-arc-" + d.r, fill: utils_1.getTextcolor(isWorker, d.data.Assessment, colorMap || {}), textAnchor: 'middle', startOffset: '50%', fontSize: isWorker
                                ? d.r * tokens_1.height * 0.333
                                : (d.r * tokens_1.height) / (15 - d.depth * 1.5) }, d.data.Name))));
            }))));
};
//   // + CREATE GRAPHICAL ELEMENTS
//   const circle = leaf
//       .append("circle")
//       .attr("r", d => d.r * height)
//       .attr('fill', getFillColor)
//       .attr("stroke-width", d => (6 - d.depth) * 0.2)
//       .attr("stroke", d => d.data[1].notes?.Assessment == "1" ? "white" : null)
//   // Write name to arc path
//   leaf.append("text")
//       .append("textPath")
//       .attr('href', d => `#arcpath-${d.data[0]}`)
//       .attr("font-size", d => isWorker(d) ?
//         d.r * height * 0.333 :
//         d.r * height / (15 - (d.depth * 1.5)))
//       .html((d) => d.data[0])
//       .attr("fill", getTextColor)
//       .attr('text-anchor', 'middle')
//       .attr('startOffset', '50%')
//   // Write assessment #
//   leaf.append("text")
//       .html(d => {
//         const assessment = +d.data[1].notes?.Assessment || '?';
//         return isWorker(d) ? assessment : "";
//       })
//       .attr("font-size", d => (d.r * height) * 0.41)
//       .attr("transform", d => `translate(${-0.5 * d.r * height} ${-0.2 * d.r * height})`)
//       .attr("fill", getTextColor)
//   // Write point person
//   leaf.append("text")
//       .html(d => {
//         if (!isWorker(d)) return "";
//         if (d.data[1].notes?.Assessment == 1) return 'Organizer';
//         const PP = d.data[1].notes?.['Point Person'].split(" ")[0] || "🤷🏻‍♀️";
//         return `PP: ${PP}`
//       })
//       .attr("font-size", d => (d.r * height) *0.2)
//       .attr("transform", d => `translate(${-0.85 * d.r * height} ${0.2 * d.r * height})`)
//       .attr("fill", getTextColor)
//   console.log("SVG", svg)
// }
// // we need to handle a user gesture to use 'open'
// document.getElementById("btn").onclick = (evt) => {
//   // const svg = document.querySelector("svg");
//   // convert to a valid XML source
//   const as_text = new XMLSerializer().serializeToString(svg.node());
//   // store in a Blob
//   const blob = new Blob([as_text], { type: "image/svg+xml" });
//   //const blob = new Blob([svg], { type: "image/svg+xml" });
//   // create an URI pointing to that blob
//   const url = URL.createObjectURL(blob);
//   const win = open(url);
//   // so the Garbage Collector can collect the blob
//   win.onload = (evt) => URL.revokeObjectURL(url);
//   win.print();
// };
//   const legend = svg.selectAll('g.legendRow')
//     .data(Object.keys(colors))
//     .join('g')
//     .attr('class', 'legendRow')
//     .attr("transform", (d, idx) => `translate(${legendSize},${idx * legendSize * 12})`)
//     legend.append('circle')
//       .attr('r', legendSize * 5)
//       .attr('fill', d => colors[d])
//       .attr('stroke', d => colors[d] == "white" ? "black" : "none")
//     legend.append('text')
//       .attr('font-size', legendSize * 10)
//       .attr('x', legendSize * 10)
//       .attr('y', (d, idx) => legendSize * 3)
//       .html(d => d)
exports["default"] = BubbleChart;
