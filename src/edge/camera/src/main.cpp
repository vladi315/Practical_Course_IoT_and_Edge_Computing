#include <Arduino.h>
#include <ESP32QRCodeReader.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Change all 4 depending on network
const char* ssid = "Fritzbox6490d";
const char* password = "PW";
const char* mcip = "192.168.178.83";
String backendpath = "http://192.168.178.23:5000/dispense/inplace";

// See available models on README.md or ESP32CameraPins.h
ESP32QRCodeReader reader(CAMERA_MODEL_AI_THINKER);


void requestQR(char* qrData)
{
  if(WiFi.status()== WL_CONNECTED){
    HTTPClient http;

    String fullURL = backendpath + "?patientnr=" + qrData + "&location=" + mcip;

    // Your Domain name with URL path or IP address with path
    http.begin(fullURL.c_str());

    // Send HTTP GET request
    int httpResponseCode = http.GET();

    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}

void onQrCodeTask(void *pvParameters)
{
  struct QRCodeData qrCodeData;
  while (true)
  {
    if (reader.receiveQrCode(&qrCodeData, 100))
    {
      Serial.println("Found QRCode");
      if (qrCodeData.valid)
      {
        Serial.print("Payload: ");
        Serial.println((const char *)qrCodeData.payload);
        requestQR((char *)qrCodeData.payload);
      }
      else
      {
        Serial.print("Invalid: ");
        Serial.println((const char *)qrCodeData.payload);
      }
    }
    vTaskDelay(100 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println();

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

  Serial.println("Start Setup Camera.");

  reader.setup();
  Serial.println("End Setup Camera.");
  reader.beginOnCore(1);
  xTaskCreate(onQrCodeTask, "onQrCode", 4 * 1024, NULL, 4, NULL);
}

void loop() {}
