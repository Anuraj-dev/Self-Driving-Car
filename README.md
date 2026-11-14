<h1 align="center">Self-Driving Car</h1>

<p align="center">
  A self-driving car simulation in plain JavaScript and HTML5 Canvas.<br />
  Each car steers with a neural network that you can save and reload.
</p>

<p align="center">
  <a href="#running-it">Run it</a>
  ·
  <a href="#how-it-works">How it works</a>
  ·
  <a href="#project-structure">Project structure</a>
</p>

Self-Driving Car starts 99 AI cars in the middle lane of a three-lane road, 180 px wide. Thirteen slower traffic cars already drive ahead of them, in the same direction. Each AI car reads five distance sensors and sets four controls every frame: forward, left, right and reverse.

It is plain JavaScript with no libraries and no build step. Open `index.html` in a browser and the run starts. The only thing it stores is one `localStorage` entry, `bestBrain`, and only after you click save.

## What you get

- **A neural network written from scratch.** `network.js` builds a feed-forward network with layers of 5, 6 and 4 neurons. A neuron outputs 1 when its weighted input sum is greater than its bias, and 0 otherwise. There is no backpropagation, so nothing trains the weights.
- **Five raycast sensors.** Each car casts five rays across a 90 degree arc, 150 px long. A ray reports its nearest hit on a road border or a traffic car. The network gets 1 minus that hit distance as a fraction of the ray length, or 0 when the ray hits nothing. Closer objects read higher.
- **Collisions freeze a car.** Each car is a 30 by 50 px rectangle. Every frame it checks whether its edges cross a road border or a traffic car. A crashed car stops moving and loses its color tint, but it stays on screen.
- **Scripted traffic.** Thirteen dummy cars hold a speed of 2 in fixed lanes. AI cars can reach 4, so they pass traffic by steering around it.
- **A live view of the leader.** `visualizer.js` draws the network of the leader, the car furthest up the road, on a 300 px canvas beside the road. Positive weights are yellow and negative weights are blue, with opacity set by size. Node fills show the current values, dashed rings show the biases, and the outputs carry arrow labels for forward, left, right and reverse.
- **Save the leader's brain.** The save button writes the leader's network to `localStorage` under `bestBrain`. The discard button deletes it. On the next page load, the first car gets the saved network unchanged. Each of the other 98 gets a copy with every weight and bias moved 11% of the way toward a random value.

## Running it

No install and no build step. Clone the repo, then open the page:

```sh
git clone https://github.com/Anuraj-dev/Self-Driving-Car.git
cd Self-Driving-Car
```

Open `index.html` in a browser. To serve the folder over HTTP instead, run any static server, for example:

```sh
npx serve .
```

### Keep a brain across reloads

1. Let the cars run for a while, and watch the leader in the network view.
2. Click the save button to store the leader's brain.
3. Reload the page. The new cars start from the saved brain, with small random mutations applied.
4. Click the discard button to delete the saved brain. The next reload starts from random networks.

## How it works

Each animation frame runs the same steps. Traffic moves first. Then each AI car applies the controls its network set on the previous frame. Forward adds speed up to 4, and reverse drives backward at up to 2. Left and right turn the car 0.03 radians per frame while it moves. Speed decays by 0.05 per frame.

After it moves, the car checks for collisions, casts its sensors, and runs its network to set the next controls. Once every car has updated, the car with the smallest `y` becomes the leader. The camera centers on it, the network view draws it, and the save button stores it.

Nothing scores a car or ends a generation. Cars run until they crash, and only a page reload starts a new generation. The arrow-key code in `controls.js` is not used yet, because no car is created with the `KEYS` type.

## Project structure

| File | What it does |
| --- | --- |
| `index.html` | Page with the road canvas, the save and discard buttons, and the network canvas |
| `style.css` | Lays the three items out in a row and sets the background colors |
| `main.js` | Creates cars and traffic, runs the animation loop, picks the leader, and saves or discards the brain |
| `car.js` | Car physics, collision checks, sensor and network wiring, and drawing |
| `sensor.js` | The five raycasts and their nearest-hit readings |
| `network.js` | Feed-forward network, the step-activation levels, and mutation |
| `roads.js` | Road borders, lane centers, and lane markings |
| `visualizer.js` | Draws the leader's network |
| `controls.js` | The four control flags, and the arrow-key listeners for the `KEYS` type |
| `utils.js` | `lerp`, segment intersection, polygon overlap, and color helpers |
| `car.png` | The 64 by 107 pixel car sprite that each car tints |

## License

MIT. See [LICENSE](LICENSE).
