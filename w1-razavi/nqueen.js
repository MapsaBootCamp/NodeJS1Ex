let solveNQueens = function(n) {
    let res = [];
    if (n === 1 || n >= 4) dfs(res, [], n, 0);
    return res;
  };
  
  let dfs = function (res, points, n, index) {
    for (let i = index; i < n; i++) {
      if (points.length !== i) return;
      for (let j = 0; j < n; j++) {
        if (isValid(points, [i, j])) {
          points.push([i, j]);
          dfs(res, points, n, i + 1);
          if (points.length === n) res.push(buildRes(points));
          points.pop();
        }
      }
    }
  };
  
  let buildRes = function (points) {
    let res = [];
    let n = points.length;
    for (let i = 0; i < n; i++) {
      res[i] = '';
      for (let j = 0; j < n; j++) {
        res[i] += (points[i][1] === j ? 'Q' : '.');
      }
    }
    return res;
  };
  
  let isValid = function (oldPoints, newPoint) {
    let len = oldPoints.length;
    for (let i = 0; i < len; i++) {
      if (oldPoints[i][0] === newPoint[0] || oldPoints[i][1] === newPoint[1]) return false;
      if (Math.abs((oldPoints[i][0] - newPoint[0]) / (oldPoints[i][1] - newPoint[1])) === 1) return false;
    }
    return true;
  };

  console.log(solveNQueens(8));