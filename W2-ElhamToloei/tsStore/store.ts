import _ from "lodash"
import {Pushaak, LavazemBarghi, User, Comment} from "./model"


const users : any[] =[]
let products :any[] = []
const productsIdWithCount = new Map()



function addProduct(product: any, count: number) {
    for(let [productId, productCount] of productsIdWithCount){
        if(product.id === productId){
            productCount += count;
            return;
        }
    }
    productsIdWithCount.set(product.id, count);
    products.push(product)
}

function removeProduct(productId: number, count: number) {
    if(!productsIdWithCount.get(productId))
        throw new Error("kalaye morede nazar yaft nashod ----> 404");
    
    let productCount = productsIdWithCount.get(productId)
    if(productCount <= count){
        productsIdWithCount.delete(productId)
        products = products.filter(v => v.id !== productId)
    }else {
        productsIdWithCount.set(productId, productCount - count)
    }
}


function addUser(username: string) {
    if(users.filter(v => v.username === username).length > 0)
        throw new Error(`in user ba username ${username} 
                                                ghablan sabtnam karde`);
    users.push(new User(username));
}

function getCommentsOfUser(user: any){
    const result: Map<string,any> = new Map()
    for(let product of products){
        for(let comment of product.comments){
            if(_.isEqual(comment.user, user))
                result.set(product["name"],  comment)
        }
    }
    return result;
}

function getRating(product :any){
    if(product.comments.length > 0){
        let sumRate = product.comments.reduce(
            (prevCount: number, cuurentComment: any) => prevCount + cuurentComment.rating , 0)
        return sumRate / product.comments.length
    }
    return 3
}



addUser("Gholam");
addUser("Ashkan");
addProduct(new Pushaak("pirhan", 12e4, "Male", "blue", "Nike"), 12)
removeProduct(products[0].id, 11);
products[0]?.addComment(new Comment(users[0], 4, "razi budam"))
products[0]?.addComment(new Comment(users[1], 1, "razi nabudam"))


console.log(users);
console.log(productsIdWithCount);
console.log(getCommentsOfUser(users[0]))
console.log(getRating(products[0]))