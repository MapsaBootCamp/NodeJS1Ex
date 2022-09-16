var n = 4;
var faseleh = [[0, 6, 20, 20],
    [6, 0, 20, 20],
    [20, 20, 0, 12],
    [20, 20, 12, 0]];
var result = findCableLength(n, faseleh);
console.log(result);
function findCableLength(n, faseleh) {
    var cableLengthTotal = 0;
  
    var longerLength = -Infinity;
    for (var i = 0; i < n; i++) {
       
        var shorterlength = Infinity;
     
        for (var j = i + 1; j < n; j++) {
            if (faseleh[i][j] < shorterlength && faseleh[i][j] !== longerLength) {
                shorterlength = faseleh[i][j];
            }
            if (faseleh[i][j] > longerLength) {
                longerLength = faseleh[i][j];
            }
        }
        if (shorterlength !== Infinity) {
        
            cableLengthTotal += shorterlength / 2;
        }
    }
    cableLengthTotal += longerLength;
    return cableLengthTotal;
}