let snake;
let dx = 0;
let dy = 0;
let paused = false;
let score = 0;
let speed = 10;

let soundEffects = {};

function preload() {
  soundEffects['food_bite'] = loadSound('assets/food_bite.wav');
  soundEffects['speed_up'] = loadSound('assets/speed_up.wav');
  soundEffects['tail_bite'] = loadSound('assets/tail_bite.wav');
}

function setup() {
  createCanvas(window.windowWidth, window.windowHeight);
  frameRate(speed);
  noCursor();
  snake = new Snake(soundEffects);
}

function draw() {
  background(0);
  snake.direction(dx, dy);
  snake.move();
  snake.show();
  evalScoreAndShow();
}

function evalScoreAndShow() {
  score = snake.length;
  if (10 + floor(score / 10) > speed) {
    soundEffects['speed_up'].play();
    speed++;
    frameRate(speed);
  }
  textSize(32);
  textAlign(RIGHT);
  fill(color(255, 255, 0, 150));
  text(score, width - 30, 50);
}

function keyPressed() {
  if (keyCode === unchar(' ')) {
    paused = !paused;
    if (paused) {
      noLoop();
    } else {
      loop();
    }
  } else if (!paused) {
    let _dx = 0;
    let _dy = 0;
    switch (keyCode) {
      case LEFT_ARROW:
        _dx = -1;
        break;
      case UP_ARROW:
        _dy = -1;
        break;
      case RIGHT_ARROW:
        _dx = 1;
        break;
      case DOWN_ARROW:
        _dy = 1;
        break;
    }
    if (_dx != 0 || _dy != 0) {
      dx = _dx;
      dy = _dy;
    }
  }
}