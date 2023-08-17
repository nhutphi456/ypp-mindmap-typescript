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

export function splitArrayInHalf<T>(arr: T[]) {
  // Calculate the middle index
  let middleIndex = Math.floor(arr.length / 2);

  // Split the array into two halves
  let firstHalf = arr.slice(0, middleIndex);
  let secondHalf = arr.slice(middleIndex);

  // Return the two halves
  return [firstHalf, secondHalf];
}

