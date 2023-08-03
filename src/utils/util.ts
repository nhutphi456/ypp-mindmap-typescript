export function uniqueID(): string {
  return Math.floor(Math.random() * Date.now()).toString();
}

export function swap<T>(
  firstIndex: number,
  secondIndex: number,
  array: Array<T>
): void {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}
