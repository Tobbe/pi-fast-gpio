var PiFastGpio = require('../index.js');

var SERVO_1_GPIO = 18;
var SERVO_2_GPIO = 23;
var HOST = '127.0.0.1';
var PORT = 8888;

var run = true;
var pw = 1100; // pulsewidth in microseconds
var change = 50;

var gpio = new PiFastGpio();

gpio.connect(HOST, PORT, function(err) {
  if (err) throw err;

  setTimeout(function() { run = false; }, 20000);

  var servoUpdateInterval = setInterval(function() {
    gpio.setServoPulsewidth(SERVO_1_GPIO, pw);
    gpio.setServoPulsewidth(SERVO_2_GPIO, pw);

    pw += change;

    // These values are chosen to be safe for most servos.
    // Your particular servo might be able to go further.
    if (pw < 1150 || pw > 1850) {
      change = -change;
    }

    if (!run) {
      gpio.setServoPulsewidth(SERVO_1_GPIO, 0); // servo off
      gpio.setServoPulsewidth(SERVO_2_GPIO, 0); // servo off
      gpio.close();
      clearInterval(servoUpdateInterval);
    }
  }, 500);
});
