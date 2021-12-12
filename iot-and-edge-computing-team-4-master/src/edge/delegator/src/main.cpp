#include <Arduino.h>
#include <WiFi.h>
#include <FS.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <LiquidCrystal_I2C.h>


const char* ssid = "Fritzbox6490d";
const char* password = "PW";

AsyncWebServer server(80);

int motorPin1;
int motorPin2;
int motorPin3;
int motorPin4;

int motor1_pin1 = 32;
int motor1_pin2 = 33; 
int motor1_pin3 = 25;  
int motor1_pin4 = 26;

int motor2_pin1 = 27;
int motor2_pin2 = 14;  
int motor2_pin3 = 12;
int motor2_pin4 = 13;
 
int motor3_pin1 = 23;
int motor3_pin2 = 19; 
int motor3_pin3 = 18;
int motor3_pin4 = 05;

int motor4_pin1 = 04;
int motor4_pin2 = 00;
int motor4_pin3 = 02;
int motor4_pin4 = 15;

int pole1[] ={0,0,0,0, 0,1,1,1, 0};//pole1, 8 step values
int pole2[] ={0,0,0,1, 1,1,0,0, 0};//pole2, 8 step values
int pole3[] ={0,1,1,1, 0,0,0,0, 0};//pole3, 8 step values
int pole4[] ={1,1,0,0, 0,0,0,1, 0};//pole4, 8 step values

int poleStep = 0; 
int dirStatus = 1;// stores direction status 3= stop (do not change)

int sensorPin1 = 35;
int sensorPin2 = 34;
int sensorPin3 = 36;
int sensorPin4 = 39;

int sensorValue1 = 0;
int sensorValue2 = 0;
int sensorValue3 = 0;
int sensorValue4 = 0;

int pillCount1 = 0;
int pillCount2 = 0;
int pillCount3 = 0;
int pillCount4 = 0;

LiquidCrystal_I2C lcd(0x27, 16, 2);
//SDA to IO21
//SCL to IO22
int lcdColumns = 16;
int lcdRows = 2;

int output1 = 1;
int output2 = 1;
int output3 = 1;
int output4 = 1;

int totalPillNumber1 = output1;
int totalPillNumber2 = output2;
int totalPillNumber3 = output3;
int totalPillNumber4 = output4;

void setup() {
  // run setup code
  Serial.begin(115200);
  Serial.println("Beginning");

  WiFi.begin(ssid, password);

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Machine Ready");

  pinMode(motor1_pin1, OUTPUT);//define pin for ULN2003 in1 
  pinMode(motor1_pin2, OUTPUT);//define pin for ULN2003 in2   
  pinMode(motor1_pin3, OUTPUT);//define pin for ULN2003 in3   
  pinMode(motor1_pin4, OUTPUT);//define pin for ULN2003 in4   

  pinMode(motor2_pin1, OUTPUT);//define pin for ULN2003 in1 
  pinMode(motor2_pin2, OUTPUT);//define pin for ULN2003 in2   
  pinMode(motor2_pin3, OUTPUT);//define pin for ULN2003 in3   
  pinMode(motor2_pin4, OUTPUT);//define pin for ULN2003 in4   

  pinMode(motor3_pin1, OUTPUT);//define pin for ULN2003 in1 
  pinMode(motor3_pin2, OUTPUT);//define pin for ULN2003 in2   
  pinMode(motor3_pin3, OUTPUT);//define pin for ULN2003 in3   
  pinMode(motor3_pin4, OUTPUT);//define pin for ULN2003 in4   

  pinMode(motor4_pin1, OUTPUT);//define pin for ULN2003 in1 
  pinMode(motor4_pin2, OUTPUT);//define pin for ULN2003 in2   
  pinMode(motor4_pin3, OUTPUT);//define pin for ULN2003 in3   
  pinMode(motor4_pin4, OUTPUT);//define pin for ULN2003 in4   

  pinMode(sensorPin1,INPUT);
  pinMode(sensorPin2,INPUT);
  pinMode(sensorPin3,INPUT);
  pinMode(sensorPin4,INPUT);


  server.on("/info", HTTP_GET, [](AsyncWebServerRequest *request){
    //handle request here i think
    request->send(200, "text/plain", "GET message received");
  });

  server.on("/dispense", HTTP_POST, [](AsyncWebServerRequest *request){
    //handle request here i think
    int nrOfParams = request->params(); 
    for(int i=0; i<nrOfParams; i++){
      AsyncWebParameter* p = request->getParam(i);
      String paramName = p->name();
      if(paramName == "1") {
        output1 = (p->value()).toInt();
      } else if(paramName == "2") {
        output2 = (p->value()).toInt();
      } else if(paramName == "3") {
        output3 = (p->value()).toInt();
      } else if(paramName == "4") {
        output4 = (p->value()).toInt();
      }
    }
    request->
    send(200, "text/plain", "POST message received");
  });

  server.begin();
}

void displayAmountSerial(){
    Serial.println("[Pill1; Pill2; Pill3; Pill4]: ");
    Serial.println(pillCount1);
    Serial.println(pillCount2);
    Serial.println(pillCount3);
    Serial.println(pillCount4);
    if((pillCount1 != totalPillNumber1 || pillCount2 != totalPillNumber2 || pillCount3 != totalPillNumber3 || pillCount4 != totalPillNumber4) 
    && output1 == 0 && output2 == 0 && output3 == 0 && output4 == 0){
      Serial.print("Wrong number of pills! "); // TODO: display this on LCD
      lcd.setCursor(0, 0);
      //lcd.print("Error");
      //lcd.setCursor(0, 1);
      lcd.print("Pills Missing: "); 
      delay(2000);

      if(pillCount1 != totalPillNumber1)
      {
        int diff = totalPillNumber1 - pillCount1;
        lcd.setCursor(0, 0);
        lcd.print("Pill 1 missing:");
        lcd.setCursor(1, 1);
        lcd.print("               ");
        lcd.setCursor(0, 1);
        lcd.print(diff); 
        delay(3000);

      }
      if(pillCount2 != totalPillNumber2)
      {
        int diff = totalPillNumber2 - pillCount2;
        lcd.setCursor(0, 0);
        lcd.print("Pill 2 missing:");
        lcd.setCursor(1, 1);
        lcd.print("               ");
        lcd.setCursor(0, 1);
        lcd.print(diff); 
        delay(3000);

      }
      if(pillCount3 != totalPillNumber3)
      {
        lcd.clear();
        int diff = totalPillNumber3 - pillCount3;
        lcd.print("Pill 3 missing:");
        lcd.setCursor(1, 1);
        lcd.print("               ");
        lcd.setCursor(0, 1);
        lcd.print(diff); 
        delay(3000);

      }
      if(pillCount4 != totalPillNumber4)
      {
        int diff = totalPillNumber4 - pillCount4;
        lcd.setCursor(0, 0);
        lcd.print("Pill 4 missing:");
        lcd.setCursor(1, 1);
        lcd.print("               ");
        lcd.setCursor(0, 1);
        lcd.print(diff); 
        delay(3000);

      }

    }
    else if ((pillCount1 == totalPillNumber1 && pillCount2 == totalPillNumber2 && pillCount3 == totalPillNumber3 && pillCount4 == totalPillNumber4) 
    && output1 == 0 && output2 == 0 && output3 == 0 && output4 == 0)
    {
      Serial.print("Pills dispensed succesfully."); // TODO: display this on LCD
      lcd.setCursor(0, 0);
      lcd.print("All Pills      ");
      lcd.setCursor(0, 1);
      lcd.print("dispensed.     "); 
      delay(5000);
      lcd.clear();
    }  
}

void driveStepper(int motor, int c)
{
  if(motor==1){
    motorPin1 = motor1_pin1;
    motorPin2 = motor1_pin2;
    motorPin3 = motor1_pin3;
    motorPin4 = motor1_pin4;
  }
  else if(motor==2){
    motorPin1 = motor2_pin1;
    motorPin2 = motor2_pin2;
    motorPin3 = motor2_pin3;
    motorPin4 = motor2_pin4;
  }
  else if(motor==3){
    motorPin1 = motor3_pin1;
    motorPin2 = motor3_pin2;
    motorPin3 = motor3_pin3;
    motorPin4 = motor3_pin4;
  }
  else if(motor==4){
    motorPin1 = motor4_pin1;
    motorPin2 = motor4_pin2;
    motorPin3 = motor4_pin3;
    motorPin4 = motor4_pin4;
  }

  digitalWrite(motorPin1, pole1[c]);  
  digitalWrite(motorPin2, pole2[c]); 
  digitalWrite(motorPin3, pole3[c]); 
  digitalWrite(motorPin4, pole4[c]);   
}

void checkSensorValue()
 {sensorValue1 = digitalRead(sensorPin1);
  sensorValue2 = digitalRead(sensorPin2);
  sensorValue3 = digitalRead(sensorPin3);
  sensorValue4 = digitalRead(sensorPin4);

  if (sensorValue1 == 0) {
      Serial.println("Pill 1 dispensed");
      pillCount1 ++;
      displayAmountSerial();
      delay(150);
   }
  if (sensorValue2 == 0) {
    Serial.println("Pill 2 dispensed");
    pillCount2 ++;
    displayAmountSerial();
    delay(150);
  }
  if (sensorValue3 == 0) {
    Serial.println("Pill 1 dispensed");
    pillCount3 ++;
    displayAmountSerial();
    delay(150);
  }
  if (sensorValue4 == 0) {
    Serial.println("Pill 1 dispensed");
    pillCount4 ++;
    displayAmountSerial();
    delay(150);
  }
 }

void turnMotor(int motor)
{
  for(int i=0; i<1366; i++) {
    checkSensorValue();

    if(dirStatus ==1){ 
      poleStep++; 
      driveStepper(motor, poleStep);    
    }else if(dirStatus ==2){ 
      poleStep--; 
      driveStepper(motor, poleStep);    
    }else{
      driveStepper(motor, 8);   
    }
    if(poleStep>7){ 
      poleStep=0; 
    } 
    if(poleStep<0){ 
      poleStep=7; 
    }
    delay(1);
  }
}

void writeDisplay()
{
  if(output1 == 0 && output2 == 0 && output3 == 0 && output4 == 0) {
    //lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Machine Ready     ");
    lcd.setCursor(0, 1);
    lcd.print("                 ");
  } else if(output1 > 0) {
    //lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Output 1:       ");
    if(output1 == 9) {
      lcd.setCursor(1, 1);
      lcd.print(" "); 
    }
    lcd.setCursor(0, 1);
    lcd.print(output1);
  } else if(output2 > 0) {
    //lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Output 2:       ");
    if(output2 == 9) {
      lcd.setCursor(1, 1);
      lcd.print(" "); 
    }
    lcd.setCursor(0, 1);
    lcd.print(output2);
  } else if(output3 > 0) {
    //lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Output 3:       ");
    if(output3 == 9) {
      lcd.setCursor(1, 1);
      lcd.print(" "); 
    }
    lcd.setCursor(0, 1);
    lcd.print(output3);
  } else if(output4 > 0) {
    //lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Output 4:       ");
    if(output4 == 9) {
      lcd.setCursor(1, 1);
      lcd.print(" "); 
    }
    lcd.setCursor(0, 1);
    lcd.print(output4);
  }
}

void loop() {
  writeDisplay();
  checkSensorValue();
  if(output1>0) {
    turnMotor(1);
    output1--;
    displayAmountSerial();
  } else if(output2>0) {
    turnMotor(2);
    output2--;
    displayAmountSerial();
  } else if(output3>0) {
    turnMotor(3);
    output3--;
    displayAmountSerial();
  } else if(output4>0) {
    turnMotor(4);
    output4--;
    displayAmountSerial();
  }
 delay(100);
}

