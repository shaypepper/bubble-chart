"use strict";
exports.__esModule = true;
exports.getTextcolor = exports.getBubbleFillColor = void 0;
exports.getBubbleFillColor = function (isWorker, assessment) {
    if (!isWorker) {
        return 'rgba(50,50,50, 0.2)';
    }
    else if (typeof assessment !== 'string') {
        return "hsl(" + assessment + ", 50%, 50%)";
    }
    else {
        return {
            '1': 'maroon',
            '2': 'red',
            '3': 'pink',
            '4': 'grey',
            '5': 'grey',
            '9': 'white'
        }[assessment];
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
