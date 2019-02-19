import serial
import time

# open coms. 'COM5' may be different different setups. Check what the Arduino IDE says.
ser = serial.Serial('COM5', 9600)


def read_serial():
	while True:
		print ser.readline()


def write_serial(string_message):
	ser.write(string_message.encode())


# while True:
# 	write_serial("Test message")
# 	time.sleep(5)
