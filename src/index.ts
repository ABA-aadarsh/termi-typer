import process from "node:process"
import { Buffer } from "node:buffer"
import { TyperProgram } from "./Typer.js"
import {generateRandomList} from "./testgenerate.js"
import { disableCursor, enableCursor, log } from "./utils.js"
import colorChalk from "./Color.js"

const fps = 10

const sampleText : string [] = await generateRandomList(20)
const typer = new TyperProgram(sampleText, fps)
const commands  = {
    exit: '\u0003', // CTRL + C
}

process.stdin.setRawMode(true)
process.stdin.setEncoding("utf-8")
disableCursor()
process.stdin.resume()
process.stdin.on("data", (key:Buffer)=>{
    const pressedKey : string = String(key)
    if(pressedKey==commands.exit){
        process.stdin.pause()
        process.stdout.cursorTo(0,0)
        process.stdout.clearScreenDown()
        enableCursor()
        process.exit(101)
    }

    typer.inputChar(String(key))
})

setInterval(()=>{
    typer.screen()
}, 1000/fps)