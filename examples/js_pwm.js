var PiFastGpio = require('../index.js');

var LED_1_GPIO = 24;
var LED_2_GPIO = 25;
var HOST = '127.0.0.1';
var PORT = 8888;

var run = true;
var dcStates = [0, 16, 64, 128, 255]; // dutycycle, 0 - 255
var dcIndex = 0;

var gpio = new PiFastGpio();

gpio.connect(HOST, PORT, function(err) {
  if (err) throw err;

  setTimeout(function() { run = false; }, 20000);

  var pwmUpdateInterval = setInterval(function() {
    gpio.setPwmDutycycle(LED_1_GPIO, dcStates[dcIndex]);
    gpio.setPwmDutycycle(LED_2_GPIO, dcStates[4 - dcIndex]);

    dcIndex = dcIndex + 1;
    if (dcIndex > 4) {
      dcIndex = 0;
    }

    if (!run) {
      gpio.setPwmDutycycle(LED_1_GPIO, 0); // pwm off
      gpio.setPwmDutycycle(LED_2_GPIO, 0); // pwm off
      gpio.close();
      clearInterval(pwmUpdateInterval);
    }
  }, 1000);
});
