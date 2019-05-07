import math
import sys

import ArduinoInterface
import Leap
import time
from threading import Thread
import BluetoothService


def process_frame(frame):
	if not frame.hands.is_empty:
		hand = frame.hands.leftmost

		hand_normal = hand.palm_normal

		# thumb
		thumb_list = hand.fingers.finger_type(Leap.Finger.TYPE_THUMB)
		thumb = thumb_list[0]
		angle_string1 = calc_thumb(thumb, hand_normal)

		# index finger
		index_finger_list = hand.fingers.finger_type(Leap.Finger.TYPE_INDEX)
		index_finger = index_finger_list[0]
		angle_string2 = calculate_angle(index_finger, hand_normal)

		# middle
		middle_list = hand.fingers.finger_type(Leap.Finger.TYPE_MIDDLE)
		middle = middle_list[0]
		angle_string3 = calculate_angle(middle, hand_normal)

		# ring
		ring_list = hand.fingers.finger_type(Leap.Finger.TYPE_RING)
		ring = ring_list[0]
		angle_string4 = calculate_angle(ring, hand_normal)

		# pinky
		pinky_list = hand.fingers.finger_type(Leap.Finger.TYPE_PINKY)
		pinky = pinky_list[0]
		angle_string5 = calculate_angle(pinky, hand_normal)

		final_string = angle_string1 + "b" + angle_string2 + "c" + angle_string3 + "d" + angle_string4 + "e" + angle_string5 + "f"
		return final_string


def calculate_angle(finger, palm_vector):
	val = math.degrees(palm_vector.angle_to(finger.direction))
	angle = 180 - (65 - val) * 2
	if angle > 180:
		angle = 180
	elif angle < 0:
		angle = 0

	return str(int(angle))


def calc_thumb(finger, palm_normal):
	val = math.degrees(palm_normal.angle_to(finger.direction))
	angle = 200 - (110 - val) * 2
	if angle > 180:
		angle = 180
	elif angle < 0:
		angle = 0
	return str(int(angle))


def write_to_file(f, string):
	print(string)
	f.write(string + "\n")


def loop_frame(controller):
	socket = BluetoothService.start_server()

	Thread(target=BluetoothService.receive_msg, args=(socket,)).start()

	# num = 0
	# while True:
	# 	# data = sys.stdin.readline()
	# 	str_num = str(num)
	# 	data = str_num + "a" + str_num + "b" + str_num +  "c" + str_num + str_num + "d" + str_num + "e" + "\n"
	# 	# print(data)
	# 	BluetoothService.send_msg(socket, data)
	# 	num += 1
	# 	time.sleep(0.1)

	while True:
		command = process_frame(controller.frame())
		if command is not None:
			BluetoothService.send_msg(socket, command + "\n")
			# ArduinoInterface.write_serial(command)
		time.sleep(0.1)


def main():
	controller = Leap.Controller()
	loop_frame(controller)


if __name__ == "__main__":
	main()
