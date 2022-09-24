class Comments {
    user:User
    rating:number
    text:string
    constructor(user,rating,text) {
        this.user = user
        this.rating = rating
        this.text = text
    }
    getUser(){
        return this.user
    }
}   
class User {
    username:string
    static  usernames :string[]= []
    purchaseHistory:string[]
    constructor(username) {
        this.username = username
        User.usernames.push(username)
        this.purchaseHistory = []
    }
    private getUsername(){
        return this.username
    }
}
class Product {
    static product_ids:number[] = []
    id:number
    name:string
    price:number
    category:string
    comments:Comments[]

    constructor(name,price,category) {
        this.id = this.idCreator()
        Product.product_ids.push(this.id)
        this.name=name
        this.price = price
        this.category=category
        this.comments = []
    }
    addComment(newComment){
        this.comments.push(newComment)
    }
    private idCreator() {
        let id = Math.random()*10000
        while (Product.product_ids.includes(id)){
            id = Math.random()*10000
        }
        return id;
    }
}
export const models= {
    Comments,
    User,
    Product
}