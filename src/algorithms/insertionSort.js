export function* insertionSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      yield { type: 'compare', indices: [j, j + 1] };
      a[j + 1] = a[j];
      yield { type: 'swap', indices: [j, j + 1], newArray: [...a] };
      j--;
    }
    a[j + 1] = key;
    yield { type: 'set', index: j + 1, value: key, newArray: [...a] };
  }
}
