import process from "node:process"
import { colorCodeWord, getStringLengthWithoutColorFormat, getTerminalWidth } from "./utils.js"
import colorChalk, { ansiCodes } from "./Color.js"
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
            if((ch==' ' || ch=='\r' || ch=='\n' || ch=='\b' || ch == '\t') && this.currentWord.length==0) return
            else if((ch==' ' || ch=='\r' || ch=='\n' || ch=='\t') && this.currentWord.length!=0){
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
    private continueLine (list: string [], str: string): 1 | 0{
        // 1 for continue and 0 for new line
        const cols = getTerminalWidth()
        let x: number = 0
        for(let i:number = 0; i<list.length; i++){
            x += getStringLengthWithoutColorFormat(list[i])
            x += 1
        }
        x += getStringLengthWithoutColorFormat(str) + 1
        if(x>=cols) return 0;
        return 1
    }
    private textDisplayWithColors ():void {
        let originalWord: string, userTypedWord: string
        let displayTextArray:string[][] = [[]], tempString:string, displayArrayIndex: number = 0
        let displayText: string = ""
        let i:number , j:number
        // previous words
        for(i=0; i<this.currentWordIndex; i++){
            originalWord = this.testWordArray[i]
            userTypedWord = this.userTypeList[i]
            tempString = colorCodeWord(userTypedWord, originalWord, true)
            if(this.continueLine(displayTextArray[displayArrayIndex], tempString)==0){
                displayArrayIndex+=1
                displayTextArray.push([tempString])
            }else{
                displayTextArray[displayArrayIndex].push(tempString)
            }
        }
        if(this.currentWordIndex<this.testWordArray.length){
            // current word
            tempString = colorCodeWord(this.currentWord, this.testWordArray[this.currentWordIndex] , false)
            if(this.continueLine(displayTextArray[displayArrayIndex], tempString)==0){
                displayArrayIndex+=1
                displayTextArray.push([tempString])
            }else{
                displayTextArray[displayArrayIndex].push(tempString)
            }
    
            // remaining word
            for(i=this.currentWordIndex+1; i<this.testWordArray.length; i++){
                originalWord = this.testWordArray[i]
                tempString = colorChalk.grey(originalWord)
                if(this.continueLine(displayTextArray[displayArrayIndex], tempString)==0){
                    displayArrayIndex+=1
                    displayTextArray.push([tempString])
                }else{
                    displayTextArray[displayArrayIndex].push(tempString)
                }
            }
        }
        for(i=0; i<displayTextArray.length; i++){
            displayText += displayTextArray[i].join(" ")
            displayText += "\n"
        }
        log(displayText)
    }
    public screen (): void{
        cursorTo(0, 0)
        clearScreen()
        this.displayTitle()
        cursorTo(2, 0)
        this.textDisplayWithColors()
        cursorTo(15, 0)
        log(": "+this.currentWord)
    }
}