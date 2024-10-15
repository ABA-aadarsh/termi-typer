import process from "node:process";
export const  isAlphanumeric = (charCode: number): boolean => {
    return (
      (charCode >= 48 && charCode <= 57) || // 0-9
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122)   // a-z
    );
}

export const getTerminalWidth = ():number => {
  return process.stdout.columns
}

export const disableCursor = ():void => {
  process.stdout.write("\x1B[?25l");
}

export const enableCursor = ():void => {
  process.stdout.write("\x1B[?25h");
}