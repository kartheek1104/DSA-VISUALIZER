export function* quickSort(arr) {
  const a = [...arr];

  function* qs(start, end) {
    if (start >= end) return;
    let pivot = a[end];
    let i = start;
    for (let j = start; j < end; j++) {
      yield { type: 'compare', indices: [j, end] };
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield { type: 'swap', indices: [i, j], newArray: [...a] };
        i++;
      }
    }
    [a[i], a[end]] = [a[end], a[i]];
    yield { type: 'swap', indices: [i, end], newArray: [...a] };
    yield* qs(start, i - 1);
    yield* qs(i + 1, end);
  }

  yield* qs(0, a.length - 1);
}
