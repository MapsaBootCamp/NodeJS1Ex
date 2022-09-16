let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let cnt = 0;
let n;

let result = 0;
const inputParse = [];

rl.on('line', function (line) {
    if (cnt == 0) {
        n = parseInt(line);
        cnt++;
    }
    else {
        inputParse.push(line);
        if(inputParse.length == n){
            main();
        }
    }
})

function main(){

    for(let i=0;i<inputParse.length;i++){
        let item = inputParse[i].split(' ', 3);
        
        let sumM = parseInt(item[2]);  

        for(let j = i+1; j<inputParse.length;j++){
            let item2 = inputParse[j].split(' ', 3);
            if(!(item[0] < item2[0] && item[1] < item2[1])){
                sumM += parseInt(item2[2]);
            }
        }
        if(sumM>result)
        result=sumM;
    }
 
    console.log(result);

}