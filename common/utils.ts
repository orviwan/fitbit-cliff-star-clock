// Add zero in front of numbers < 10
export function zeroPad(i: number): string {
  if (i < 10) {
    return "0" + i;
  }

  return String(i);
}
