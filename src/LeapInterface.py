import Leap, sys, time
import math
import ArduinoInterface
from threading import Thread


class LeapMotionListener(Leap.Listener):

	hand_visible = False

	def on_init(self, controller):
		print "Initialized"

	def on_connect(self, controller):
		print "Motion Sensor Connected"

	def on_disconnect(self, controller):
		print "Motion Sensor Disconnected"

	def on_exit(self, controller):
		print "Exited"

	def on_frame(self, controller):
		pass


def process_frame(frame):
	if not frame.hands.is_empty:
		hand = frame.hands.leftmost

		hand_normal = hand.palm_normal

		# thumb
		thumb_list = hand.fingers.finger_type(Leap.Finger.TYPE_THUMB)
		thumb = thumb_list[0]
		angle_string1 = calculate_angle(thumb, hand_normal)

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
		print(final_string)
		return final_string


def calculate_angle(finger, palm_vector):
	bone_direction = finger.bone(Leap.Bone.TYPE_DISTAL).direction
	angle = 2 * (180 - math.degrees(palm_vector.angle_to(bone_direction)))
	if angle > 180:
		angle = 180
	return str(int(angle))


def loop_frame(controller):
	while True:
		ArduinoInterface.write_serial(process_frame(controller.frame()))
		time.sleep(0.05)


def main():
	# listener = LeapMotionListener()
	controller = Leap.Controller()
	# controller.add_listener(listener)

	loop_frame(controller)


if __name__ == "__main__":
	main()
