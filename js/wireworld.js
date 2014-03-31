var Wireworld;

(function () {
  Wireworld = function Wireworld(options) {
    if (!(this instanceof Wireworld)) {
      return new Wireworld(options);
    }

    this.width = options.width || 100;
    this.height = options.height || 100;

    this.reset();
  };

  Wireworld.prototype.states = {
    empty: 0,
    head: 1,
    tail: 2,
    conductor: 3
  };

  Wireworld.prototype.reset = function () {
    var x, y;

    this.generation = 0;
    this.field = [];

    for (x = 0; x < this.width; x++) {
      for (y = 0; y < this.height; y++) {
        this.field[x + y * this.width] = this.states.empty;
      }
    }
  };

  Wireworld.prototype.update = function () {
    var x, y, state;
    var neighbors;
    var newField = [];

    for (x = 0; x < this.width; x++) {
      for (y = 0; y < this.height; y++) {
        state = this.field[x + y * this.width];
        if (state == this.states.head) {
          newField[x + y * this.width] = this.states.tail;
        } else if (state == this.states.tail) {
          newField[x + y * this.width] = this.states.conductor;
        } else if (state == this.states.conductor) {
          neighbors = this.neighbors(x, y);
          if (neighbors == 1 || neighbors == 2) {
            newField[x + y * this.width] = this.states.head;
          } else {
            newField[x + y * this.width] = state;
          }
        } else {
          newField[x + y * this.width] = state;
        }
      }
    }

    this.generation++;
    this.field = newField;
  };

  Wireworld.prototype.neighbors = function (x, y) {
    var offsetX, offsetY;
    var count = 0;

    for (offsetX = -1; offsetX <= 1; offsetX++) {
      for (offsetY = -1; offsetY <= 1; offsetY++) {
        if ((x + offsetX) > -1 && (y + offsetY) > -1 && (x + offsetX) < this.width && (y + offsetY) < this.height) {
          count += this.field[(x + offsetX) + (y + offsetY) * this.width] == this.states.head;
        }
      }
    }

    return count;
  };
}).call(this);