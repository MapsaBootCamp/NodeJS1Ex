interface Filam{
    getPath(path:string):string
}
 abstract class Player{
    abstract loadfile():void

    public static play(path:string): any{
        console.log(`play shod ${path}`);
 
    }
}

class PlayerInternalPath extends Player{
    public loadfile(){
        return new InternalPath()
    }
    
}

class PlayerURLPath extends Player{
    public loadfile(){
        return new URLPath()
    }
}

class InternalPath implements Filam{
    getPath(path: string): string {
        return `file system : ${path}`
    }
}
class URLPath implements Filam{
    getPath(path: string): string {
        return `online url ${path}`
    }
}

function client1(path:string){
    const urlPattern = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
    const linuxPattern =/^\/(?:[^/]+\/)*[^/]+$/; 
    if(urlPattern.test(path) ){
        
        const url = new PlayerURLPath()
        console.log(Player.play(path))
    }else if(linuxPattern.test(path)){
        const internal = new PlayerInternalPath()
        console.log(Player.play(path))
    }else("file vojod nadard")
}

client1("https://google.com")
client1("/home/user/Documents/music.log")
client1("https://isna.ir")