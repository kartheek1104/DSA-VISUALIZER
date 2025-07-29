export function* heapSort(arr) {
  const a = [...arr];
  const n = a.length;

  function* heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      yield { type: 'compare', indices: [left, largest] };
      if (a[left] > a[largest]) largest = left;
    }

    if (right < size) {
      yield { type: 'compare', indices: [right, largest] };
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== root) {
      [a[root], a[largest]] = [a[largest], a[root]];
      yield { type: 'swap', indices: [root, largest], newArray: [...a] };
      yield* heapify(size, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i >= 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    yield { type: 'swap', indices: [0, i], newArray: [...a] };
    yield* heapify(i, 0);
  }
}
