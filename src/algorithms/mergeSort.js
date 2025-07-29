export function* mergeSort(arr) {
  const a = [...arr];
  const temp = [...a];

  function* merge(l, m, r) {
    let i = l, j = m + 1, k = l;
    while (i <= m && j <= r) {
      yield { type: 'compare', indices: [i, j] };
      if (a[i] <= a[j]) temp[k++] = a[i++];
      else temp[k++] = a[j++];
    }
    while (i <= m) temp[k++] = a[i++];
    while (j <= r) temp[k++] = a[j++];
    for (let p = l; p <= r; p++) {
      a[p] = temp[p];
      yield { type: 'set', index: p, value: temp[p], newArray: [...a] };
    }
  }

  function* divide(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    yield* divide(l, m);
    yield* divide(m + 1, r);
    yield* merge(l, m, r);
  }

  yield* divide(0, a.length - 1);
}
