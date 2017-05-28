# Gamepad Controller
> An event based api for using gamepads in the browser

Facilitates listening to button press, button release, and joy stick move events from a connected gamepad controller. This package was developed with an xbox one controller, but should support any gamepad.

## Usage
Install with:
`$ npm install --save gamepadcontroller`

Then on the client:

```js
// ES6
import 'GamepadController' from 'gamepadcontroller';
// OR ES5
var GamepadController = require('gamepadcontroller');

const gamepad = new GamepadController(0 /* takes an index, 0 - 3  */);
gamepad.onButtonPress(0, e => console.log(e, 'A button pressed'));
gamepad.onButtonRelease(0, e => console.log(e, 'A button released'));
gamepad.onButtonChange(7, e => console.log(e, 'Right trigger changed'));
gamepad.onStickMove(0, e => console.log(e, 'Left stick moved'));
```
The `GamepadController` constructor requires an index from 0 - 3 to determine which of the four potential gamepad controller slots to wrap. 

### Event Listeners
#### Button Events

* `gamepad.onButtonPress(buttonIndex, buttonCallbackFunction)`
* `gamepad.removeOnButtonPress(buttonIndex)`
* `gamepad.onButtonRelease(buttonIndex, buttonCallbackFunction)`
* `gamepad.removeOnButtonRelease(buttonIndex)`
* `gamepad.onButtonChange(buttonIndex, buttonCallbackFunction)`
* `gamepad.removeOnButtonChange(buttonIndex)`
```js
function buttonCallbackFunction (state) {
  const { previous, current } = state;
  // previous and current = { pressed: Bool, value: 0 < value < 1 } 
  // handle button event ...
}
```

#### Stick Events
* `gamepad.onStickMove(stickIndex, stickCallbackFunction)`
* `gamepad.removeOnStickMove(stickIndex)`
```js
function stickCallbackFunction (state) {
  const { previous, current } = state;
  // previous and current = { x: -1 < x < 1, y: -1 < y < 1 }
  // handle stick move ...
}
```

### Reference

Standard button mapping for an Xbox One Gamepad Controller:
```
 0: 'a'
 1: 'b'
 2: 'x'
 3: 'y'
 4: 'left bumper'
 5: 'right bumper'
 6: 'left trigger'
 7: 'right trigger'
 8: 'back'
 9: 'start'
10: 'left stick'
11: 'right stick'
12: 'up'
13: 'down'
14: 'left'
15: 'right'
16: 'xbox'
```

Joystick indexes for an Xbox One Gamepad Controller:
```
0: 'left stick'
1: 'right stick'
```
