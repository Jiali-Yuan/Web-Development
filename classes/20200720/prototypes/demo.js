// ALL INHERITENCE IN JS USES PROTOTYPES
//
// A PROTOTYPE IS AN ACTUAL OBJECT
//
// INHERITANCE IS RARELY A GOOD IDEA
//
// COMPOSITION OVER INHERITENCE
//
// When to use inheritance?
// - Shallow
// - Unlikely to change
// - you can't compose

// 4 ways to inherit
//  - Constructor function
//  - Object.create()
//  - ES6 "classes" (syntactic sugar around constructor function)
//  - Brute force assigning prototype

class UiControl {
  constructor(name) {
    this.name = name || 'name';
  }
  draw() {
    console.log('drawn', this.name);
  }
  interact() {
    console.log('ow!');
  }
}

class Button extends UiControl {
  paint() {
    this.draw();
  }
  interact() {
    console.log('click');
  }
}

const control = new UiControl('uicontrol'); // assigned the prototype and called constructor
console.log(control.name); // not inherited, direct
control.draw(); // inherited
control.interact(); // inherited
// UiControl.draw(); // The prototype of UiControl does NOT have .draw


const button = new Button('button');
button.other = function() { console.log('other'); };
button.paint(); // calls inherited draw
button.draw(); // inherited from inherited
button.interact(); // inherited from Button prototype
button.other(); // not inherited at all
