const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(
  path.join(process.cwd(), '/day3/input.txt'),
  'utf8'
);

const splitInput: string[] = data.split('\r\n');

const dataArr: string[][] = [];
splitInput.forEach(row => {
  dataArr.push(row.split(''));
});

const isDigit = (char: string) => {
  return /\d/.test(char);
};

const isSymbol = (char: string) =>
  !isDigit(char) && char !== '.' && char !== undefined;

const isPartNumber = (i: number, j: number) => {
  if (dataArr[i - 1] && isSymbol(dataArr[i - 1][j - 1])) return true;
  if (dataArr[i + 1] && isSymbol(dataArr[i + 1][j - 1])) return true;
  if (isSymbol(dataArr[i][j - 1])) return true;
  let y = j;
  while (isDigit(dataArr[i][y])) {
    if (dataArr[i - 1] && isSymbol(dataArr[i - 1][y])) return true;
    if (dataArr[i + 1] && isSymbol(dataArr[i + 1][y])) return true;
    y++;
  }
  if (dataArr[i - 1] && isSymbol(dataArr[i - 1][y])) return true;
  if (dataArr[i + 1] && isSymbol(dataArr[i + 1][y])) return true;
  if (isSymbol(dataArr[i][y])) return true;
  return false;
};

const partNums: string[] = [];
for (let i = 0; i < dataArr.length; i++) {
  const row = dataArr[i];
  for (let j = 0; j < row.length; j++) {
    const char = row[j];
    if (isDigit(char)) {
      const firstDigitIndex = j;
      for (let k = j; k <= row.length; k++) {
        if (!isDigit(dataArr[i][k])) {
          j = k;
          break;
        }
      }
      if (isPartNumber(i, firstDigitIndex)) {
        const num = dataArr[i].slice(firstDigitIndex, j).join('');
        partNums.push(num);
      }
    }
  }
}
console.log(partNums);
console.log(partNums.reduce((acc, curr) => acc + +curr, 0));
//asdddddd
