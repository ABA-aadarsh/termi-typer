import process from "node:process"
import chalk from "chalk"
import { getTerminalWidth } from "./utils.js"
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
    private currentWordIndex : number
    public wpm : number
    readonly fps: number
    constructor(testWordArray: string [], fps: number){
        this.currentWord = ""
        this.userTypeList = []
        this.wpm = 0
        this.testWordArray = testWordArray
        this.fps = fps
        this.currentWordIndex = 0
    }
    public inputChar(ch : string):void{
        if(ch.length>=1){
            if((ch==' ' || ch=='\r' || ch=='\n' || ch=='\b') && this.currentWord.length==0) return
            else if((ch==' ' || ch=='\r' || ch=='\n') && this.currentWord.length!=0){
                if(this.currentWordIndex==this.testWordArray.length) return
                this.userTypeList.push(this.currentWord)
                this.currentWord = ""
                this.currentWordIndex+=1;
                return
            }else if(ch=='\b' && this.currentWord.length!=0){
                this.currentWord = this.currentWord.slice(0, -1)
                return
            }
            this.currentWord+=ch
        }
    }
    private displayTitle ():void{
        const cols = getTerminalWidth()
        const fpsString = `FPS : ${this.fps}`
        const wpmString = `WPM : ${this.wpm}`
        const programTitle = `Wintyper`
        if(fpsString.length + wpmString.length + programTitle.length < cols){
            const halfPadding = Math.floor((cols - (fpsString.length + wpmString.length + programTitle.length) )/2)
            log(fpsString)
            log(" ".repeat(halfPadding) + programTitle)
            log(" ".repeat(halfPadding) + wpmString)
        }
    }
    private textDisplayWithColors ():void {
        let originalWord: string, userTypedWord: string
        let displayText:string = ""
        let i:number , j:number
        for(i = 0; i<this.userTypeList.length; i++){
            originalWord = this.testWordArray[i]
            userTypedWord = this.userTypeList[i]
            for(j = 0; (j<originalWord.length && j<userTypedWord.length); j++){
                if(originalWord[j]==userTypedWord[j]){
                    displayText+=chalk.green(originalWord[j])
                }else{
                    displayText+=chalk.red.underline(originalWord[j])
                }
            }
            if(userTypedWord.length<originalWord.length){
                displayText+=chalk.red.underline(originalWord.slice(j))
            }else if (userTypedWord.length>originalWord.length){
                displayText+=chalk.red.underline(userTypedWord.slice(j))
            }
            displayText+=" "
        }

        if(this.userTypeList.length<this.testWordArray.length && this.currentWord!=""){
            originalWord = this.testWordArray[this.currentWordIndex]
            userTypedWord = this.currentWord
            displayText+='['
            for(j = 0; (j<originalWord.length && j<userTypedWord.length); j++){
                if(originalWord[j]==userTypedWord[j]){
                    displayText+=chalk.green(originalWord[j])
                }else{
                    displayText+=chalk.red.underline(originalWord[j])
                }
            }
            if (userTypedWord.length>originalWord.length){
                displayText+=chalk.red.underline(userTypedWord.slice(j))
            }else{
                displayText+=chalk.grey(originalWord.slice(j))
            }
            displayText+="] "
        }
        else if(this.userTypeList.length<this.testWordArray.length && this.currentWord==""){
            displayText += chalk.grey("[" + this.testWordArray[this.currentWordIndex] + "] ")
        }
        displayText += chalk.grey(this.testWordArray.slice(this.currentWordIndex+1).join(" "))
        log(displayText)
    }
    public screen (): void{
        cursorTo(0, 0)
        clearScreen()
        this.displayTitle()
        cursorTo(2, 0)
        this.textDisplayWithColors()
        cursorTo(10, 0)
        clearLine()
        log(": "+this.currentWord)
    }
}