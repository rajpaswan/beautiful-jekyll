function Ball(x, y, r, c) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;
  this.vx = this.r * map(noise(x), 0, 1, -1, 1);
  this.vy = this.r * map(noise(y), 0, 1, -1, 1);
}

Ball.prototype.draw = function () {
  noStroke();
  fill(this.c);
  circle(this.x, this.y, this.r);
  // fill(0);
  // textSize(this.r);
  // textStyle(BOLD);
  // textAlign(CENTER, CENTER);
  // text(floor(this.r), this.x, this.y);
}

Ball.prototype.translate = function () {
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.bounce = function (vx, vy) {
  if ((this.x - this.r < 0) || (this.x + this.r > width)) {
    this.vx = -this.vx;
  }
  if ((this.y - this.r < 0) || (this.y + this.r > height)) {
    this.vy = -this.vy;
  }
}

let n = 360;
let w = 20;
let balls = [];
let colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#101D1B'
];

function setup() {
  createCanvas(window.windowWidth, window.windowHeight);
  for (let i = 0; i < n; ++i) {
    let radius = (width <= height ? width : height) / 2 - 100;
    let angle = TWO_PI * i / n;
    balls[i] = new Ball(
      width / 2 + radius * cos(angle),
      height / 2 + radius * sin(angle),
      1 + w * noise(i),
      colors[i % colors.length]
    );
  }
}

function draw() {
  background(51);
  for (let i = 0; i < n; ++i) {
    let ball = balls[i];
    ball.draw();
    ball.translate();
    ball.bounce(width, height);
  }
}