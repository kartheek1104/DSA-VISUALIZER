export function* cycleSort(arr) {
  const n = arr.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i++) {
      if (arr[i] < item) pos++;
    }

    if (pos === cycleStart) continue;

    while (item === arr[pos]) pos++;
    [arr[pos], item] = [item, arr[pos]];
    yield { type: 'swap', newArray: [...arr], indices: [cycleStart, pos] };

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      [arr[pos], item] = [item, arr[pos]];
      yield { type: 'swap', newArray: [...arr], indices: [cycleStart, pos] };
    }
  }
}
