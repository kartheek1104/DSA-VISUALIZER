export function* timSort(arr) {
  const RUN = 32;
  const n = arr.length;

  const insertionSort = function* (arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
      let temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        arr[j + 1] = arr[j];
        yield { type: 'set', newArray: [...arr], indices: [j, j + 1] };
        j--;
      }
      arr[j + 1] = temp;
      yield { type: 'set', newArray: [...arr], indices: [j + 1] };
    }
  };

  const merge = function* (arr, l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      yield { type: 'set', newArray: [...arr], indices: [k] };
      k++;
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      yield { type: 'set', newArray: [...arr], indices: [k - 1] };
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      yield { type: 'set', newArray: [...arr], indices: [k - 1] };
    }
  };

  for (let i = 0; i < n; i += RUN) {
    yield* insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
  }

  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) yield* merge(arr, left, mid, right);
    }
  }
}
