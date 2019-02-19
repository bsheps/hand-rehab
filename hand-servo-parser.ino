
#include <Servo.h> // don't forget to include the servo library!
Servo myservo1;  // create servo object to control a servo, a maximum of 8 servo objects can be created 
Servo myservo2;
Servo myservo3;
Servo myservo4;
Servo myservo5;
int pos = 0;    // variable to store the servo position 

void setup() {
  Serial.begin(9600);
  myservo1.attach(7);  // set-up pin 9 to have an RC servo signal, it is automatically made an output
  myservo2.attach(8);
  myservo3.attach(9);
  myservo4.attach(10);
  myservo5.attach(11);
}

void loop() {
    if (Serial.available() > 0) {
    // read the incoming byte
    //byte incomingByte = Serial.read();
    String incomingText = Serial.readString();

    // print contents
    Serial.print("Got: ");
    //Serial.println(incomingByte, DEC);
    Serial.println(incomingText);

    if (incomingText == "OPEN") {
      // goes from 0 degrees to 180 degrees in steps of 1 degree
      for(pos = 0; pos < 180; pos += 1) {
        // tell servo to go to position in variable 'pos'
        myservo1.write(pos);
        myservo2.write(pos);
        myservo3.write(pos);
        myservo4.write(pos);
        myservo5.write(pos);
        // waits 15ms for the servo to reach the position 
        delay(15);
      }
    } else if (incomingText == "CLOSE") {
      // goes from 180 degrees to 0 degrees 
      for(pos = 180; pos>=1; pos-=1) {
        // tell servo to go to position in variable 'pos'
        myservo1.write(pos);              
        myservo2.write(pos);
        myservo3.write(pos);
        myservo4.write(pos);
        myservo5.write(pos);
        // waits 15ms for the servo to reach the position 
        delay(15);
      } 
    } else {
      Serial.print("Could not parse text ");
      Serial.println(incomingText);
    }
    
  }
}
