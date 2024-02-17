/** @returns The iso string without the Z part */
export function toSimpleISOString(date: Date): string {
  return date.toISOString().split('Z')[0];
}
