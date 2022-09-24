import prompt from "prompt-sync"

const scanner = prompt()

abstract class Player {
  protected address: string = ""

  abstract operation(): void
}

class PathPlayer extends Player {
  constructor(ad: string) {
    super()
    this.address = ad
  }

  operation(): void {
    console.log(this.address, " ", "played")
  }
}

class UrlPlayer extends Player {
  constructor(ad: string) {
    super()
    this.address = ad
  }

  operation(): void {
    console.log(this.address, " ", "played")
  }
}

function play(media: Player) {
  media.operation()
}

while (true) {
  const input: string = scanner("Enter Path(exit to end program): ")
  if (input === "exit") break;
  const re = new RegExp("^(http|https)://", "i");
  if (re.test(input)) play(new UrlPlayer(input));
  else play(new PathPlayer(input));
}
console.log("bye!!!")
