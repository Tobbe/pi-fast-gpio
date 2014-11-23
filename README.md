pigpio.js
=========

Accessing the [pigpio](http://abyz.co.uk/rpi/pigpio/index.html) daemon to get
hardware PWM control in node.js on the Raspberry Pi. 

Installation
------------

For now you'll just have to clone this repo

Usage
-----

Start the pigpio daemon:

    $ sudo pigpiod

Make sure you have two servos connected to your Raspberry Pi. One on GPIO18
and one on GPIO23.

Run the code:

    $ node js_servo.js

Watch the servos turn!
