class BaseProductModel{
     _id : number;
     name : string;
     price : number;
     category : string;
     comments;
    constructor(name, price, category){
        this._id = BaseProductModel.idGenerator()
        this.name = name
        this.price = price
        this.category = category
        this.comments = []
    }

    getid(): number{
        return this._id;
    }

    static idGenerator(){
            let result;
            do{ 
                result = Math.floor(Math.random() * 1e5)
            } while(result < 1e4 - 1)
        return result
    }

    addComment(comment){
        this.comments.push(comment)
    }
}


class Pushaak extends BaseProductModel{
    gender : string;
    colour : string;
    brand : string;
    constructor(name, price, gender, colour, brand){
        super(name, price, "pushaak");
        this.gender = gender;
        this.colour = colour;
        this.brand = brand;
    }
}


class LavazemBarghi extends BaseProductModel{
    power : number;
    constructor(name, price, power){
        super(name, price, "lavazemBarghi");
        this.power = power;
    }
}


class User{

    username: string;
    purchaseHistory : number[];

    constructor(username : string){
        this.username = username;
        this.purchaseHistory =[]
    }

    addToCart(product : BaseProductModel) : void{
        this.purchaseHistory.push(product._id)
    }
}


class Comment{
    user : User;
    rating : number;
    text : string;
    
    constructor(user, rating, text){
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