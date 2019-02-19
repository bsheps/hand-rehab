import Leap, sys, thread, time
import math
import ArduinoInterface


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
		frame = controller.frame()

		# Starting with just opening/closing when visible/not visible.
		# Will add more discrete commands over time.
		if self.hand_visible != frame.hands.is_empty:
			self.hand_visible = frame.hands.is_empty
			if self.hand_visible:
				ArduinoInterface.write_serial("OPEN")
			else:
				ArduinoInterface.write_serial("CLOSE")

		# Calculate angle of index finger. Untested at the moment.
		if frame.hands.is_empty:
			hand = frame.hands.leftmost

			index_finger_list = hand.fingers.finger_type(Leap.Finger.TYPE_INDEX)
			index_finger = index_finger_list[0]
			bone_direction = index_finger.bone(Leap.Bone.TYPE_DISTAL).direction

			hand_normal = hand.palm_normal

			angle = math.degrees(hand_normal.angle_to(bone_direction))

			print angle


def main():
	listener = LeapMotionListener()
	controller = Leap.Controller()

	controller.add_listener(listener)

	print "Press enter to quit"
	try:
		sys.stdin.readline()
	except KeyboardInterrupt:
		print "Exception KeyboardInterrupt"
	finally:
		controller.remove_listener(listener)


if __name__ == "__main__":
	main()
