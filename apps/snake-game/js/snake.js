function Snake(soundEffects) {
    this.width = 20;
    this.head = createVector(floor(width / (2 * this.width)), floor(height / (2 * this.width)));

    this.tail = [];
    this.length = 0;

    this.velocity = createVector(0, 0);
    this.food = spawnFood(this.width);

    this.soundEffects = soundEffects;

    this.show = function () {
        drawWalls(this.width);
        drawHead(this.head, this.width, this.velocity);
        drawTail(this.tail, this.width);
        drawFood(this.food, this.width);
    }

    this.direction = function (dx, dy) {
        if (this.velocity.x != -dx) {
            this.velocity.x = dx;
        }
        if (this.velocity.y != -dy) {
            this.velocity.y = dy;
        }
    }

    this.move = function () {
        // check food
        if (dist(this.food.x, this.food.y, this.head.x, this.head.y) == 0) {
            this.soundEffects['food_bite'].play();
            this.food = spawnFood(this.width);
            this.length++;
        }
        // check if head steps on tail
        let tailIndex = stepsOn(this.head, this.tail);
        if (tailIndex != -1) {
            this.soundEffects['tail_bite'].play();
            this.tail.splice(0, tailIndex + 1);
            this.length = this.length - tailIndex - 1;
        }
        // save tail
        this.tail.push(this.head.copy());
        while (this.tail.length > this.length) {
            this.tail.shift();
        }
        // move head
        this.head.add(this.velocity);
        // wrap edges
        if (this.head.x < 1) {
            this.head.x = floor(width / this.width) - 1;
        } else if (this.head.x >= floor(width / this.width)) {
            this.head.x = 1;
        }
        if (this.head.y < 1) {
            this.head.y = floor(height / this.width) - 1;
        } else if (this.head.y >= floor(height / this.width)) {
            this.head.y = 1;
        }
    }
}

function spawnFood(w) {
    return createVector(
        floor(random(1, floor(width / w) - 1)),
        floor(random(1, floor(height / w) - 1))
    );
}

function stepsOn(head, tail) {
    for (let i in tail) {
        if (head.x === tail[i].x && head.y === tail[i].y) {
            return int(i);
        }
    }
    return -1;
}

function drawWalls(w) {
    let mx = floor(width / w);
    let my = floor(height / w);
    stroke(color(255, 255, 0, 150));
    noFill();
    rect(w / 2, w / 2, (mx - 1) * w, (my - 1) * w);
}

function drawHead(p, w, v) {
    noStroke();
    fill(color(0, 255, 0, 255));
    push();
    translate(p.x * w, p.y * w);
    rectMode(CENTER);
    if (v.x == -1) {
        rect(0, 0, w - 2, w - 2, w / 2 - 1, 0, 0, w / 2 - 1);
    } else if (v.x == 1) {
        rect(0, 0, w - 2, w - 2, 0, w / 2 - 1, w / 2 - 1, 0);
    } else if (v.y == -1) {
        rect(0, 0, w - 2, w - 2, w / 2 - 1, w / 2 - 1, 0, 0);
    } else if (v.y == 1) {
        rect(0, 0, w - 2, w - 2, 0, 0, w / 2 - 1, w / 2 - 1);
    } else {
        rect(0, 0, w - 2, w - 2, w / 2 - 1);
    }
    pop();
}

function drawTail(t, w) {
    for (let i = 0; i < t.length; ++i) {
        let p = t[i]
        noStroke();
        fill(color(0, 255, 0, map(i, 0, t.length, 50, 200)));
        push();
        translate(p.x * w, p.y * w);
        rectMode(CENTER);
        rect(0, 0, w - 2, w - 2);
        pop();
    }
}

function drawFood(p, w) {
    noStroke();
    fill(color(255, 0, 0));
    push();
    translate(p.x * w, p.y * w);
    rectMode(CENTER);
    if (frameCount % 10 == 0) {
        ellipse(0, 0, w / 2, w / 2);
    } else {
        ellipse(0, 0, w - 2, w - 2);
    }
    pop();
}

// function drawCell(p, w, c) {
//     noStroke();
//     fill(c);
//     push();
//     translate(p.x * w, p.y * w);
//     rectMode(CENTER);
//     rect(0, 0, w - 2, w - 2);
//     pop();
// }