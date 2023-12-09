var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.join(process.cwd(), '/day3/input.txt'), 'utf8');
var splitInput = data.split('\r\n');
var dataArr = [];
splitInput.forEach(function (row) {
    dataArr.push(row.split(''));
});
var isDigit = function (char) {
    return /\d/.test(char);
};
var isSymbol = function (char) {
    return !isDigit(char) && char !== '.' && char !== undefined;
};
var isPartNumber = function (i, j) {
    if (dataArr[i - 1] && isSymbol(dataArr[i - 1][j - 1]))
        return true;
    if (dataArr[i + 1] && isSymbol(dataArr[i + 1][j - 1]))
        return true;
    if (isSymbol(dataArr[i][j - 1]))
        return true;
    var y = j;
    while (isDigit(dataArr[i][y])) {
        if (dataArr[i - 1] && isSymbol(dataArr[i - 1][y]))
            return true;
        if (dataArr[i + 1] && isSymbol(dataArr[i + 1][y]))
            return true;
        y++;
    }
    if (dataArr[i - 1] && isSymbol(dataArr[i - 1][y]))
        return true;
    if (dataArr[i + 1] && isSymbol(dataArr[i + 1][y]))
        return true;
    if (isSymbol(dataArr[i][y]))
        return true;
    return false;
};
var partNums = [];
for (var i = 0; i < dataArr.length; i++) {
    var row = dataArr[i];
    for (var j = 0; j < row.length; j++) {
        var char = row[j];
        if (isDigit(char)) {
            var firstDigitIndex = j;
            for (var k = j; k <= row.length; k++) {
                if (!isDigit(dataArr[i][k])) {
                    j = k;
                    break;
                }
            }
            if (isPartNumber(i, firstDigitIndex)) {
                var num = dataArr[i].slice(firstDigitIndex, j).join('');
                partNums.push(num);
            }
        }
    }
}
// console.log(partNums);
// console.log(partNums.reduce((acc, curr) => acc + +curr, 0));
/* ---- PART TWO ---- */
var getNum = function (i, j) {
    var num = dataArr[i][j];
    var y = j + 1;
    while (isDigit(dataArr[i][y])) {
        num = num + dataArr[i][y];
        y++;
    }
    y = j - 1;
    while (isDigit(dataArr[i][y])) {
        num = dataArr[i][y] + num;
        y--;
    }
    return +num;
};
var gears = function (i, j) {
    var grid = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    var partNums = [];
    var checked = Array(9).fill(false);
    checked[4] = null;
    grid.forEach(function (_a, index) {
        var x = _a[0], y = _a[1];
        if (dataArr[i + x] !== undefined && isDigit(dataArr[i + x][j + y])) {
            if (index >= 4) {
                checked[index + 1] = true;
            }
            else {
                checked[index] = true;
            }
        }
    });
    var num = 0;
    checked.forEach(function (isNum, index) {
        if (index === 3 || index === 5) {
            num = 0;
        }
        if (!isNum) {
            num = 0;
            return;
        }
        if (!num) {
            var _a = grid[index - (index > 4 ? 1 : 0)], x = _a[0], y = _a[1];
            num = getNum(i + x, j + y);
            partNums.push(num);
        }
    });
    return partNums;
};
var sumGearRatios = function () {
    var sum = 0;
    for (var i = 0; i < dataArr.length; i++) {
        var row = dataArr[i];
        for (var j = 0; j < row.length; j++) {
            var char = row[j];
            if (char === '*') {
                var gear = gears(i, j);
                if (gear.length === 2) {
                    console.log(gear);
                    sum = sum + gear[0] * gear[1];
                }
            }
        }
    }
    return sum;
};
// dhiddd
var res = sumGearRatios();
console.log(res);
