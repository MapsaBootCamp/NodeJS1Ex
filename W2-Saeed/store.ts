import {BaseProductModel,Pushuk, User, Commentha} from "./model"

const users: User[] = []
let products: BaseProductModel[] = []
const productIdCounts: Map<number,number>= new Map()

function addProduct(product: BaseProductModel, count: number): void{
    for(let [productID, productCount] of productIdCounts){
        if(productID == product.id){
            productCount += count
            return
        }
    }
    productIdCounts.set(product.id, count)
    products.push(product)
}

function removeProduct(productID : number , count: number){
    if(!productIdCounts.get(productID))
        throw "nadarim"
    
    let productCount: number = productIdCounts.get(productID)
    if(productCount <= count) {
        productIdCounts.delete(productID)
        products = products.filter(v => productID != v.id)
    }
    else{
        productIdCounts.set(productID , productCount - count)
    }
}

function addUser(username : string): void{
    if(users.filter(v => v.username == username).length){
        console.log("ghablan sabtenam kardi");
    }
    else{
        users.push(new User(username))
    }
}

function getCommentsOfUser(user: User){
    const result: Map<string, Commentha> = new Map()
    for(let product of products){
        for(let commentam of product.comments){
            if(commentam.user == user) 
                result.set(product.name, commentam)
        }
    }

    return result
}

function getRating(product: BaseProductModel): number{
    let result: number = 0
    if(product.comments.length){
        result = product.comments.reduce((acc , now) =>  acc + now.rating,0)
        return result / product.comments.length
    }
    return 3
}


addUser("Gholam");
addUser("Ashkan");
addProduct(new Pushuk("pirhan", 12e4,"lebas", 'male', "blue", "Nike"), 12)
removeProduct(products[0].id, 11);
products[0]?.addComment(new Commentha(users[0], 4, "razi budam"))
products[0]?.addComment(new Commentha(users[1], 1, "razi nabudam"))


console.log(users);
console.log(productIdCounts);
console.log(getCommentsOfUser(users[0]))
console.log(getRating(products[0]))