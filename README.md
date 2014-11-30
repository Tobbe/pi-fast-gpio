pigpio.js
=========

Accessing the [pigpio](http://abyz.co.uk/rpi/pigpio/index.html) daemon to get
hardware PWM control in node.js on the Raspberry Pi. 

This code is based off of the [python library](http://abyz.co.uk/rpi/pigpio/python.html)
included with the pigpio download.

Installation
------------

For now you'll just have to clone this repo

Usage
-----

Start the pigpio daemon:

    $ sudo pigpiod

In your program:

 1. require(...) the pigpio.js library
 2. Create a new instance of the PiGPIOjs class
 3. Call connect(...) to connect to the pigpiod daemon
 4. When connected, do what you please with the GPIOs on your Raspberry Pi
 5. Call close() when you're done and about to exit your program.

Example
-------

An example is included in the examples/ directory that drives two servos.
Watch it in action here: http://youtu.be/AnlUtAq5oAM

Before running the example, make sure you have two servos connected to your
Raspberry Pi. One on GPIO18 and one on GPIO23.

Go to the examples/ directory and run the code:

    $ node js_servo.js

Watch the servos turn!
