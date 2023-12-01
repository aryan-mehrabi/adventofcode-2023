const fs = require('node:fs');
const path = require('path');

const data = fs.readFileSync(
  path.join(process.cwd(), '/day1/input.txt'),
  'utf8'
);

const splitInput = (input: string) => input.split('\r\n');

const getNums = (str: string) => str.replace(/[^0-9]/g, '');

const decodeNums = (input: string[]): number[] => {
  return input.map(str => {
    const nums = getNums(str);
    const left = nums[0];
    const right = nums[nums.length - 1];
    return +(left + right);
  });
};

const sum = (input: number[]): number =>
  input.reduce((acc, curr) => acc + curr);

// PART TWO

const nums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const regex = new RegExp(`(${Object.keys(nums).join('|')})`);

const convertLetterDigitsToNum = (str: string): string => {
  let newStr = str.replace(regex, match =>
    nums[match as keyof typeof nums].toString()
  );

  const numbers = Object.keys(nums);
  let lastOccur = 0;
  let lastNum = '';
  numbers.forEach(num => {
    if (lastOccur < newStr.lastIndexOf(num)) {
      lastOccur = newStr.lastIndexOf(num);
      lastNum = num;
    }
  });

  if (lastNum) {
    newStr = newStr.replace(
      lastNum,
      nums[lastNum as keyof typeof nums].toString()
    );
  }

  return newStr;
};

// you may wanna use compose here :))
sum(decodeNums(splitInput(data).map(convertLetterDigitsToNum)));
