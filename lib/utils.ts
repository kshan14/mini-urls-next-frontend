export function optionalParseToInt(value: any, defaultValue: number): number {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  try {
    return parseInt(value);
  } catch (err) {
    return defaultValue;
  }
}
