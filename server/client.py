import socketio, asyncio

sio_client = socketio.AsyncClient()

@sio_client.event
async def connect():
    print("✅ Connected to server")
    await sio_client.emit("message", {"data": "Hello from client!"})

@sio_client.event
async def message(data):
    print("📩 Message received:", data)

@sio_client.event
async def disconnect():
    print("❌ Disconnected")

async def main():
    await sio_client.connect("http://localhost:8000", socketio_path="/ws/sockets")
    await sio_client.wait()

asyncio.run(main())
