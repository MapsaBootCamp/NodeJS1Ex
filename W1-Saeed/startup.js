function maxMoney(friendsList){
    let startUpFriends = []
    let money = 0
    let moneyList = []
    let flag = true
    for(let i = 0; i < friendsList.length - 1; i++){
        for(let j = i; j < friendsList.length; j++){
            for(let man of startUpFriends){
                if((friendsList[j][0] < man[0] && friendsList[j][1] < man[1]) ||
                     (friendsList[j][0] > man[0] && friendsList[j][1] > man[1])){
                    flag = false
                    break
                }
            }
            if(flag) {
                startUpFriends.push(friendsList[j])
                money += friendsList[j][2]
            }
            else flag = true
        }
        moneyList.push(money)
        startUpFriends = []
        money = 0
    }
    moneyList = moneyList.sort((a,b) => b - a)
    return moneyList[0]
}
console.log(maxMoney([[1,1,100],[2,3,50],[3,2,50]]))
console.log(maxMoney([[1,1,100],[3,3,50],[2,3,50],[3,2,50],[1,4,200],[3,3,300]]))
