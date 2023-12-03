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
console.log(partNums);
console.log(partNums.reduce(function (acc, curr) { return acc + +curr; }, 0));
//asdddddd
