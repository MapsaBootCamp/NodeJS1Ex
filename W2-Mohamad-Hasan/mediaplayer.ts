abstract class Player {
  public abstract fileGetter(): Path;

  public play(path: string): string {
    const file = this.fileGetter();
    return `Playing file ${file.inform()}`;
  }
}

class CreatePlayerByURL extends Player {
  public fileGetter(): Path {
    return new PlayerByURL();
  }
}

class CreatePlayerByInternalPath extends Player {
  public fileGetter(): Path {
    return new PlayerByInternalPath();
  }
}

interface Path {
  inform(): string;
}

class PlayerByURL implements Path {
  public inform(): string {
    return "From URL";
  }
}

class PlayerByInternalPath implements Path {
  public inform(): string {
    return "From internal path";
  }
}

function clientCode(path: string) {
  const URLPattern =
    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;
  const LinuxPattern = /^\/(?:[^/]+\/)*[^/]+$/;
  if (URLPattern.test(path)) {
    const url = new CreatePlayerByURL();
    console.log(url.play(path));
  }
  if (LinuxPattern.test(path)) {
    const internalPath = new CreatePlayerByInternalPath();
    console.log(internalPath.play(path));
  }
}

clientCode("/home/useR/dOCUMENTS");
clientCode("https://MOHAMADHASAN.com");
