# Gamepad Controller
> An event based api for using gamepads in the browser

Facilitates listening to button press, button release, and joy stick move events from a connected gamepad controller. This package was developed with an xbox one controller, but should support any gamepad.

## Usage
Install with:
`$ npm install --save gamepad-controller`

Then on the client:

```js
// ES6
import 'GamepadController' from 'gamepad-controller';
// OR ES5
var GamepadController = require('gamepad-controller');

const gamepad = new GamepadController(0 /* takes an index, 0 - 3  */);
gamepad.onButtonPress(0, e => console.log(e, 'A button pressed'));
gamepad.onButtonRelease(0, e => console.log(e, 'A button released'));
gamepad.onStickMove(0, e => console.log(e, 'Left stick moved'));
```
The `GamepadController` constructor requires an index from 0 - 3 to determine which of the four potential gamepad controller slots to wrap. 

### Event Listeners

* `gamepad.onButtonPress(buttonIndex, callbackFunction)`
* `gamepad.removeOnButtonPress(buttonIndex)`
* `gamepad.onButtonRelease(buttonIndex, callbackFunction)`
* `gamepad.removeOnButtonRelease(buttonIndex)`
* `gamepad.onStickMove(stickIndex, callbackFunction)`
* `gamepad.removeOnStickMove(stickIndex)`

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
