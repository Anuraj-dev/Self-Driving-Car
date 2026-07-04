# Self-Driving Car

A self-driving car simulation built from scratch in plain JavaScript and HTML5 Canvas — no libraries, no frameworks, just a neural network, raycast sensors, and a genetic mutation loop evolving cars that learn to drive themselves.

## What it does

A population of cars spawns on a procedurally generated multi-lane road and drives through oncoming traffic. Each car is controlled by its own small neural network that reads five raycast "sensor" distances and outputs steering/throttle decisions. Cars that crash are marked as damaged and stop updating; the survivor that has traveled the farthest is treated as the fittest and tracked by the camera. Its brain can be saved to `localStorage` and used to seed the next generation with small random mutations, so re-running the simulation gradually improves driving behavior over successive sessions.

## Features

- **From-scratch neural network** (`network.js`) — a feed-forward network with configurable layer sizes, per-connection weights and biases, and a `mutate` function that nudges an existing network's weights/biases toward random values by a tunable amount (basic evolutionary mutation, no backpropagation).
- **Raycast sensors** (`sensor.js`) — each AI car casts 5 rays in a forward-facing spread, detecting intersections with road borders and other cars, and feeding the normalized distances into the car's network as input.
- **Procedurally generated road** (`roads.js`) — an infinite 3-lane road with configurable width and lane count, rendered with dashed lane markers and solid borders.
- **Live network visualizer** (`visualizer.js`) — renders the best car's neural network on a side canvas in real time, showing input/output activations, weights (as colored/opacity-coded connections), and biases as the car drives.
- **Traffic and collision detection** — scripted dummy cars drive at fixed speed in fixed lanes; polygon-intersection collision detection marks a car as damaged on contact with traffic or road borders.
- **Save / discard brain** — buttons in the UI persist the current best-performing network to `localStorage` (💾) or clear it (🗑️), letting you carry progress across page reloads.
- **Manual driving mode** — the `Controls` class also supports arrow-key input, so a car can be driven manually instead of by its network.

## Tech stack

- Vanilla JavaScript (ES6 classes, private fields)
- HTML5 Canvas 2D rendering
- No build tools, no external dependencies

## Getting started

No install or build step is required.

```bash
git clone https://github.com/Anuraj-dev/Self-Driving-Car.git
cd Self-Driving-Car
```

Then simply open `index.html` in a browser (or serve the folder with any static server, e.g. `npx serve .`), and the simulation starts automatically.

To evolve the network across runs:
1. Let the simulation run for a while.
2. Click the 💾 button to save the current best brain to `localStorage`.
3. Reload the page — the new generation starts from that saved brain with small random mutations applied.
4. Click 🗑️ at any point to discard the saved brain and start fresh.

## Project structure

```
index.html      Canvas setup and script includes
style.css       Page layout/styling
main.js         Simulation bootstrap: generates cars/traffic, animation loop, save/discard
car.js          Car physics, sensor/brain wiring, collision detection, drawing
sensor.js       Raycasting and intersection-based distance sensing
network.js      Neural network (NeuralNetwork/Level) and mutation logic
roads.js        Procedural multi-lane road generation and rendering
visualizer.js   Live rendering of the neural network's structure and activity
controls.js     Keyboard input (manual driving) and dummy/AI control wiring
utils.js        Shared math helpers (lerp, line intersection, color mapping)
```
