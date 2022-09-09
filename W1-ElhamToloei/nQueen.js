var solveNQueens = function(n) {
  var res = [];
  if (n === 1 || n >= 4) dfs(res, [], n, 0);
  return res;
};

var dfs = function (res, points, n, index) {
  for (var i = index; i < n; i++) {
    if (points.length !== i) return;
    for (var j = 0; j < n; j++) {
      if (isValid(points, [i, j])) {
        points.push([i, j]);
        dfs(res, points, n, i + 1);
        if (points.length === n) res.push(buildRes(points));
        points.pop();
      }
    }
  }
};

var buildRes = function (points) {
  var res = [];
  var n = points.length;
  for (var i = 0; i < n; i++) {
    res[i] = '';
    for (var j = 0; j < n; j++) {
      res[i] += (points[i][1] === j ? 'Q' : '.');
    }
  }
  return res;
};

var isValid = function (oldPoints, newPoint) {
  var len = oldPoints.length;
  for (var i = 0; i < len; i++) {
    if (oldPoints[i][0] === newPoint[0] || oldPoints[i][1] === newPoint[1]) return false;
    if (Math.abs((oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])) === 1) return false;
  }
  return true;
};

console.log(solveNQueens(2));



/////////////////////////////////////
// var iterations = 0

// var print_board = function (columns) {
//   for (let i = 0; i < columns.length; i++) {
//     for (let j = 0; j < columns.length; j++) {
//       process.stdout.write(columns[i] === j ? "Q " : "# ");
//     }
//     process.stdout.write("\n");
//   }
// };


// var has_conflict = function (columns) {
//   var len = columns.length, last = columns[len - 1], previous = len - 2

//   while (previous >= 0) {
//     if (columns[previous] === last) return true
//     if (last - (len - 1) === columns[previous] - previous) return true
//     if (last + (len - 1) === columns[previous] + previous) return true
//     previous--
//   }

//   return false
// }

// var place_next_queen = function (total, queens, columns) {
//   if (queens === 0) return columns
//   columns = columns || []

//   for (var column = 0; column < total; column++) {
//     columns.push(column)
//     iterations++
//     if (!has_conflict(columns) &&
//         place_next_queen(total, queens - 1, columns)) {
//       return columns
//     }
//     columns.pop(column)
//   }

//   return null
// }

// print_board(place_next_queen(4,2,[]))
// console.log('\niterations: ', iterations)


////////////////////////////////////
// countNQueensSolutions = function(n) {
//   return countNQueensHelper(
//     0,
//     new Array(n).fill(false),
//     new Array(2 * n - 1).fill(false),
//     new Array(2 * n - 1).fill(false)
//   );

//   function countNQueensHelper(numPlaced, qInCol, qInLDiag, qInRDiag) {
//     var n = qInCol.length;
//     if (numPlaced === n) return 1;

//     var r = numPlaced;
//     var nSols = 0;

//     // go through each column, testing if placement is valid
//     for (var c = 0; c < n; c++) {
//       var ld = c - r;
//       var rd = r + c;

//       // if current position is valid, recur
//       if (!qInCol[c] && !qInLDiag[ld] && !qInRDiag[rd]) {
//         (qInCol[c] = true), (qInLDiag[ld] = true), (qInRDiag[rd] = true);

//         nSols += countNQueensHelper(r + 1, qInCol, qInLDiag, qInRDiag);

//         (qInCol[c] = false), (qInLDiag[ld] = false), (qInRDiag[rd] = false);
//       }
//     }
//     return nSols;
//   }
// };

// console.log(countNQueensSolutions(4));