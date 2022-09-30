abstract class mediaPlayer {
  public abstract playerMethod(): player;
  public playMethod(): string {
    const player = this.playerMethod();
    return `played in path: ${player.readFileFrom()}`;
  }
}

class winPlayer extends mediaPlayer {
  public playerMethod(): player {
    return new vlcPlayer();
  }
}

class browser extends mediaPlayer {
  public playerMethod(): player {
    return new webPlayer();
  }
}

interface player {
  readFileFrom(): string;
}
class vlcPlayer implements player {
  readFileFrom(): string {
    return "media has played in fileSystem";
  }
}
class webPlayer implements player {
  readFileFrom(): string {
    return "media has played in browser";
  }
}

const client = (mediaPlayer: mediaPlayer) => {
  console.log("our media is played...");
  console.log(mediaPlayer.playMethod());

};
const adress = '/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/';
const adress2 = '/^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/'

if (adress) {
  console.log("player in chrome");
  const playObj2 = new browser();
  client(playObj2);  
  
}else if (adress2){
console.log("player of windows");
const playObj = new winPlayer();
client(playObj);
}
