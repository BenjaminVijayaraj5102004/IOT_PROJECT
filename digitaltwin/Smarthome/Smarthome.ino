#include <WiFi.h>

const char* ssid = "Benjamin";
const char* password = "12345678";

WiFiServer server(80);


const int led1 = 2;
const int led2 = 4;

void setup() {
  Serial.begin(115200);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);

  // Connect to your hotspot
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP()); 
  server.begin();
}

void loop() {
  WiFiClient client = server.available(); 

  if (client) {
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (c == '\n') {
          if (currentLine.length() == 0) {
           
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Access-Control-Allow-Origin: *");
            client.println("Connection: close");
            client.println();
            
    
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<style>body { font-family: sans-serif; text-align: center; background: #121212; color: white; }");
            client.println(".btn { display: block; width: 200px; margin: 20px auto; padding: 20px; font-size: 20px; color: white; text-decoration: none; border-radius: 10px; }");
            client.println(".on { background: #00C853; } .off { background: #D50000; }</style></head>");
            client.println("<body><h1>ESP32 Control</h1>");
            
            client.println("p>LED 1 (GPIO 2)</p>");
            client.println("<a class=\"btn on\" href=\"/L1ON\">TURN ON</a><a class=\"btn off\" href=\"/L1OFF\">TURN OFF</a>");
            
            client.println("<p>LED 2 (GPIO 4)</p>");
            client.println("<a class=\"btn on\" href=\"/L2ON\">TURN ON</a><a class=\"btn off\" href=\"/L2OFF\">TURN OFF</a>");
            
            client.println("</body></html>");
            client.println();
            break;
          } else { currentLine = ""; }
        } else if (c != '\r') {
          currentLine += c;
        }

        // Logic to turn LEDs on/off based on URL clicks
        if (currentLine.endsWith("GET /L1ON")) digitalWrite(led1, HIGH);
        if (currentLine.endsWith("GET /L1OFF")) digitalWrite(led1, LOW);
        if (currentLine.endsWith("GET /L2ON")) digitalWrite(led2, HIGH);
        if (currentLine.endsWith("GET /L2OFF")) digitalWrite(led2, LOW);
      }
    }
    client.stop();
  }
}