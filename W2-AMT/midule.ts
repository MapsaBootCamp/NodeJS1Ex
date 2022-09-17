class ProductModel{
    public _id:number;
    public name:string;
    public price:number;
    public category:string;
    public comments:Comment[]=[]

    constructor (name:string,price:number,category:string,){
        this._id = ProductModel.idGenerator();
        this.name = name;
        this.price = price;
        this.category = category;
        this.comments = []
    }
    get id (){
        return this._id
    }
    static idGenerator(){
        let result:number;
        do{
            result = Math.floor(Math.random() * 1e5)
        }while(result < 1e4 -1)
        return result
    }
    addComment(comment:Comment):any{
        this.comments.push(comment)
    }
    
}

class Pushaak extends ProductModel{
    private gender:string;
    private color:string;
    private brand:string
    constructor(name:string,price:number,gender:string,color:string,brand:string){
        super(name,price,"pushaak",);
        this.gender = gender;
        this.color = color;
        this.brand = brand;
    }
}


class LavazemBarghi extends ProductModel{
    private power:number
    constructor (name:string,price:number,power:number){
        super(name,price,"lavazemBarghi");
        this.power = power;
    }
}

class user{
    public username:string;
    public purchaseHistory:string[]
    constructor(username:string){
        this.username = username;
        this.purchaseHistory= [];
    }
    addToCart(product){
        this.purchaseHistory.push(product.id)
    }
}

class Comment{
    public user:string;
    public rating:number;
    public text:string
    constructor(user,rating,text){
        this.user = user;
        this.rating = rating;
        this.text = text;
    }
}

export {
    Pushaak,
    LavazemBarghi,
    user,
    Comment,
    ProductModel
}