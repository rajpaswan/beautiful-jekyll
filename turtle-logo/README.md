# TURTLE LOGO

A [LOGO](https://en.wikipedia.org/wiki/Logo_(programming_language)) simulator app built using [p5.js](https://p5js.org/). Live demo at [here](https://rajpaswan.github.io/turtle-logo/).

#### COMMANDS
| command | Purpose | Examples |
|-------------|---------|----------|
| `home` | move to home | |
| `cs` | clear screen | |
| `st` | show turtle | |
| `ht` | hide turtle | |
| `pu` | pen up | |
| `pd` | pen down | |
| `pc <color>` | pen color | `pc red, pc #ff0000` |
| `bc <color>` | background color | `bc gray, bc #303030` |
| `pt <thickness>` | pen thickness | `pt 10` |
| `fd <steps>` | move forward | `fd 100` |
| `bk <steps>` | move backward | `bk 100` |
| `lt <degrees>` | left turn | `lt 90` |
| `rt <degrees>` | right turn | `rt 90` |
| `repeat <times>[<commands>]` | repeat commands  | `repeat 4[fd 100 rt 90]` |
| `export <filename>` | export canvas as png image | `export square` |

#### EXPRESSIONS
| Expression | Purpose | Examples |
|------------|---------|----------|
| `$<variable>=<value>` | assign value to variable | `$x=100` |
| `$<variable>=(<expression>)` | evaluate expression and assign to variable | `$y=($x+100)` |
| `<command> $<variable>` | command with variable as an argument  | `fd $x` |
| `<command> (<expression>)` | command with expression as an argument  | `fd ($x+10*$y)` |

#### CONTACT
Raj Paswan  
[rajpaswan.in@gmail.com](mailto://rajpaswan.in@gmail.com)