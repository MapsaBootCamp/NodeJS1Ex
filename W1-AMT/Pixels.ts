function countMinBanner(m: number, n: number, a: number, b: number): number {
  let i = 0;
  for (; m >= a; i++) {
    m = m - (a + a - 1);
  }
  let j = 0;
  for (; n >= b; j++) {
    n = n - (b + b - 1);
  }
  return i * j;
}

console.log(countMinBanner(5, 7, 2, 1));
