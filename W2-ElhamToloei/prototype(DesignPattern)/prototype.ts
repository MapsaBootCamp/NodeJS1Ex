interface Prototype{
    clone():Prototype;
}

class Concrete implements Prototype {
    private field1: Prototype;
    constructor(fd1:Concrete) {
        this.field1 = fd1
    }
    clone(): Prototype {
        return (new Concrete(this))
    }
}

class Subclass extends Concrete {
    private field2: Prototype
    constructor(source:Subclass) {
        super(source)
        this.field2 = source.field2   
    }
    clone(): Prototype {
        return (new Subclass(this))
    }
}

class Client {
    
    constructor(parameters) {
        
    }
}

