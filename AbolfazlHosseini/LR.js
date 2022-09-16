const prompt = require("prompt-sync")()
const people = prompt("PEOPLE:")
const numberOfChanges = prompt("CHANGES:")
function count(temp){
    let counter = 0
    for (let i = 0; i < temp.length; i++) {
        if(temp[i]=="L")
            counter+=i
        else
            counter+=temp.length-i-1
    }
    return counter
}
function replace(str,char,index) {
    return str.slice(0,index)+char+str.slice(index+1)
}
for(let k = 1 ; k<=numberOfChanges;k++){
    let temp = people
    for(let changes = 0,peopleChanger = 0;;){
            if(peopleChanger==Math.floor(temp.length/2))
                break
        if(temp[peopleChanger]=="L"){
                temp=replace(temp,"R",peopleChanger)
                changes++
                if(changes==k)
                    break
            }if(temp[temp.length-1-peopleChanger]=="R"){
                temp = replace(temp,"L",temp.length-peopleChanger-1)
                changes++
                if(changes==k)
                    break
            }
            peopleChanger++
    }
    console.log(count(temp))
}