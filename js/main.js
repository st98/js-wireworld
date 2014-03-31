(function main() {
  var width = 25;
  var height = 25;

  var scale = 20;

  var canvas = document.createElement('canvas');

  canvas.width = width * scale;
  canvas.height = height * scale;

  var context = canvas.getContext('2d');

  var world = new Wireworld({
    width: width,
    height: height
  });

  var colors = {
    empty: 'rgb(0, 0, 0)',
    head: 'rgb(255, 255, 255)',
    tail: 'rgb(0, 128, 255)',
    conductor: 'rgb(255, 196, 0)'
  };

  var isRunning = false;
  var isDragging = false;

  var state = world.states.conductor;

  var mousedown = function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left) / scale);
    var y = Math.floor((e.clientY - rect.top) / scale);

    world.field[x + y * width] = state;

    isDragging = true;
  };

  var mouseup = function () {
    isDragging = false;
  };

  var mousemove = function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left) / scale);
    var y = Math.floor((e.clientY - rect.top) / scale);

    if (isDragging) {
      world.field[x + y * width] = state;
    }
  };

  canvas.addEventListener('mousedown', mousedown, false);
  canvas.addEventListener('mouseup', mouseup, false);
  canvas.addEventListener('mousemove', mousemove, false);
  canvas.addEventListener('mouseout', mouseup, false);

  var draw = function () {
    var x, y;

    context.clearRect(0, 0, width * scale, height * scale);

    for (x = 0; x < width; x++) {
      for (y = 0; y < height; y++) {
        switch (world.field[x + y * width]) {
          case world.states.empty:
            context.fillStyle = colors.empty;
            break;

          case world.states.head:
            context.fillStyle = colors.head;
            break;

          case world.states.tail:
            context.fillStyle = colors.tail;
            break;

          case world.states.conductor:
            context.fillStyle = colors.conductor;
            break;
        }

        context.fillRect(x * scale, y * scale, scale, scale);

        context.fillStyle = 'rgb(16, 16, 16)';

        context.fillRect(x * scale, y * scale + scale - 1, scale, 1);
        context.fillRect(x * scale + scale - 1, y * scale, 1, scale);
      }
    }
  };

  var render = function () {
    if (isRunning) {
      world.update();
    }

    draw();
  };

  var fps = 30;
  var interval = 1000 / fps;

  setInterval(render, interval);

  var makeButton = function (text) {
    var txt = document.createTextNode(text);
    var button = document.createElement('button');

    button.appendChild(txt);

    return button;
  };

  var buttonEmpty = makeButton('empty');
  var buttonHead = makeButton('head');
  var buttonTail = makeButton('tail');
  var buttonConductor = makeButton('conductor');

  var buttonToggle = makeButton('start/stop');
  var buttonReset = makeButton('reset');

  buttonToggle.addEventListener('click', function () {
    isRunning = !isRunning;
  });

  buttonReset.addEventListener('click', function () {
    world.reset();
  });

  buttonEmpty.addEventListener('click', function () {
    state = world.states.empty;
  });

  buttonHead.addEventListener('click', function () {
    state = world.states.head;
  });

  buttonTail.addEventListener('click', function () {
    state = world.states.tail;
  });

  buttonConductor.addEventListener('click', function () {
    state = world.states.conductor;
  });

  document.body.appendChild(buttonToggle);
  document.body.appendChild(buttonReset);

  document.body.appendChild(buttonEmpty);
  document.body.appendChild(buttonHead);
  document.body.appendChild(buttonTail);
  document.body.appendChild(buttonConductor);

  document.body.appendChild(canvas);
}).call(this);