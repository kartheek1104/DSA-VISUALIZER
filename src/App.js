import React, { useState, useEffect, useRef } from 'react';
import Sketch from 'react-p5';

import { bubbleSort } from './algorithms/bubbleSort';
import { selectionSort } from './algorithms/selectionSort';
import { insertionSort } from './algorithms/insertionSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import { heapSort } from './algorithms/heapSort';
import { countingSort } from './algorithms/countingSort';
import { radixSort } from './algorithms/radixSort';
import { timSort } from './algorithms/timSort';
import { introSort } from './algorithms/introSort';
import { shellSort } from './algorithms/shellSort';
import { combSort } from './algorithms/combSort';
import { cycleSort } from './algorithms/cycleSort';

/* ---------------- Algorithm registry ---------------- */

const ALGO_MAP = {
  'Bubble Sort': bubbleSort,
  'Selection Sort': selectionSort,
  'Insertion Sort': insertionSort,
  'Quick Sort': quickSort,
  'Merge Sort': mergeSort,
  'Heap Sort': heapSort,
  'Counting Sort': countingSort,
  'Radix Sort': radixSort,
  'Tim Sort': timSort,
  'Intro Sort': introSort,
  'Shell Sort': shellSort,
  'Comb Sort': combSort,
  'Cycle Sort': cycleSort,
};

const ALGO_INFO = {
  'Bubble Sort': {
    description:
      'Repeatedly steps through the list, compares adjacent elements and swaps them if needed.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Selection Sort': {
    description:
      'Selects the smallest element and places it at the beginning, one by one.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Insertion Sort': {
    description:
      'Builds the sorted array one element at a time by comparing and inserting.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Quick Sort': {
    description:
      'Divides the array around a pivot and sorts the partitions recursively.',
    timeComplexity: 'O(n log n) avg, O(n²) worst',
    spaceComplexity: 'O(log n)',
  },
  'Merge Sort': {
    description:
      'Divides the array, sorts the halves, then merges them back together.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  'Heap Sort': {
    description: 'Builds a max‑heap and repeatedly extracts the largest.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
  },
  'Counting Sort': {
    description: 'Counts element frequencies, then reconstructs the array.',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
  },
  'Radix Sort': {
    description: 'Sorts integers digit by digit from least‑ to most‑significant.',
    timeComplexity: 'O(n k)',
    spaceComplexity: 'O(n + k)',
  },
  'Tim Sort': {
    description: 'Stable hybrid of merge sort and insertion sort (Python/Java default).',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
  },
  'Intro Sort': {
    description:
      'Starts as quick sort, switches to heap sort if recursion is too deep.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
  },
  'Shell Sort': {
    description: 'Gap‑based insertion sort that decreases the gap each pass.',
    timeComplexity: '≈ O(n log² n) avg',
    spaceComplexity: 'O(1)',
  },
  'Comb Sort': {
    description: 'Bubble sort variant that eliminates turtles via shrinking gap.',
    timeComplexity: '≈ O(n²)',
    spaceComplexity: 'O(1)',
  },
  'Cycle Sort': {
    description: 'In‑place algorithm that minimizes write operations.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
};

/* ---------------- Main component ---------------- */

export default function App() {
  /* ----- state ----- */
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [highlight, setHighlight] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  /* ----- refs ----- */
  const genRef = useRef(null);
  const timerRef = useRef(null);

  /* ----- constants ----- */
  const ARRAY_SIZE = 50;
  const randomArray = () =>
    Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 300) + 10);

  /* ----- generator reset ----- */
  const resetGenerator = (arr = array) => {
    genRef.current = ALGO_MAP[algorithm](arr);
  };

  /* ----- initialize ----- */
  useEffect(() => {
    const arr = randomArray();
    setArray(arr);
    resetGenerator(arr);
  }, []);

  /* ----- change algorithm ----- */
  useEffect(() => {
    setIsPlaying(false);
    setHighlight([]);
    resetGenerator();
  }, [algorithm]);

  /* ----- play loop ----- */
  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timerRef.current);
      return;
    }
    const loopStep = () => {
      const { value, done } = genRef.current.next();
      if (done) {
        setIsPlaying(false);
        setHighlight([]);
        return;
      }
      if (value) {
        const { type, indices = [], newArray } = value;
        if (type === 'swap' || type === 'set') setArray(newArray);
        setHighlight(indices);
      }
      timerRef.current = setTimeout(loopStep, Math.max(1, 1000 / speed));
    };
    loopStep();
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, speed]);

  /* ----- single‑step ----- */
  const stepSort = () => {
    if (!genRef.current) return;
    const { value, done } = genRef.current.next();
    if (done) {
      setIsPlaying(false);
      setHighlight([]);
      return;
    }
    if (value) {
      const { type, indices = [], newArray } = value;
      if (type === 'swap' || type === 'set') setArray(newArray);
      setHighlight(indices);
    }
  };

  /* ----- reset ----- */
  const handleReset = () => {
    clearTimeout(timerRef.current);
    const arr = randomArray();
    setArray(arr);
    setHighlight([]);
    setIsPlaying(false);
    resetGenerator(arr);
  };

  /* ----- responsive canvas ----- */
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });
  useEffect(() => {
    const update = () => {
      setCanvasSize({
        width: Math.min(800, window.innerWidth * 0.9),
        height: Math.min(400, window.innerHeight * 0.55),
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ----- theme class on body ----- */
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  /* ----- p5 setup/draw ----- */
  const setup = (p5, parent) => {
    p5.createCanvas(canvasSize.width, canvasSize.height).parent(parent);
    p5.frameRate(60);
  };

  const draw = (p5) => {
    const css = getComputedStyle(document.documentElement);
    const bg = css.getPropertyValue(
      darkMode ? '--background-color-dark' : '--background-color-light'
    );
    const bar = css.getPropertyValue(
      darkMode ? '--bar-color-dark' : '--bar-color-light'
    );
    const hi = css.getPropertyValue(
      darkMode ? '--highlight-color-dark' : '--highlight-color-light'
    );

    p5.background(bg.trim());
    const w = p5.width / array.length;
    for (let i = 0; i < array.length; i++) {
      p5.fill(highlight.includes(i) ? hi.trim() : bar.trim());
      p5.rect(i * w, p5.height - array[i], w, array[i]);
    }
  };

  /* ----- JSX ----- */
  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      {/* top bar */}
      <div className="top-bar">
        <h1>Sorting Algorithm Visualizer</h1>
        <button
          className="toggle-theme-btn"
          onClick={() => setDarkMode((m) => !m)}
          type="button"
          aria-label="Toggle dark/light mode"
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* controls */}
      <div className="controls">
        <select
          key={algorithm} /* fixes text redraw */
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isPlaying}
        >
          {Object.keys(ALGO_MAP).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button onClick={handleReset} disabled={isPlaying}>
          🔄 Reset
        </button>
        <button onClick={() => setIsPlaying((p) => !p)}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={stepSort} disabled={isPlaying}>
          ⏭ Step
        </button>

        <label className="speed-label">
           Speed:
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
          />
          {speed}x
        </label>
      </div>

      {/* algorithm info */}
      <div className="algo-info">
        <h2>{algorithm}</h2>
        <p>{ALGO_INFO[algorithm].description}</p>
        <p>
          <strong>Time:</strong> {ALGO_INFO[algorithm].timeComplexity} &nbsp;&nbsp;
          <strong>Space:</strong> {ALGO_INFO[algorithm].spaceComplexity}
        </p>
      </div>

      {/* canvas */}
      <div className="canvas-wrapper">
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
}
