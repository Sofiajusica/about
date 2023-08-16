let flowField;
let resolution = 20;
let cols, rows;

function setup() {
  createCanvas(800, 600);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  flowField = new Array(cols * rows);
}

function draw() {
  background(220);

  // Update flow field based on mouse position
  updateFlowField(mouseX, mouseY);

  // Display flow field vectors with gradient colors
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let v = flowField[index];
      let col = color(map(v.heading(), -PI, PI, 0, 255), 150, 255);
      stroke(col);
      strokeWeight(2); // Adjust this value for thicker lines
      push();
      translate(x * resolution, y * resolution);
      rotate(v.heading());
      line(0, 0, resolution, 0);
      pop();
    }
  }
}

function updateFlowField(mx, my) {
  let yOffset = 0;
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = atan2(my - y * resolution, mx - x * resolution);
      let v = p5.Vector.fromAngle(angle);
      flowField[index] = v;
      xOffset += 0.1;
    }
    yOffset += 0.1;
  }
}
