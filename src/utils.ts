export function isAlphanumeric(charCode: number): boolean {
    return (
      (charCode >= 48 && charCode <= 57) || // 0-9
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122)   // a-z
    );
}