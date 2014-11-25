var PiGPIOjs = require('./pigpio.js');

var SERVO_1_GPIO = 18;
var SERVO_2_GPIO = 23;
var HOST = '127.0.0.1';
var PORT = 8888;
var run = true;
var pw = 1100;
var change = 50;

var gpio = new PiGPIOjs();

gpio.connect(HOST, PORT, function(err) {
  if (err) throw err;

  setTimeout(function() { run = false; }, 20000);

  var servoUpdateInterval = setInterval(function() {
    gpio.setServoPulsewidth(SERVO_1_GPIO, pw);
    gpio.setServoPulsewidth(SERVO_2_GPIO, pw);
    console.log('servo pulsewidth ' + pw + ' microseconds.');
    pw += change;

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
