import socketio
import asyncio
sio_client = socketio.AsyncClient()

@sio_client.event
async def connect():
    print("Connected to server")
    await sio_client.emit('message', {'data': 'Hello from client!'})

@sio_client.event
async def disconnect():
    print("Disconnected from server")


async def main():
    await sio_client.connect(url='http://localhost:8000/sockets')
    await sio_client.wait()
    await sio_client.disconnect()


asyncio.run(main())