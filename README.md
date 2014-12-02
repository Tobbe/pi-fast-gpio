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

Pin Layout tables
-----------------

(Tables copied from [r-pi-gpio](https://github.com/clebert/r-pi-gpio)'s readme file)

### Raspberry Pi GPIO Pin Layout (Revision 1)

| Assignment          | Pin | Pin | Assignment          |
| :------------------ | :-- | :-- | :------------------ |
| 3.3V                | 1   | 2   | 5V                  |
| GPIO 0 (I2C0 SDA)   | 3   | 4   | DNC                 |
| GPIO 1 (I2C0 SCL)   | 5   | 6   | GROUND              |
| GPIO 4              | 7   | 8   | GPIO 14 (UART TXD)  |
| DNC                 | 9   | 10  | GPIO 15 (UART RXD)  |
| GPIO 17             | 11  | 12  | GPIO 18             |
| GPIO 21             | 13  | 14  | DNC                 |
| GPIO 22             | 15  | 16  | GPIO 23             |
| DNC                 | 17  | 18  | GPIO 24             |
| GPIO 10 (SP10 MOSI) | 19  | 20  | DNC                 |
| GPIO 9  (SP10 MISO) | 21  | 22  | GPIO 25             |
| GPIO 11 (SP10 SCLK) | 23  | 24  | GPIO 8 (SP10 CE0 N) |
| DNC                 | 25  | 26  | GPIO 7 (SP10 CE1 N) |

### Raspberry Pi GPIO Pin Layout (Revision 2)

| Assignment          | Pin | Pin | Assignment          |
| :------------------ | :-- | :-- | :------------------ |
| 3.3V                | 1   | 2   | 5V                  |
| GPIO 2 (I2C1 SDA)   | 3   | 4   | 5V                  |
| GPIO 3 (I2C1 SCL)   | 5   | 6   | GROUND              |
| GPIO 4              | 7   | 8   | GPIO 14 (UART TXD)  |
| GROUND              | 9   | 10  | GPIO 15 (UART RXD)  |
| GPIO 17             | 11  | 12  | GPIO 18             |
| GPIO 27             | 13  | 14  | GROUND              |
| GPIO 22             | 15  | 16  | GPIO 23             |
| 3.3V                | 17  | 18  | GPIO 24             |
| GPIO 10 (SP10 MOSI) | 19  | 20  | GROUND              |
| GPIO 9  (SP10 MISO) | 21  | 22  | GPIO 25             |
| GPIO 11 (SP10 SCLK) | 23  | 24  | GPIO 8 (SP10 CE0 N) |
| GROUND              | 25  | 26  | GPIO 7 (SP10 CE1 N) |
