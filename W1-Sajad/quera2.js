
const startUp = (friendsList,choosen=[]) =>{
    if(friendsList.length == 0){
        return [choosen]
    }
    if(friendsList.length == 1 && choosen.length == 0){
        choosen.push(friendsList.shift())
        return [choosen]
    }
    if(choosen.length ==0 && friendsList.length>1) {
        const _friendsList = [...friendsList]
        _friendsList.shift()
        choosen.push(friendsList.shift())
        const _choosen = [...choosen] 
        const withThisFriend = startUp(_friendsList,choosen)
        _choosen.pop()
        const withoutThisFriend = startUp(friendsList,_choosen)
        return [...withThisFriend,...withoutThisFriend]}
    for(let elm of friendsList){
        for(let Elm of choosen){
            if(elm[0] >= Elm[0] && elm[1] <= Elm[1]||elm[1] >= Elm[0] && elm[1]<= Elm[1]){
                friendsList.splice(friendsList.indexOf(elm),1)
                choosen.push(elm)
                const _choosen = [...choosen] 
                const withThisFriend = startUp(friendsList,choosen)
                _choosen.pop()
                const withoutThisFriend = startUp(friendsList,_choosen)
                return [...withThisFriend,...withoutThisFriend]}
            }
        }
        
    return [choosen]

    }

function sumCalculator(arr){
    let  _result= []
    for(let elm of arr){
        let result =0
        for(let Elm of elm){
            result += Elm[2]
        }
        _result.push(result)
    }
    _result = Math.max(..._result)
    return _result
}

const allPossibleChoices = startUp([[1 ,1 ,100],[2 ,3 ,50],[3 ,2 ,50],[3,3,50],[4,1,60],[4,1,150],[2,2,100]])
// console.log(allPossibleChoices);
console.log(sumCalculator(allPossibleChoices));

