const prompt = require("prompt-sync")()
const banners = []
class Banner{
    constructor(height,width,a,b){
        this.height=height
        this.width=width
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
function check(height,width,a,b) {
    horizontalBanners = 0
    verticalBanners = 0
    if(width<=3*a-2){
        horizontalBanners++
    }else{
        for(let i = a-1;i<width;i=i+(2*a)-1){
            horizontalBanners++
        }
    }
    if(height<=3*b-2){
        verticalBanners++
    }else{
        for(let i = b-1;i<height;i=i+(2*b)-1){
            verticalBanners++
        }
    }
    return verticalBanners*horizontalBanners
}
function calculate(bannersList) {
    const answers = []
    for (let banner of bannersList){
        answers.push(Math.max(check(banner.height,banner.width,banner.a,banner.b),check(banner.height,banner.width,banner.b,banner.a)))
    }
    return answers
}
getInput()
console.log(calculate(banners))
