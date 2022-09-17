// interface Strategy{
//     operation(num1: number, num2: number): number
// }

// class Main {
//     private strategy : Strategy
//     setStrategy(strategy: Strategy){
//         this.strategy = strategy
//     }
//     operation(num1: number, num2: number): number{
//         return this.strategy.operation(num1, num2)
//     }
// }

// class add{
//     operation(num1: number, num2: number): number{
//         return num1 + num2
//     }
// }
// class minus{
//     operation(num1: number, num2: number){
//         return num1 - num2
//     }
// }
// class mult{
//     operation(num1: number, num2: number){
//         return num1 * num2
//     }
// }
// class divide{
//     operation(num1: number, num2: number){
//         return num1 / num2
//     }
// }

// function client(num1: number, num2: number, operator: string){
//     let MainObj = new Main()
//     let result: number = 0
//     if(operator == "+"){
//         MainObj.setStrategy(new add())
//         result = MainObj.operation(num1, num2)
//     }
//     if(operator == "*"){
//         MainObj.setStrategy(new mult())
//         result = MainObj.operation(num1, num2)
//     }
//     if(operator == "-"){
//         MainObj.setStrategy(new minus())
//         result = MainObj.operation(num1, num2)
//     }
//     if(operator == "/"){
//         MainObj.setStrategy(new divide())
//         result = MainObj.operation(num1, num2)
//     }
    
//     return result
// }

// console.log(client(6 ,2 ,"+"))
// console.log(client(6 ,2 ,"-"))
// console.log(client(6 ,2 ,"*"))
// console.log(client(6 ,2 ,"/"))

//model 2 making a hamburger
interface Strategy{
    operation() : void
}

class burgerMaker{
    private strategy : Strategy

    setStrategy(strategy: Strategy): void{
        this.strategy = strategy
    }

    operation(){
        this.strategy.operation()
    }
}

class CheesBurger implements Strategy{
    operation(): void {
        console.log("here is ur Chees Burger");
        
    }
}
class HamBurger implements Strategy{
    operation(): void {
        console.log("here is ur HamBurger");
    }
}
class DoubleBurger implements Strategy{
    operation(): void {
        console.log("here is ur DoubleBurger");
    }
}

function client(food: "hamburger" | "cheesburger" | "doubleburger"): void{
    let burger = new burgerMaker()
    if(food == "cheesburger"){
        burger.setStrategy(new CheesBurger())
        burger.operation()
    }
    if(food == "doubleburger"){
        burger.setStrategy(new DoubleBurger())
        burger.operation()
    }
    if(food == "hamburger"){
        burger.setStrategy(new HamBurger())
        burger.operation()
    }
}

client("hamburger")