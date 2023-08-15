export function swap<T>(
  firstIndex: number,
  secondIndex: number,
  array: Array<T>
): void {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

export function removeItemById<T>(id: string, list: T[]): T[]{
  return list.filter((list: any) => list.id !== id)
}

