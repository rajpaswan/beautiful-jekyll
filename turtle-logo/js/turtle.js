class Turtle {

    constructor(cd, ct, x, y, dir, fg, bg) {
        this._cd = cd;                  // canvas for drawing
        this._ct = ct;                  // canvas for turtle
        this._x = x || width / 2;       // center x
        this._y = y || height / 2;      // center y
        this._dir = dir || 90;          // direction
        this._fg = fg || 'black';       // foreground color
        this._bg = bg || 'transparent'; // background color
        this._ts = true;                // turtle status
        this._ps = true;                // pen status
        this._pt = 4;                   // pen thickness
        this.updateTurtle();
    }

    showTurtle() {
        this._ts = true;
    }

    hideTurtle() {
        this._ts = false;
    }

    updateTurtle() {
        this._ct.clear();
        if (this._ts) {
            let size = 3 * this._pt;
            let edgeCol = color(this._fg);
            let bodyCol = color(this._fg);
            bodyCol.setAlpha(128);
            this._ct.push();
            this._ct.translate(this._x, this._y);
            this._ct.beginShape();
            this._ct.stroke(edgeCol);
            this._ct.fill(bodyCol);
            this._ct.strokeWeight(this._pt);
            for (let i = 0; i <= 3; ++i) {
                let theta = radians(this._dir) + i * TWO_PI / 3;
                let x = size * cos(theta);
                let y = size * sin(-theta);
                this._ct.vertex(x, y);
            }
            this._ct.endShape();
            this._ct.pop();
        }
    }

    penUp() {
        this._ps = false;
    }

    penDown() {
        this._ps = true;
    }

    penColor(col) {
        this._fg = col;
    }

    penThickness(thickness) {
        this._pt = thickness;
    }

    backgroundColor(col) {
        this._bg = col;
        this._cd.background(color(this._bg));
    }

    home() {
        this._x = width / 2;
        this._y = height / 2;
    }

    clear() {
        this._cd.clear();
        this._cd.background(color(this._bg));
    }

    forward(steps) {
        let px = this._x;
        let py = this._y;
        this._x += steps * cos(radians(this._dir));
        this._y += steps * sin(-radians(this._dir));
        if (this._ps) {
            this._cd.stroke(this._fg);
            this._cd.strokeWeight(this._pt);
            this._cd.line(this._x, this._y, px, py);
        }
    }

    backward(steps) {
        let px = this._x;
        let py = this._y;
        this._x -= steps * cos(radians(this._dir));
        this._y -= steps * sin(-radians(this._dir));
        if (this._ps) {
            this._cd.stroke(this._fg);
            this._cd.strokeWeight(this._pt);
            this._cd.line(this._x, this._y, px, py);
        }
    }

    left(angle) {
        this._dir += angle;
    }

    right(angle) {
        this._dir -= angle;
    }

    adjustDirection() {
        if (this._dir >= 360) {
            this._dir = this._dir % 360;
        }
        if (this._dir < 0) {
            this._dir = 360 - (-this._dir % 360);
        }
    }

    repeat(times, exp) {
        for (let count = 0; count < times; ++count) {
            this.execute(exp);
        }
    }

    execute(exp) {
        this.run(this.tokenize(exp));
        this.adjustDirection();
        this.updateTurtle();
    }

    tokenize(exp) {
        let tokens = exp.split(' ');
        let commands = [];
        let index = 0;
        while (index < tokens.length) {
            let cmd, steps, angle, times, col, thickness, filename, startIndex, endIndex, innerExp;
            switch (tokens[index]) {
                case 'home':
                case 'cs':
                case 'st':
                case 'ht':
                case 'pu':
                case 'pd':
                    cmd = tokens[index];
                    commands.push({
                        cmd: cmd
                    });
                    break;
                case 'pc':
                case 'bc':
                    cmd = tokens[index];
                    col = tokens[index + 1];
                    commands.push({
                        cmd: cmd,
                        col: col
                    });
                    break;
                case 'pt':
                    cmd = tokens[index];
                    thickness = tokens[index + 1];
                    commands.push({
                        cmd: cmd,
                        thickness: thickness
                    });
                    break;
                case 'fd':
                case 'bk':
                    cmd = tokens[index];
                    steps = tokens[index + 1];
                    commands.push({
                        cmd: cmd,
                        steps: int(steps)
                    });
                    index++;
                    break;
                case 'lt':
                case 'rt':
                    cmd = tokens[index];
                    angle = tokens[index + 1];
                    commands.push({
                        cmd: cmd,
                        angle: int(angle)
                    });
                    index++;
                    break;
                case 'export':
                    cmd = tokens[index];
                    filename = tokens[index + 1];
                    commands.push({
                        cmd: cmd,
                        filename: filename
                    });
                    break;
                case 'repeat':
                    cmd = tokens[index];
                    times = tokens[index + 1];
                    startIndex = index + 2;
                    endIndex = this.findEndIndex(tokens, startIndex);
                    if (endIndex != -1) {
                        innerExp = tokens.slice(startIndex + 1, endIndex).join(' ');
                        commands.push({
                            cmd: cmd,
                            times: int(times),
                            exp: innerExp
                        });
                        index = endIndex;
                    }
                    break;
            }
            index++;
        }
        return commands;
    }

    run(commands) {
        commands.forEach(async command => {
            switch (command.cmd) {
                case 'home':
                    this.home();
                    break;
                case 'cs':
                    this.clear();
                    break;
                case 'st':
                    this.showTurtle();
                    break;
                case 'ht':
                    this.hideTurtle();
                    break;
                case 'pu':
                    this.penUp();
                    break;
                case 'pd':
                    this.penDown();
                    break;
                case 'pc':
                    this.penColor(command.col);
                    break;
                case 'bc':
                    this.backgroundColor(command.col);
                    break;
                case 'pt':
                    this.penThickness(command.thickness);
                    break;
                case 'fd':
                    this.forward(command.steps);
                    break;
                case 'bk':
                    this.backward(command.steps);
                    break;
                case 'lt':
                    this.left(command.angle);
                    break;
                case 'rt':
                    this.right(command.angle);
                    break;
                case 'export':
                    this.export(command.filename);
                    break;
                case 'repeat':
                    this.repeat(command.times, command.exp);
                    break;
            }
        });
    }

    findEndIndex(args, start) {
        let stack = [];
        stack.push(start);
        for (let index = start + 1; index < args.length; ++index) {
            if (args[index] === '[') {
                stack.push(index);
            } else if (stack.length > 0 && args[stack[stack.length - 1]] === '[' && args[index] === ']') {
                stack.pop();
            }
            if (stack.length === 0) {
                return index;
            }
        }
        return -1;
    }

    export(filename) {
        saveCanvas(this._cd, filename, 'png');
    }

    updatePosition(elem) {
        let x = int((this._x - width / 2).toFixed(2));
        let y = int((height / 2 - this._y).toFixed(2));
        elem.html(`(${x === 0 ? '0.00' : x}, ${y === 0 ? '0.00' : y}) : ${this._dir}`);
    }
}