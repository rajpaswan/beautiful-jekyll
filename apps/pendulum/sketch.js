let L = 400; // length of string
let R = 30;  // radius of ball
let g = 10;  // gravty
let T = 0;   // time to swing

let cx = 0;  // centre x
let cy = 0;  // centre y
let bx = 0;  // ball x
let by = 0;  // ball y

let t = 0;   // current swing time
let a = 0;   // current swing angle

function setup() {
  createCanvas(window.windowWidth, window.windowHeight);

  spanA = createSpan('A');
  spanA.position(25, 50);
  sliderA = createSlider(0, PI / 2, PI / 4, 0.01);
  sliderA.position(50, 50);

  spanL = createSpan('L');
  spanL.position(25, 100);
  sliderL = createSlider(200, 500, 350, 1);
  sliderL.position(50, 100);

  valueA = createSpan(round(degrees(sliderA.value())));
  valueA.position(200, 50);
  valueL = createSpan(sliderL.value());
  valueL.position(200, 100);

  cx = window.windowWidth / 2;
  cy = window.windowHeight / 2 + L / 2;
  T = TWO_PI * sqrt(L / g);
}

function draw() {
  clear();

  let A = sliderA.value();   // amplitude angle
  let L = sliderL.value();   // length of string

  valueA.html(round(degrees(A)));
  valueL.html(L);

  // roof
  stroke('#a0a0a0');
  strokeWeight(10);
  line(cx - R, cy - L, cx + R, cy - L);

  // new center
  bx = cx + L * sin(a);
  by = cy - L * (1 - cos(a));

  // new angle
  a = A * cos(t * TWO_PI / T);
  t = t + 0.25;

  // string
  stroke('#a0a0a0');
  strokeWeight(5);
  line(cx, cy - L, bx, by);

  // ball
  noStroke();
  fill('#202020')
  circle(bx, by, R);
}
