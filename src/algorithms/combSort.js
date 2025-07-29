export function* combSort(arr) {
  const shrink = 1.3;
  let gap = arr.length;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < arr.length; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        yield { type: 'swap', newArray: [...arr], indices: [i, i + gap] };
        sorted = false;
      }
    }
  }
}
