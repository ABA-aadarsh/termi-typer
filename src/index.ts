import process from "node:process"
import { Buffer } from "node:buffer"
import { TyperProgram } from "./Typer.js"
import {generateRandomList} from "./testgenerate.js"
import { disableCursor, enableCursor } from "./utils.js"

const fps = 10

const sampleText : string [] = await generateRandomList(40)
const typer = new TyperProgram(sampleText, fps)
const commands  = {
    exit: '\u0003', // CTRL + C
}

process.stdin.setRawMode(true)
process.stdin.setEncoding("utf-8")
disableCursor()
process.stdin.on("data", (key:Buffer)=>{
    if(String(key)==commands.exit){
        process.stdin.pause()
        enableCursor()
        process.exit(101)
    }
    typer.inputChar(String(key))
})


setInterval(() => {
    typer.screen();
},1000/fps)