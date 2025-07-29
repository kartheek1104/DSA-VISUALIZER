function countingSortForRadix(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);

  return (function* () {
    // Count occurrences for digits at exp place
    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
      yield { type: 'set', indices: [i], newArray: [...arr] };
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      yield { type: 'set', indices: [i], newArray: [...output] };
      count[Math.floor(arr[i] / exp) % 10]--;
    }

    // Copy output to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      yield { type: 'set', indices: [i], newArray: [...arr] };
    }
  })();
}

export function* radixSort(arr) {
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Use the generator from countingSortForRadix for each digit place
    const gen = countingSortForRadix(arr, exp);
    let result = gen.next();
    while (!result.done) {
      yield result.value;
      result = gen.next();
    }
  }
}
