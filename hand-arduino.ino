#include <Servo.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
#define SERVOMIN  230 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  450 // this is the 'maximum' pulse length count (out of 4096)

#define SERVOS 5
int servoPins[SERVOS] = {7,8,9,10};

Servo myservo[SERVOS];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
    Serial.println("<Arduino is ready>");

    pwm.begin();
    pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
    delay(10);
}

void loop() {
  // put your main code here, to run repeatedly:
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
      int pulselength = map(pos, 0, 180, SERVOMIN, SERVOMAX);
      pwm.setPWM(servo_index, 0, pulselength);
      pos = 0;
    }
  }
}
