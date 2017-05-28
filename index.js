function GamepadController(gamepadIndex) {
  this.gamepadIndex = gamepadIndex;
  this.hasGamepad = false;
  if (!window.navigator.getGamepads) return new Error('The gamepad web api is not available');

  window.addEventListener('gamepadconnected', this.onGamepadConnected.bind(this));
  window.addEventListener('gamepaddisconnected', this.onGamepadDisconnected.bind(this));
  var self = this;
  var pollGamepad = window.setInterval(function() {
    if(self.getGamepad()) {
      if(!self.hasGamepad) window.dispatchEvent(new Event('gamepadconnected'));
      window.clearInterval(pollGamepad);
    }
  }, 500);
  // sets up structures to hold event callbacks
  this.buttonEventListeners = Array.from({ length: 17 }, () => ({ onPress: null, onRelease: null }));
  this.stickEventListeners = Array.from({ length: 2 }, () => ({ onMove: null }));
};

GamepadController.prototype.getGamepad = function() {
  return window.navigator.getGamepads()[this.gamepadIndex];
};

GamepadController.prototype.onGamepadConnected = function() {
  this.hasGamepad = true;
  this.previousButtonStates = Array.from({ length: 17 }, () => ({ pressed: false, value: 0 }));
  this.previousStickStates = Array.from({ length: 2 }, () => ({ x: 0, y: 0 }));
  this.emitEventsInterval = window.setInterval(this.emitEvents.bind(this), 100);
};

GamepadController.prototype.onGamepadDisconnected = function() {
  this.hasGamepad = false;
  window.clearInterval(this.emitEventsInterval);
};

GamepadController.prototype.applyDeadzone = function(number) {
  var threshold = 0.25;
  var percentage = (Math.abs(number) - threshold) / (1 - threshold);
  if (percentage < 0) percentage = 0;
  return percentage * (number > 0 ? 1 : -1);
};

GamepadController.prototype.transformAxesToStick = function(axes) {
  var axesMod = axes.map(axis => this.applyDeadzone(axis));
  return [
    { x: axesMod[0], y: -1 * axesMod[1] },
    { x: axesMod[2], y: -1 * axesMod[3] }
  ];
};

GamepadController.prototype.emitButton = function(key, index, state) {
  try {
    var cb = this.buttonEventListeners[index][key];
    if (cb) cb(state);
  } catch (e) {
    console.error(e);
  }
};

GamepadController.prototype.emitButtonPress = function(index, state) {
  this.emitButton('onPress', index, state);
};
GamepadController.prototype.emitButtonRelease = function(index, state) {
  this.emitButton('onRelease', index, state);
};
GamepadController.prototype.emitButtonRelease = function(index, state) {
  this.emitButton('onChange', index, state);
};

GamepadController.prototype.emitStickMove = function(index, state) {
  try {
    var cb = this.stickEventListeners[index].onMove;
    if (cb) cb(state);
  } catch (e) {
    console.error(e);
  }
};

GamepadController.prototype.emitEvents = function() {
  var gp = this.getGamepad();
  // button event handling
  gp.buttons.forEach((button, i) => {
    if (button.value > 0 && button.pressed !== this.previousButtonStates[i].pressed) {
      this.emitButtonPress(i, { previous: this.previousButtonStates[i], state: button });
      this.previousButtonStates[i] = { pressed: true, value: button.value };
      return;
    }
    if (button.value === 0 && this.previousButtonStates[i].pressed) {
      this.emitButtonRelease(i, { previous: this.previousButtonStates[i], state: button });
      this.previousButtonStates[i] = { pressed: false, value: button.value };
    }
  });
  // stick event handling
  this.transformAxesToStick(gp.axes).forEach((stick, i) => {
    if (stick.x !== this.previousStickStates[i].x || stick.y !== this.previousStickStates[i].y) {
      this.emitStickMove(i, { previous: this.previousStickStates[i], state: stick });
      this.previousStickStates[i] = stick;
    }
  });
};

GamepadController.prototype.onButtonPress = function(index, cb) {
  this.buttonEventListeners[index].onPress = cb;
};
GamepadController.prototype.removeOnButtonPress = function(index) {
  this.buttonEventListeners[index].onPress = null;
};

GamepadController.prototype.onButtonRelease = function(index, cb) {
  this.buttonEventListeners[index].onRelease = cb;
};
GamepadController.prototype.removeOnButtonRelease = function(index) {
  this.buttonEventListeners[index].onRelease = null;
};

GamepadController.prototype.onStickMove = function(index, cb) {
  this.stickEventListeners[index].onMove = cb;
};
GamepadController.prototype.removeOnStickMove = function(index) {
  this.stickEventListeners[index].onMove = null;
};


module.exports = GamepadController;
