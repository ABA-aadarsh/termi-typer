export const ansiCodes = {
  reset: "\x1b[0m",
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  grey: "\x1b[90m",
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  blink: "\x1b[5m",
  inverse: "\x1b[7m",
  hidden: "\x1b[8m",
  strikethrough: "\x1b[9m"
};
class Color {
  private stylesContainer = new Set<string>()

  // ANSI color codes and styles
  constructor() { }
  private reset() {
    this.stylesContainer.clear();
  }
  private styleText(text: string): string {
    let styledText = ""
    for (const style of this.stylesContainer) {
      styledText += style
    }
    styledText += text + ansiCodes.reset;
    this.reset();
    return styledText;
  }
  private handleText = (text: string) => this.styleText(text);
  get red() {
    this.stylesContainer.add(ansiCodes.red);
    return this.proxy;
  }
  private proxy = new Proxy(this.handleText, {
    get: (target, prop) => {
      if (prop in this) {
        return (this as any)[prop];
      }
      return target;
    },
    apply: (target: any, thisArg: any, ...argList: any[]) => {
      return target(...argList);
    },
  });

  public style(text: string, ansiCodesSet: string []):string{
    let styledText = ""
    for (const style of ansiCodesSet) {
      styledText += style
    }
    styledText += text + ansiCodes.reset;
    return styledText;
  }
  get bold() {
    this.stylesContainer.add(ansiCodes.bold);
    return this.proxy;
  }
  get underline() {
    this.stylesContainer.add(ansiCodes.underline);
    return this.proxy;
  }
  get italic() {
    this.stylesContainer.add(ansiCodes.italic);
    return this.proxy;
  }
  get blink() {
    this.stylesContainer.add(ansiCodes.blink);
    return this.proxy;
  }
  get inverse() {
    this.stylesContainer.add(ansiCodes.inverse);
    return this.proxy;
  }
  get hidden() {
    this.stylesContainer.add(ansiCodes.hidden);
    return this.proxy;
  }
  get strikethrough() {
    this.stylesContainer.add(ansiCodes.strikethrough);
    return this.proxy;
  }
  get green() {
    this.stylesContainer.add(ansiCodes.green);
    return this.proxy;
  }

  get yellow() {
    this.stylesContainer.add(ansiCodes.yellow);
    return this.proxy;
  }

  get blue() {
    this.stylesContainer.add(ansiCodes.blue);
    return this.proxy;
  }

  get magenta() {
    this.stylesContainer.add(ansiCodes.magenta);
    return this.proxy;
  }

  get cyan() {
    this.stylesContainer.add(ansiCodes.cyan);
    return this.proxy;
  }

  get grey(){
    this.stylesContainer.add(ansiCodes.grey);
    return this.proxy;
  }

  get white() {
    this.stylesContainer.add(ansiCodes.white);
    return this.proxy;
  }

  get black() {
    this.stylesContainer.add(ansiCodes.black);
    return this.proxy;
  }
  

}

// Usage
const colorChalk = new Color();
export default colorChalk