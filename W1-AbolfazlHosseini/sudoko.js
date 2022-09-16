let sudoko = [
    [0,0,0,7,0,0,6,3,9],
    [6,9,0,0,0,0,2,0,0],
    [0,0,8,4,0,9,1,7,0],
    [2,0,0,6,0,0,0,9,0],
    [9,8,6,1,0,3,5,0,2],
    [7,5,0,0,8,0,0,0,6],
    [0,0,0,0,0,0,0,0,1],
    [5,7,0,8,0,6,0,0,0],
    [1,6,0,3,9,4,8,0,0]
]
let isDone = false
function putNumber(i, j, number) {
    sudoko[i][j]=number
}
function removeNumber(i, j) {
    sudoko[i][j]=0
}
function check(i,j,number) {
    for(let i2 = 0; i2<sudoko.length;i2++){
        if(sudoko[i2][j]==number && i2!=i){
            return false
        }
    }
    for(let j2 = 0; j2<sudoko.length;j2++){
        if(sudoko[i][j2]==number && j2!=j){
            return false
        }
    }
    const row = Math.floor(i/3)*3
    const column = Math.floor(j/3)*3
    for(let i2 = row;i2!=row+3;i2++){
        for(let j2 = column;j2!=column+3;j2++){
        if(sudoko[i2][j2]==number){
            if(i2!=i || j2!=j){
                return false
            }
        }
        }
    }
    return true
}
function solve(){
    for(let i = 0 ; i<sudoko.length ; i++){
        for (let j = 0 ; j<sudoko[i].length ; j++) {
            if(sudoko[i][j]==0){
                for(let k = 1;k<=9;k++){
                    if(check(i,j,k)){
                        putNumber(i,j,k)
                        solve()
                        if(!isDone){
                            removeNumber(i,j) 
                        } else{
                            return
                        }
                    } 
                    if(i==sudoko.length-1 && j==sudoko[i].length-1 &&  sudoko[i][j]!=0){
                        
                        isDone=true
                        return
                    }
                }
                if(sudoko[i][j]==0){
                    return
                }
            }else if(i==sudoko.length-1 && j==sudoko[i].length-1 ){
                isDone=true
                        return
            }
        }
    }
}
function printSudoko() {
    for (let row = 0;row<sudoko.length;row++) {
        let str =""
        for(let column = 0 ;column<sudoko[row].length;column++){
            if(column%3==0){
                str+="| "
            }
            str+=sudoko[row][column]+" "
        }
        str+="| "
        if(row%3==0){
            console.log("-------------------------")
        }
        
        console.log(str)
    }console.log("-------------------------")
}
solve()
printSudoko()