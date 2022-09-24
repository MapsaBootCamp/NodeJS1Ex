import {models} from "./models.js"
let products = new Map()
let users:any[] =[]
let income =0
function addProducts(name,count,price,category) {
    let newProduct = new models.Product(name,price,category)
    products.set(newProduct.id,[newProduct,count])
    return
}
function removeProduct(name,count){
    let values = Object.values(products)
    for(let i of values){
        if(name==i[0].name){
            if (i[1]>=count){
                products.set(i[0].id,[i[0],Number(i[1])-count])
                income=+(count*i[0].price)
                return "Done"
            }else
                return "we do not have enough "+name
        }
    }
    return "We do not Have "+name
}
function addUser(username){
    if(models.User.usernames.includes(username))
        return "we had such username before"
    let newUser = new models.User(username)
    users.push(newUser)
    return "new user added"
}
function getTotalInventoryCount(){
    let sum =0
    let vals = Object.values(products)
    for(let i of vals)
        sum+=Number(i[1])
    return sum
}
function getTotalProfit(){
    return income
}
function getCommentsByUser(user){
    let ans:any[] = []
    let vals = Object.values(products)
    for (let i of vals){
        for(let j of i[0].comments)
            if(j.user==user){
            ans.push(j)
            }
    }
    return ans
}
function getRating(product){
    let sum =0,count=0

    for(let i of product.comments){
        count++;
        sum+=i.rating;
    }
     return sum/count
}
function purchase(user,product,count){
    removeProduct(product.name,count)
    user.purchaseHistory.push(product.id)
    return
}