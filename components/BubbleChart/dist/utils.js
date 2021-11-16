"use strict";
exports.__esModule = true;
exports.getTextcolor = exports.getBubbleFillColor = void 0;
exports.getBubbleFillColor = function (isWorker, assessment, colorMap) {
    if (!isWorker) {
        return 'rgba(50,50,50, 0.2)';
    }
    else if (typeof assessment !== 'string') {
        return "hsl(" + assessment + ", 50%, 50%)";
    }
    else {
        return colorMap[assessment];
    }
};
exports.getTextcolor = function (isWorker, assessment) {
    if (!isWorker) {
        return 'black';
    }
    else if (typeof assessment !== 'string') {
        return "hsl(" + assessment + ", 100%, 100%)";
    }
    else {
        return ({
            '1': 'white',
            '2': 'white',
            '3': 'black',
            '4': 'white',
            '5': 'white',
            '9': 'black'
        }[assessment] || 'white');
    }
};
