class Turtle {

    constructor(cd, ct, x, y, d, pc, bc) {
        this._cd = cd;                  // canvas for drawing
        this._ct = ct;                  // canvas for turtle
        this._x = x || width / 2;       // turtle x
        this._y = y || height / 2;      // turtle y
        this._d = d || 90;              // turtle direction
        this._pc = pc || 'black';       // pen color
        this._bc = bc || 'transparent'; // background color
        this._ts = true;                // turtle status
        this._ps = true;                // pen status
        this._pt = 4;                   // pen thickness
        this._v = {};                   // variables
        this._m = {};                   // methods 
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
            let edgeCol = color(this._pc);
            let bodyCol = color(this._pc);
            bodyCol.setAlpha(128);
            this._ct.push();
            this._ct.translate(this._x, this._y);
            this._ct.beginShape();
            this._ct.stroke(edgeCol);
            this._ct.fill(bodyCol);
            this._ct.strokeWeight(this._pt);
            for (let i = 0; i <= 3; ++i) {
                let theta = radians(this._d) + i * TWO_PI / 3;
                let x = size * cos(theta);
                let y = size * sin(-theta);
                this._ct.vertex(x, y);
            }
            this._ct.endShape();
            this._ct.pop();
        }
    }

    adjustTurtle() {
        if (this._d >= 360) {
            this._d = this._d % 360;
        }
        if (this._d < 0) {
            this._d = 360 - (-this._d % 360);
        }
    }

    penUp() {
        this._ps = false;
    }

    penDown() {
        this._ps = true;
    }

    penColor(col) {
        col = this.resolve(col);
        this._pc = col;
    }

    penThickness(thickness) {
        thickness = this.resolve(thickness);
        this._pt = thickness;
    }

    home() {
        this._x = width / 2;
        this._y = height / 2;
    }

    clear() {
        this._cd.clear();
        this._cd.background(color(this._bc));
    }

    backgroundColor(col) {
        col = this.resolve(col);
        this._bc = col;
        this._cd.background(color(this._bc));
    }

    forward(steps) {
        steps = this.resolve(steps);
        let px = this._x;
        let py = this._y;
        this._x += steps * cos(radians(this._d));
        this._y += steps * sin(-radians(this._d));
        if (this._ps) {
            this._cd.stroke(this._pc);
            this._cd.strokeWeight(this._pt);
            this._cd.line(this._x, this._y, px, py);
        }
    }

    backward(steps) {
        steps = this.resolve(steps);
        let px = this._x;
        let py = this._y;
        this._x -= steps * cos(radians(this._d));
        this._y -= steps * sin(-radians(this._d));
        if (this._ps) {
            this._cd.stroke(this._pc);
            this._cd.strokeWeight(this._pt);
            this._cd.line(this._x, this._y, px, py);
        }
    }

    left(angle) {
        angle = this.resolve(angle);
        this._d += angle;
    }

    right(angle) {
        angle = this.resolve(angle);
        this._d -= angle;
    }

    repeat(times, exp) {
        times = this.resolve(times);
        for (let count = 0; count < times; ++count) {
            this.execute(exp);
        }
    }

    export(filename) {
        filename = this.resolve(filename);
        exportPNG(this._c1, filename);
    }

    putVariable(name, value) {
        value = this.resolve(value);
        this._v[name] = value;
    }

    getVariable(name) {
        return this._v[name];
    }

    resolve(arg) {
        if (int(arg).toString() !== 'NaN') {
            return int(arg);
        } else if (arg.startsWith('$')) {
            return this.getVariable(arg.substr(1));
        } else if (arg.startsWith('(') && arg.endsWith(')')) {
            return evaluateExpression(arg, this._v);
        }
        return arg;
    }

    updatePosition(elem) {
        let x = int((this._x - width / 2).toFixed(2));
        let y = int((height / 2 - this._y).toFixed(2));
        elem.html(`(${x === 0 ? '0' : x}, ${y === 0 ? '0' : y}) : ${this._d}`);
    }

    execute(exp) {
        let sanitized = exp.replace(/=/g, ' = ').replace(/\[/g, ' [ ').replace(/\]/g, ' ] ').replace(/\s+/g, ' ').trim();
        let tokens = tokenizeExpression(sanitized);
        this.run(tokens);
        this.adjustTurtle();
        this.updateTurtle();
    }

    run(commands) {
        commands.forEach(command => {
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
                case 'assign':
                    this.putVariable(command.name, command.value);
                    break;
                default:
                    console.log('unknown command:', JSON.stringify(command));
                    break;
            }
        });
    }

}