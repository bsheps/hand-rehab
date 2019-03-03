import serial
import time

# open coms. 'COM5' may be different different setups. Check what the Arduino IDE says.
ser = serial.Serial('COM5', 9600)


def read_serial():
	while True:
		print ser.readline()


def write_serial(content):
	print("Writing: ", content)
	try:
		ser.write(content)
	except Exception, e:
		print("Failed to write: ")
		print(e)
