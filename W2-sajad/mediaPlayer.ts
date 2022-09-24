// import * as fs from 'fs'
interface Player{
    readFile:()=> any
}

abstract class Mediaplayer{
    public abstract loadFile(): void
    public play(): void{
        console.log('song is playing');
        
    }
    public pause(): void{
        console.log('song is paused!');
    }
}

class UrlMediaPlayer extends Mediaplayer{
    private file :any ;
    private path:string;
    // private pattern = /(http|https|www)/
    constructor(path:string){
        super()
        this.path = path
    }
    public loadFile(): void {
        const file = new UrlPath(this.path)
        this.file = file.readFile()

    }

}

class DirMediaPlayer extends Mediaplayer{

    private file :any ;
    private path:string;
    // private pattern = /[^(http|https|www)]/

    constructor(path:string){
        super()
    this.path = path

    }
    public loadFile(): void {
            const file = new DirPath(this.path)
            this.file = file.readFile()
    }

}

class UrlPath implements Player{
    private url:string
    constructor(url:string){
        this.url = url
    }
    public readFile(): any {
        console.log('song is read from url');
        
    }
}

class DirPath implements Player{
    private path:string
    constructor(path:string){
        this.path = path
    }
    public readFile(): any {
        console.log('song is read from local directory');
        
        return 
    }
}


function client(path:string) {
     const pattern = /(http|https|www)/ig
     
     if(pattern.test(path)){
        
        const song = new UrlMediaPlayer(path) 
        song.loadFile()
        song.play()
     }
     else{
        const song = new DirMediaPlayer(path) 
        song.loadFile()
        song.play()
     }
}


client('https:www.soundcloud.com')
client('/home/Music/h.mp3')