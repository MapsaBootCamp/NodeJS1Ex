abstract class Adress {
    public abstract factoryMethod(): Media;
    public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}
class PathPlayer extends Adress {
    public factoryMethod(): Media {
        return new Path();
    }
}

class WebPlayer extends Adress {
    public factoryMethod(): Media {
        return new Web();
    }
}
interface Media {
    operation(): string;
}
class Path implements Media {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}
class Web implements Media {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}
function clientCode(creator: Adress) {
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
}
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new PathPlayer());
console.log();
console.log('App: Launched with the ConcreteCreator2.');
clientCode(new WebPlayer());