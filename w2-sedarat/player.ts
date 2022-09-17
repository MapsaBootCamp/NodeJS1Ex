
interface read {
    readFile(): string;
}

abstract class player {

    abstract loadFile(): read;
    play(): void {
        const file = this.loadFile();
        console.log(`this music read from ${file.readFile()} and played`);
    }
}

class URLReader extends player {

    loadFile(): read {
        return new URLAddress();
    }
}

class filePathReader extends player {
    public loadFile(): read {
        return new filePath();
    }
}


class URLAddress implements read {
    public readFile(): string {
        return '{URL addfress}';
    }
}

class filePath implements read {
    public readFile(): string {
        return '{file path}';
    }
}

function client(player: player) {

    console.log(player.play());
}

const URLpattern = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/

const linuxFilePath= /^\/(?:[^/]+\/)*[^/]+$/;

const windowsFilePath=/^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/

const test1 = "https://ts10.tarafdari.com/contents/user724776/content-sound/4_5961056178942247905.mp3"

const test2 =  "/home/nahid/Music/precampexam/theGreatest.mp3"



if(URLpattern.test(test1)){
    client(new URLReader());
}
else if(linuxFilePath.test(test1) || windowsFilePath.test(test1)){
    client(new filePathReader());
}
else {
    console.log("wrong input");
}