const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(
  path.join(process.cwd(), '/day2/input.txt'),
  'utf8'
);

const splitInput = (input: string) => input.split('\r\n');

const createGame = (game: string): [string, Game] => {
  const [gameId, gameData] = game.split(': ');
  const id = gameId.replace('Game ', '');
  const sets: Game = gameData.split('; ').map(curr => {
    const cubes: GameSet = Object.fromEntries(
      curr.split(', ').map(cube =>
        cube
          .split(' ')
          .reverse()
          .map((numCubes, i) => (i === 1 ? +numCubes : numCubes))
      )
    );
    return cubes;
  }, []);
  return [id, sets];
};

// const games = {
//   1: [
//     {
//       blue: 3,
//       red: 4,
//     },
//     {
//       red: 1,
//       green: 2,
//       blue: 6,
//     },
//     {
//       green: 2,
//     },
//   ],
//   2: [
//     {
//       blue: 1,
//     },
//   ],
// };

let games: Games = {};
type Type = [string, string];
splitInput(data).forEach(game => {
  const [id, sets]: [string, Game] = createGame(game);
  games[id] = sets;
});

type GameSet = {
  blue?: number;
  green?: number;
  red?: number;
};

type Game = GameSet[];

type Games = {
  [key: string]: Game;
};

const cubeLimits = {
  red: 12,
  green: 13,
  blue: 14,
};

const possibleGame = () => {
  let idSum = 0;
  for (const id in games) {
    if (Object.prototype.hasOwnProperty.call(games, id)) {
      const game = games[id];
      const overLimit = game.some(set => {
        if (
          (set.blue || 0) > cubeLimits.blue ||
          (set.green || 0) > cubeLimits.green ||
          (set.red || 0) > cubeLimits.red
        ) {
          return true;
        }
        return false;
      });
      if (!overLimit) {
        idSum = idSum + +id;
      }
    }
  }
  return idSum;
};

const fewestCubes = (game: Game) => {
  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  game.forEach(({ green, red, blue }) => {
    if (green && green > cubes.green) cubes.green = green;
    if (blue && blue > cubes.blue) cubes.blue = blue;
    if (red && red > cubes.red) cubes.red = red;
  });

  return cubes;
};

const sumOfPowers = Object.values(games)
  .map(fewestCubes)
  .map(({ red, green, blue }) => red * green * blue)
  .reduce((acc, curr) => acc + curr);

console.log(sumOfPowers);
