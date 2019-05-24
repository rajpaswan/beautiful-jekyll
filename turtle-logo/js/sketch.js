let turtle;
let canvas1, canvas2;
let cmdInput, posText;
let history = [];
let historyCount = 0;
let historyIndex = -1;

function preload() {
  historyCount = localStorage.getItem('HISTORY_COUNT') || 0;
  historyIndex = historyCount > 0 ? historyCount : -1;
  history = JSON.parse(localStorage.getItem('HISTORY_ARRAY') || '[]');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas1 = createGraphics(windowWidth, windowHeight);
  canvas2 = createGraphics(windowWidth, windowHeight);

  turtle = new Turtle(canvas1, canvas2);

  cmdInput = createInput('', 'text');
  cmdInput.elt.id = 'command';
  cmdInput.elt.placeholder = 'your code here';
  cmdInput.elt.focus();

  posText = createSpan('(0.00, 0.00) : 90');
  posText.elt.id = 'position';
}

function draw() {
  background('transparent');
  image(canvas1, 0, 0);
  image(canvas2, 0, 0);
}

function keyPressed() {
  if (keyCode === ENTER) {
    let exp = cmdInput.value().trim();
    if (exp !== '') {
      turtle.execute(exp);
      turtle.updatePosition(posText);
      if (historyCount == 0) {
        history.push(exp);
        historyCount++;
        historyIndex = 0;
      } else {
        let last = history[historyCount - 1];
        if (last !== exp) {
          history.push(exp);
          historyCount++;
          historyIndex = historyIndex;
        }
      }
      if (historyCount > 0) {
        localStorage.setItem('HISTORY_COUNT', historyCount);
        localStorage.setItem('HISTORY_ARRAY', JSON.stringify(history));
      }
    }
  } else if (keyCode === UP_ARROW) {
    if (historyCount > 0 && historyIndex > 0) {
      historyIndex = historyIndex - 1;
      let exp = history[historyIndex];
      cmdInput.value(exp);
    }
  } else if (keyCode === DOWN_ARROW) {
    if (historyCount > 0 && historyIndex < historyCount - 1) {
      historyIndex = historyIndex + 1;
      let exp = history[historyIndex];
      cmdInput.value(exp);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //canvas1.resizeCanvas(windowWidth, windowHeight);
  //canvas2.resizeCanvas(windowWidth, windowHeight);
  redraw();
}