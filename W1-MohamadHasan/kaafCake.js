// Ba arze mazerat. In soaal bayad ba TypeScript zade mishod.
// Vali man chon hanooz tasalote kaafi nadashtam roo TS, ba JS zadam.

const cakesPrices = [1, 3, 4, 2];

function chooseCheapestCake(cakesPrices, k) {
  let intervals = [];
  let cakesPricesCopy = [...cakesPrices];
  if (k > 2) {
    intervals.push(cakesPricesCopy.slice(0, 1));
    intervals.push(cakesPricesCopy.slice(1, cakesPricesCopy.length - 1));
    intervals.push(cakesPricesCopy.slice(cakesPricesCopy.length - 1));
    return Math.min(...intervals.map((el) => Math.max(...el)));
  } else if (k === 2) {
    intervals.push(cakesPricesCopy.slice(0, 1));
    intervals.push(cakesPricesCopy.slice(1));
    return Math.min(...intervals.map((el) => Math.max(...el)));
  } else if (k === 1) {
    return Math.max(...cakesPrices);
  }
}

console.log(chooseCheapestCake(cakesPrices, 1));
