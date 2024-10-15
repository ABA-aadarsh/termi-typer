import process from "node:process"
import { Buffer } from "node:buffer"
import { TyperProgram } from "./Typer.js"
import { isAlphanumeric } from "./utils.js"

const fps = 10

const sampleText : string [] = ["hello", "world", "my", "name", "is", "aadarsh"]
const typer = new TyperProgram(sampleText, fps)
const commands  = {
    exit: '\u0003', // CTRL + C
}

process.stdin.setRawMode(true)
process.stdin.setEncoding("utf-8")
process.stdin.on("data", (key:Buffer)=>{
    if(String(key)==commands.exit){
        process.stdin.pause()
        process.exit(101)
    }
    typer.inputChar(String(key))
})


setInterval(() => {
    typer.screen();
},1000/fps)