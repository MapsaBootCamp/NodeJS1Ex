var n = 4;
var distance = [[0, 6, 20, 20],
    [6, 0, 20, 20],
    [20, 20, 0, 12],
    [20, 20, 12, 0]];
var result = findCableLength(n, distance);
console.log(result);
function findCableLength(n, distance) {
    var cableLengthTotal = 0;
    //longer length belongs two servers with the greatest distance
    var longerLength = -Infinity;
    for (var i = 0; i < n; i++) {
        //shorter length belongs to two servers which seprated by a switch
        var shorterlength = Infinity;
        //just itrate in symmetry section for reduce process 
        for (var j = i + 1; j < n; j++) {
            if (distance[i][j] < shorterlength && distance[i][j] !== longerLength) {
                shorterlength = distance[i][j];
            }
            if (distance[i][j] > longerLength) {
                longerLength = distance[i][j];
            }
        }
        if (shorterlength !== Infinity) {
            // every two servers which are connected with a switch have
            //a same distance from it that is 1/2
            cableLengthTotal += shorterlength / 2;
        }
    }
    cableLengthTotal += longerLength;
    return cableLengthTotal;
}
