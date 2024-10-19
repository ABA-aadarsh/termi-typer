import chalk from "chalk";
import process from "node:process";
export const isAlphanumeric = (charCode: number): boolean => {
  return (
    (charCode >= 48 && charCode <= 57) || // 0-9
    (charCode >= 65 && charCode <= 90) || // A-Z
    (charCode >= 97 && charCode <= 122)   // a-z
  );
}

export const getTerminalWidth = (): number => {
  return process.stdout.columns
}

export const disableCursor = (): void => {
  process.stdout.write("\x1B[?25l");
}

export const enableCursor = (): void => {
  process.stdout.write("\x1B[?25h");
}

export const colorCodeWord = (word: string, referenceWord: string, isWordComplete: boolean = true): string => {
  let result: string = ""
  let i: number = 0
  for (i = 0; (i < word.length && i < referenceWord.length); i++) {
    if (word[i] == referenceWord[i]) {
      result += chalk.green(word[i])
    } else {
      result += chalk.red.underline(word[i])
    }
  }
  if (referenceWord.length < word.length) {
    result += chalk.red.underline(word.slice(i))
  } else if (referenceWord.length > word.length) {
    if (isWordComplete) {
      result += chalk.red.underline(referenceWord.slice(i))
    } else {
      result += chalk.grey(referenceWord.slice(i))
    }
  }
  return result
}

export const getStringLengthWithoutColorFormat = (str: string): number => {
  let result: number = 0
  const ansi_regex = /\x1B\[\d+m/g
  result = (str.replace(ansi_regex, "")).length
  return result
}