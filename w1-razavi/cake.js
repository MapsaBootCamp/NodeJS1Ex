var N = 3; 
var K = 2; 
var C = [3, 2, 3]; 
var resultMoney = minMoneyForBuyCake(N, K, C);
console.log(resultMoney);
function minMoneyForBuyCake(N, k, C) {
    if (k === 1) {
        var max = C[0];
        for (var i = 0; i < C.length; i++) {
            max = C[i] > max ? C[i] : max;
        }
        return max;
    }
    if (k === 2) {
        if (C[0] < C[C.length - 1])
            return C[0];
        else
            return C[C.length - 1];
    }
    if (k >= 3) {
        var min = C[0];
        for (var i = 0; i < C.length; i++) {
            min = C[i] < min ? C[i] : min;
        }
        return min;
    }
}