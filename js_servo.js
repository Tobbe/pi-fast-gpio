var net = require('net');
var Put = require('put');

var SERVO_GPIO_1 = 18;
var SERVO_GPIO_2 = 23;
var HOST = '127.0.0.1';
var PORT = 8888;
var run = true;
var pw = 1100;
var change = 50;

// pi = pigpio.pi();

init(function(err, client) {
  setTimeout(function() { run = false; }, 20000);

  var servoUpdateInterval = setInterval(function() {
    // pi.set_servo_pulsewidth(SERVO_GPIO, pw)
    setServoPulsewidth(client, SERVO_GPIO_1, pw);
    setServoPulsewidth(client, SERVO_GPIO_2, pw);
    console.log('servo pulsewidth ' + pw + ' microseconds.');
    pw += change;

    if (pw < 1150 || pw > 1850) {
      change = -change;
    }

    if (!run) {
      // pi.set_servo_pulsewidth(SERVO_GPIO, 0); // servo off
      setServoPulsewidth(client, SERVO_GPIO_1, 0); // servo off
      setServoPulsewidth(client, SERVO_GPIO_2, 0); // servo off
      clearInterval(servoUpdateInterval);
    }
  }, 500);
});

function init(cb) {
  var client = new net.Socket();
  client.on('data', function(data) {
    //console.log('DATA: ');
    //logDataStream(data);
  });

  client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO pigpiod');

    // Disable the Nagle algoritm
    client.setNoDelay(true);

    cb(null, client);
  });
}

/**
 * def set_servo_pulsewidth(self, user_gpio, pulsewidth):
 *     """
 *     Starts (500-2500) or stops (0) servo pulses on the gpio.
 * 
 *     user_gpio:= 0-31.
 *     pulsewidth:= 0 (off),
 *                  500 (most anti-clockwise) - 2500 (most clockwise).
 * 
 *     The selected pulsewidth will continue to be transmitted until
 *     changed by a subsequent call to set_servo_pulsewidth.
 * 
 *     The pulsewidths supported by servos varies and should probably
 *     be determined by experiment. A value of 1500 should always be
 *     safe and represents the mid-point of rotation.
 * 
 *     You can DAMAGE a servo if you command it to move beyond its
 *     limits.
 * 
 *     ...
 *     pi.set_servo_pulsewidth(17, 0)    # off
 *     pi.set_servo_pulsewidth(17, 1000) # safe anti-clockwise
 *     pi.set_servo_pulsewidth(17, 1500) # centre
 *     pi.set_servo_pulsewidth(17, 2000) # safe clockwise
 *     ...
 *     """
 *     return _u2i(_pigpio_command(
 *        self.sl, _PI_CMD_SERVO, user_gpio, int(pulsewidth)))
 */
function setServoPulsewidth(socketClient, userGpio, pulsewidth) {
  var cmd = Put()
            .word32le(8) // _PI_CMD_SERVO
            .word32le(userGpio)
            .word32le(pulsewidth)
            .word32le(0);

  socketClient.write(cmd.buffer());
}

function logDataStream(data){  
  // log the binary data stream in rows of 8 bits
  var print = "";
  for (var i = 0; i < data.length; i++) {
    print += " " + data[i].toString(16);

    // apply proper format for bits with value < 16, observed as int tuples
    if (data[i] < 16) { print += "0"; }

    // insert a line break after every 8th bit
    if ((i + 1) % 8 === 0) {
      print += '\n';
    };
  }

  // log the stream
  console.log(print);
}
