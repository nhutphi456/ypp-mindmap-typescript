export function swap<T>(
  firstIndex: number,
  secondIndex: number,
  array: Array<T>
): void {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}
