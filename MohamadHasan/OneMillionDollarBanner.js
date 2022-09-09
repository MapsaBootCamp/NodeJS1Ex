function banner(a, b, n, m) {
  let row = a;
  let column = b;
  let rowCount = 0;
  let columnCount = 0;
  const rowSpace = n + 1;
  const columnSpace = m + 1;
  if (n !== 1) {
    while (row >= n) {
      rowCount++;
      row = row - rowSpace;
    }
  } else rowCount = row;
  if (m !== 1) {
    while (column >= m) {
      columnCount++;
      column = column - columnSpace;
    }
  } else columnCount = column;

  return columnCount * rowCount;
}

console.log(banner(10, 10, 2, 3));
