import socketio

sio_server = socketio.AsyncServer(
    async_mode='asgi', 
    cors_allowed_origins=[]  # allow all for testing
)

sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path='sockets'
)

@sio_server.event
async def connect(sid, environ, auth):
    print(f"Client connected: {sid}")
    # Notify only this user
    # Notify others
    await sio_server.emit('join', {'sid': sid}, skip_sid=sid)

@sio_server.event
async def message(sid, message):
    print(f"Message from {sid}: {message}")
    await sio_server.emit('message', {'sid': sid, 'message': message}, skip_sid=sid)

@sio_server.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
    await sio_server.emit('leave', {'sid': sid}, skip_sid=sid)

@sio_server.event
async def join(sid):
    print(f"Client joined: {sid}")
    await sio_server.emit('join', {'sid': sid}, skip_sid=sid)
