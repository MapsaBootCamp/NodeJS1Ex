const prompt = require("prompt-sync")()
const friends=[]
let bestBenefit = 0
class Person{
    constructor(front,back,money){
        this.f=front;
        this.b=back
        this.m=money
    }
}
function check(arr,elm){
    for(let i =0 ;i<arr.length;i++){
        if(arr[i].f>elm.f && arr[i].b>elm.b){
            return false
        }
        if(arr[i].f<elm.f && arr[i].b<elm.b){
            return false
        }
    }
    return true
}
function getInput(){
    const numberOfFriends = prompt()
for(let i = 0;i<numberOfFriends;i++){
    const input = prompt()
    const temp = input.split(" ")
    friends.push(new Person(temp[0],temp[1],temp[2]))
}
}
function findBestTeam(friendsList,team=[]) {
    let money=0
    for (let i = 0; i < friendsList.length; i++) {
        if(friendsList.length!=1){
            findBestTeam(friendsList.filter((value,index,arr)=>{return index!=i}))
        }
        if(i==friendsList.length){
            break
        }
        if(check(team,friendsList[i])){
            team.push(friendsList[i])
            money+=Number(friendsList[i].m)
            if(Number(money)>bestBenefit){
                bestBenefit = money
            }
        }
    }
}
getInput()
findBestTeam(friends)
console.log(bestBenefit)
