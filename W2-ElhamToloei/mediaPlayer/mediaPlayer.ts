abstract class MediaPlayer{

    public abstract factoryMethodPath(): Path;

    public play(): string{
        const path = this.factoryMethodPath();
        return `masir ro gereftam va ${path.load()} `
    }
}

class MediaPlayerUrl extends MediaPlayer{
    public factoryMethodPath(): Path {
        return new Url();
    }
}

class MediaPlayerWinFactory extends MediaPlayer{
    public factoryMethodPath(): Path {
        return new WinFiles();
    }
}
class MediaPlayerUnixFactory extends MediaPlayer{
    public factoryMethodPath(): Path {
        return new UnixFiles();
    }
}

interface Path{
    load(): string;
}

class Url implements Path{
    load(): string {
        return 'bargozari url!'
    }
}

abstract class Files implements Path{

    public abstract systemPath();
    
    load(): string {
        const sysPath = this.systemPath();
        return `bargozari file az ${sysPath} `
    }
}

class WinFiles extends Files{
    public systemPath() {
        return "windows"
    }
}

class UnixFiles extends Files{
    public systemPath() {
        return "Unix"
    }
}


function client(MediaPlayer: MediaPlayer){
    console.log(MediaPlayer.play());
    console.log("pakhsh music");
}


function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}
// const path : string = "https://www.google.com/search?channel=fs&client=ubuntu&q=%5Bnodemon%5D+app+crashed+-+waiting+for+file+changes+before+starting..."
const path : string = "/media/elham/New Volume/Node1(Mapsa)/exercise/NodeJS1Ex/W2-ElhamToloei/mediaPlayer"
// const path : string = "C:\\"


if (path.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
    console.log("masir net");
    const mpObj1 = new MediaPlayerUrl();
    client(mpObj1);
}
else { /*filehaye systemi*/ //path.match(/^(?:[a-z]:)?[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/)

    // if (path === "C:\\") {  
    if (path.match(/^([a-zA-Z]:)?(\\[^<>:"/\\|?*]+)+\\?$/)){ 
        console.log("masir system"); 
        const mpObj2 = new MediaPlayerWinFactory();
        client(mpObj2);

    } else if (path.match(/^(.*)\/([^\/]*)$/)) {   
        console.log("masir system");
        const mpObj3 = new MediaPlayerUnixFactory();
        client(mpObj3);

    }   
}


// export{}