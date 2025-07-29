export function* countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(arr.length);

  // Counting occurrences with highlights
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    yield { type: 'set', indices: [i], newArray: [...arr] };
  }

  // Modify count array
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  // Build output array with highlights
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    yield { type: 'set', indices: [i], newArray: [...output] };
    count[arr[i]]--;
  }

  // Copy back to arr with highlights
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
    yield { type: 'set', indices: [i], newArray: [...arr] };
  }
}
