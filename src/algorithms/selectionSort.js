export function* selectionSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [j, minIndex] };
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
      yield { type: 'swap', indices: [i, minIndex], newArray: [...a] };
    }
  }
}
