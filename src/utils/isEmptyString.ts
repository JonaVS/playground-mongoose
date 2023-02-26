//This function will return true, indicating that the string is not empty, null, or only whitespace.
export const isNonEmptyString = (val: string): boolean => {
  return /\S/.test(val);
}