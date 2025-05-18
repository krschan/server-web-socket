const WebSocket = require('ws');

const PORT = process.env.PORT || 8080; // Railway usa process.env.PORT
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log("✅ Nuevo cliente conectado");

  ws.on('message', (data) => {
    // Broadcast a todos los clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log("❌ Cliente desconectado");
  });
});

console.log(`🚀 Servidor WebSocket escuchando en puerto ${PORT}`);
