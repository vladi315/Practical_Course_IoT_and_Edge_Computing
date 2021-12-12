Please connect your ESP32 as seen in ESP32_pin_layout.xlsx

You'll need [PlatformIO](https://platformio.org/) to build, upload and monitor your code.

We used the following libraries:
 - ESPAsyncWebServer, to create a HTTP-Server on the ESP
 - LiquidCrystal_I2C, to control the display

Before flashing the ESP32 you will need to enter your local network information at the top of the code (lines 9/10):
```
const char* ssid = "EnterYourWIFINameHere";
const char* password = "EnterYourWIFIPasswordHere";
```

On first startup, you will need to monitor the ESP32, to read its local IP-Address,
it should look like this:

```
Beginning
Connecting...
Connected, IP address: 192.192.192.192
```


If the ESP32 initialized correctly, both the monitoring and the display will show
```
Machine Ready
```
