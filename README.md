# Sorting Algorithm Visualizer

A React-based interactive web application that visualizes various sorting algorithms in action. This project helps users understand how different sorting algorithms work by animating the sorting process with customizable speed and array size.

## Features

- Visualizes 14 sorting algorithms, including:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Quick Sort
  - Merge Sort
  - Heap Sort
  - Counting Sort
  - Radix Sort
  - Tim Sort
  - Intro Sort
  - Shell Sort
  - Comb Sort
  - Cycle Sort

- Interactive controls to:
  - Select sorting algorithm
  - Play, pause, and step through sorting
  - Reset with a new random array
  - Adjust sorting speed

- Dark and light theme toggle for comfortable viewing

- Displays algorithm description and time/space complexities

- Responsive design adapts to different screen sizes

## Tech Stack

- React (with Hooks)
- react-p5 for canvas-based visualization
- JavaScript (ES6+)
- CSS custom properties for theming

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/dsa-visualizer.git
cd dsa-visualizer
```
#Install dependencies:

```bash
npm install
```
# or
```bash
yarn install
```
# Start the development server:

``` bash
npm start
```
# or
```bash
yarn start
```
Open http://localhost:3000 to view in the browser.

Build for Production
 ```bash
npm run build
```
# or
```bash
yarn build
```
The build folder contains the production-ready app.

# How It Works
- Generates a random array of values.
- Visualizes the sorting process on a canvas using p5.js.
- Highlights elements being compared or swapped.
- Allows control over the speed of animation.
- Displays details about the currently selected algorithm.