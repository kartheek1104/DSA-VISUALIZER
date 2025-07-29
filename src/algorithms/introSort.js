export function* introSort(arr) {
  const maxDepth = 2 * Math.floor(Math.log2(arr.length));

  function* quick(arr, lo, hi, depth) {
    if (hi - lo <= 16) {
      yield* insertion(arr, lo, hi);
    } else if (depth === 0) {
      yield* heap(arr, lo, hi);
    } else {
      const pivot = arr[Math.floor((lo + hi) / 2)];
      let i = lo, j = hi;
      while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          yield { type: 'swap', newArray: [...arr], indices: [i, j] };
          i++; j--;
        }
      }
      if (lo < j) yield* quick(arr, lo, j, depth - 1);
      if (i < hi) yield* quick(arr, i, hi, depth - 1);
    }
  }

  function* insertion(arr, lo, hi) {
    for (let i = lo + 1; i <= hi; i++) {
      let key = arr[i], j = i - 1;
      while (j >= lo && arr[j] > key) {
        arr[j + 1] = arr[j];
        yield { type: 'set', newArray: [...arr], indices: [j + 1, j] };
        j--;
      }
      arr[j + 1] = key;
      yield { type: 'set', newArray: [...arr], indices: [j + 1] };
    }
  }

  function* heap(arr, lo, hi) {
    function* heapify(i, n) {
      let largest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && arr[lo + l] > arr[lo + largest]) largest = l;
      if (r < n && arr[lo + r] > arr[lo + largest]) largest = r;
      if (largest !== i) {
        [arr[lo + i], arr[lo + largest]] = [arr[lo + largest], arr[lo + i]];
        yield { type: 'swap', newArray: [...arr], indices: [lo + i, lo + largest] };
        yield* heapify(largest, n);
      }
    }

    const n = hi - lo + 1;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) yield* heapify(i, n);
    for (let i = n - 1; i > 0; i--) {
      [arr[lo], arr[lo + i]] = [arr[lo + i], arr[lo]];
      yield { type: 'swap', newArray: [...arr], indices: [lo, lo + i] };
      yield* heapify(0, i);
    }
  }

  yield* quick(arr, 0, arr.length - 1, maxDepth);
}
