pi-fast-gpio
============

Super fast GPIO access on the Raspberry Pi using the 
[pigpio](http://abyz.co.uk/rpi/pigpio/index.html) daemon (for pwm, servo
control, etc)

The pigpio library uses direct memory access (DMA) to allow you to sample
the GPIOs up to 1,000,000 times per second. It also makes it fast enough to
give you PWM and servo control on all GPIOs simultaneously. The servo
waveforms are accurate to a few microseconds.

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

 1. require(...) the pi-fast-gpio library
 2. Create a new instance of the PiFastGpio class
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
