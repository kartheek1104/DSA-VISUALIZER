export function* bubbleSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { type: 'swap', indices: [j, j + 1], newArray: [...a] };
      }
    }
  }
}
