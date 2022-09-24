abstract class Player{
    public abstract loadfile(): Filam

    public play(path:string): string{
        const file = this.loadfile()
        return `playing media from ${file.getPath(path)}`
    }
}

class PlayerInternalPath extends Player{
    public loadfile(): Filam {
        return new InternalPath()
    }
    
}

class PlayerURLPath extends Player{
    public loadfile(): Filam {
        return new URLPath()
    }
}

interface Filam{
    getPath(path:string):string
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
    const urlPattern = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
    const linuxPattern =/^\/(?:[^/]+\/)*[^/]+$/
    if(urlPattern.test(path) ){
        const url = new PlayerURLPath()
        console.log(url.play(path))
    }
    else if(linuxPattern.test(path)){
        const internal = new PlayerInternalPath()
        console.log(internal.play(path))
    }
}
client1("https://saeed.com")
client1("/home/user/Documents/foo.log")