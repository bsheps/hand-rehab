#include <Servo.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
#define SERVOS 5
int servmin[] = {200, 220, 200, 200, 180};
int servmax[] = {530, 450, 390, 400, 400};

void setup() {
  Serial.begin(9600);
  Serial.println("<Arduino is ready>");
  
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  delay(10);
}

void loop() {
  serviceSerial();
}

void serviceSerial() {
  static int pos = 0;
  if (Serial.available()) {
    char ch = Serial.read();

    if (ch >= '0' && ch <= '9') {
      pos = pos * 10 + ch - '0';
    } else if (ch >= 'a' && ch <= 'a' + SERVOS) {
      Serial.print(ch - 'a');
      Serial.println(pos);
      int servo_index = ch - 'a';
      int pulselength = map(pos, 0, 180, servmin[servo_index-1], servmax[servo_index-1]);
      pwm.setPWM(servo_index, 0, pulselength);
      pos = 0;
    }
  }
}
