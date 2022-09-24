class BaseProductModel{
    protected _id : number
    public name : string
    public price : number
    public category : string
    public comments : (Commentha)[] = []

    constructor(name : string, price : number, category : string){
        this._id = BaseProductModel.idGenerator()
        this.name = name
        this.price = price
        this.category = category
    }

    public get id(): number{
        return this._id
    }

    protected static idGenerator(): number {
        return Math.floor(Math.random() * 1e8)
    }

    public addComment(comment : (Commentha)): void {
        this.comments.push(comment)
    }
}

class Pushuk extends BaseProductModel{
    public color: string
    public gender: "male" | "female"
    public brand : string
    constructor(name: string ,price: number , category: string, gender: "male" | "female" , color : string, brand: string){
        super(name, price, category)
        this.gender = gender
        this.color = color
        this.brand = brand
    }
}

class User{
    public username: string
    public puchaseHistory: number[]
    
    constructor( username: string){
        this.username = username
        this.puchaseHistory = []
    }

    public addToCart(product): void{
        this.puchaseHistory.push(product.id)
    }
}

class Commentha{
    public user: User
    public rating: number
    public text: string

    constructor(user: User, rating: number, text: string){
        this.user = user
        this.rating = rating
        this.text = text
    }
}
export {
    Pushuk,
    User,
    Commentha,
    BaseProductModel
}