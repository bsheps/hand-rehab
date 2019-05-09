# hand-rehab-app

This project is split into four programs.
1. Leap Motion Interface: Branch: Leap_Arduino_Interface
2. Arduino Interface: Branch: Hand_Arduino
3. Ionic Application: Branch: awsdevelopment. Branch with bluetooth implementation: bluetooth_connection
4. AWS Server

The leap motion interface program uses the external libraries:
- The older V2 tracking sdk for leap motion: https://developer.leapmotion.com/sdk/v2
- Bluetooth library pybluez
  - I had issues installing on Windows 10, and was able to install using the whl file for 2.7: https://github.com/pybluez/pybluez/issues/180#issuecomment-408235161

Because it is using the V2 leap motion sdk, the use python 2 instead of python 3
