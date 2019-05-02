from threading import Thread

from bluetooth import *

server_sock = BluetoothSocket(RFCOMM)
server_sock.bind(("", 6))
server_sock.listen(1)

port = server_sock.getsockname()[1]

uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ee"

advertise_service(server_sock, "SampleServer",
				  service_id=uuid,
				  service_classes=[uuid, SERIAL_PORT_CLASS],
				  profiles=[SERIAL_PORT_PROFILE],
				  # protocols = [ OBEX_UUID ]
				  )

print("Waiting for connection on RFCOMM channel %d" % port)

client_sock, client_info = server_sock.accept()
print("Accepted connection from ", client_info)


def send_msg(sock):
	while True:
		data = sys.stdin.readline()
		if data == "quit":
			print("disconnected")

			client_sock.close()
			server_sock.close()
			print("all done")
			break
		sock.send(data)


def recv_msg(sock):
	while True:
		data = sock.recv(1024)
		if len(data) == 0: break
		print("received [%s]" % data)


Thread(target=send_msg, args=(client_sock,)).start()
Thread(target=recv_msg, args=(client_sock,)).start()
