class BaseProductModel{
     private name:string;
     private price:number;
     private category:string;
     public comments:Comment[];
     private _id:any;
    constructor(name:string, price:number, category:string){
        this._id = BaseProductModel.idGenerator()
        this.name = name
        this.price = price
        this.category = category
        this.comments = []
    }

    get id(){
        return this._id;
    }

    static idGenerator(){
            let result;
            do{ 
                result = Math.floor(Math.random() * 1e5)
            } while(result < 1e4 - 1)
        return result
    }

    addComment(comment:Comment){
        this.comments.push(comment)
    }
}


class Pushaak extends BaseProductModel{
    private gender:string;
    private colour:string;
    private brand:string;
    constructor(name:string, price:number, gender:string, colour:string, brand:string){
        super(name, price, "pushaak");
        this.gender = gender;
        this.colour = colour;
        this.brand = brand;
    }
}


class LavazemBarghi extends BaseProductModel{
    private power:string;
    constructor(name:string, price:number, power:string){
        super(name, price, "lavazemBarghi");
        this.power = power;
    }
}


class User{
    public username:string
    public purchaseHistory:string[];
    constructor(username:string){
        this.username = username;
        this.purchaseHistory = []
    }

    addToCart(product:BaseProductModel){
        this.purchaseHistory.push(product.id)
    }
}


class Comment{
    public user:User;
    public rating:number;
    private text:string;
    constructor(user:User, rating:number, text:string){
        this.user = user
        this.rating = rating
        this.text = text
    }
}

export {
    Pushaak,
    LavazemBarghi,
    User,
    Comment
}