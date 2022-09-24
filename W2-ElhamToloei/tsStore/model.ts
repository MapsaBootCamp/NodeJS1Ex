class BaseProductModel{
    private _id : number;
    name : string;
    price : number;
    category : string;
    comments : string[];

    constructor(name:string, price:number, category: any){
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

    addComment(comment : string){
        this.comments.push(comment)
    }
}


class Pushaak extends BaseProductModel{

    gender : string;
    colour : string
    brand : string

    constructor(name: string, price: number, gender: string, colour: string, brand: string){
        super(name, price, "pushaak");
        this.gender = gender;
        this.colour = colour;
        this.brand = brand;
    }
}


class LavazemBarghi extends BaseProductModel{
    power: any;
    constructor(name: string, price: number, power: any){
        super(name, price, "lavazemBarghi");
        this.power = power;
    }
}


class User{
    purchaseHistory: number[];
    username: string;

    constructor(username: string){
        this.username = username;
        this.purchaseHistory = []
    }

    addToCart(product: { id: number; }){
        this.purchaseHistory.push(product.id)
    }
}


class Comment{
    user: string;
    rating: number;
    text: string;
    
    constructor(user: string, rating: number, text: string){
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