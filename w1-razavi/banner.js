const prompt = require("prompt-sync")()
const banners = []
class Banner{
    constructor(ertefa,arz,a,b){
        this.ertefa=ertefa
        this.arz=arz
        this.a=a
        this.b=b
    }
}
function getInput(){
    const N = prompt()
    for(let i = 0 ;i<N;i++){
        const input = prompt()
        const temp = input.split(" ")
        banners.push(new Banner(temp[0],temp[1],temp[2],temp[3]))
    }
}
function check(ertefa,arz,a,b) {
    horizontalBanners = 0
    verticalBanners = 0
    if(arz<=3*a-2){
        horizontalBanners++
    }else{
        for(let i = a-1;i<arz;i=i+(2*a)-1){
            horizontalBanners++
        }
    }
    if(ertefa<=3*b-2){
        verticalBanners++
    }else{
        for(let i = b-1;i<ertefa;i=i+(2*b)-1){
            verticalBanners++
        }
    }
    return verticalBanners*horizontalBanners
}
function calculate(bannersList) {
    const answers = []
    for (let banner of bannersList){
        answers.push(Math.max(check(banner.ertefa,banner.arz,banner.a,banner.b),check(banner.ertefa,banner.arz,banner.b,banner.a)))
    }
    return answers
}
getInput()
console.log(calculate(banners))