function setup() {
  createCanvas(window.windowWidth, window.windowHeight);
  slider = createSlider(0, PI, PI/4, 0.1);
  slider.position(10, 10);
}

function draw() {
  background(51);
  stroke(0, 255, 0, 150);
  translate(width/2, height);
  let length = width < height ? width : height;
  branch(length/4);
}

function branch(len) {
  strokeWeight(floor(len * 0.25));
  line(0, 0, 0, -len);
  translate(0, -len);
  if(len > 4) {
    push();
    stroke(150, 255, 150, 150);
    rotate(-slider.value());
    branch(len * 0.67);
    pop();
    push();
    stroke(0, 255, 0, 150);
    rotate(slider.value());
    branch(len * 0.67);
    pop();

  }
}