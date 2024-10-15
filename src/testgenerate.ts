export const createNewTestText : ()=>Promise<string> = async() => "Hello world this is termi-typer"
import fs from "node:fs/promises"

export const generateRandomList = async (length : number ) : Promise<string[]> => {
    let list : string[] = []
    const path = "./asset/words.json"
    const file = await fs.readFile(path, "utf-8")
    const data :{words: string[]} = JSON.parse(file)
    for(let i = 0; i<length; i++){
        list.push(data.words[Math.floor(Math.random()*data.words.length)])
    }
    return list
}