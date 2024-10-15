import process from "node:process"
const log = (input: string | Buffer)=>{
    process.stdout.write(input)
}
const cursorTo = (y:number, x:number)=>{
    process.stdout.cursorTo(x, y)
}
const clearScreen = ()=>{
    cursorTo(0,0)
    process.stdout.clearScreenDown()
}
const clearLine = ()=>{
    process.stdout.clearLine(0)
}

export class TyperProgram {
    private currentWord : string
    private testWordArray : string []
    private userTypeList : string []
    public wpm : number
    readonly fps: number
    constructor(testWordArray: string [], fps: number){
        this.currentWord = ""
        this.userTypeList = []
        this.wpm = 0
        this.testWordArray = testWordArray
        this.fps = fps
    }
    public inputChar(ch : string):void{
        if(ch.length>=1){
            if((ch==' ' || ch=='\r' || ch=='\n' || ch=='\b') && this.currentWord.length==0) return
            else if((ch==' ' || ch=='\r' || ch=='\n') && this.currentWord.length!=0){
                this.userTypeList.push(this.currentWord)
                this.currentWord = ""
                return
            }else if(ch=='\b' && this.currentWord.length!=0){
                this.currentWord = this.currentWord.slice(0, -1)
                return
            }
            this.currentWord+=ch
        }
    }
    private textDisplayWithColors ():void {
        let originalWord: string, userTypedWord: string
        for(let i:number = 0; i<this.userTypeList.length; i++){
            originalWord = this.testWordArray[i]
            userTypedWord = this.userTypeList[i]
            for(let j:number = 0; (j<originalWord.length && j<userTypedWord.length); j++){
                if(originalWord[j]==userTypedWord[j]){
                    log(originalWord[j])
                }else{
                    log('\x1b[31m'+originalWord[j])
                }
            }
        }
    }
    public screen (): void{
        cursorTo(0, 0)
        clearScreen()
        const titleString = `FPS : ${this.fps}\t\twintyper\t\tWPM: ${this.wpm}`
        log(titleString)
        cursorTo(2, 0)
        this.textDisplayWithColors()
        cursorTo(10, 0)
        clearLine()
        log(": "+this.currentWord)
    }
}