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
// console.log(partNums);
// console.log(partNums.reduce((acc, curr) => acc + +curr, 0));

/* ---- PART TWO ---- */

const getNum = (i: number, j: number): number => {
  let num = dataArr[i][j];
  let y = j + 1;
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

const gears = (i: number, j: number) => {
  const grid = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const partNums = [];
  const checked = Array(9).fill(false);
  checked[4] = null;
  grid.forEach(([x, y], index) => {
    if (dataArr[i + x] !== undefined && isDigit(dataArr[i + x][j + y])) {
      if (index >= 4) {
        checked[index + 1] = true;
      } else {
        checked[index] = true;
      }
    }
  });
  let num = 0;
  checked.forEach((isNum, index) => {
    if (index === 3 || index === 5) {
      num = 0;
    }
    if (!isNum) {
      num = 0;
      return;
    }
    if (!num) {
      const [x, y] = grid[index - (index > 4 ? 1 : 0)];
      num = getNum(i + x, j + y);
      partNums.push(num);
    }
  });
  return partNums;
};

const sumGearRatios = () => {
  let sum = 0;
  for (let i = 0; i < dataArr.length; i++) {
    const row = dataArr[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === '*') {
        const gear = gears(i, j);
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
const res = sumGearRatios();
console.log(res);
