const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const fs = require('fs');
const path = require('path');

const mercadopago = require('./mercadoPago');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(cors());

  // Rotas do servidor Express aqui
  server.post('/api/checkout', async (req, res) => {
    console.log('Recebendo solicitação na rota /api/checkout');
    const { courses } = req.body;

    // Resto do código da rota /api/checkout

    // ...

  });

  server.get('/api/cursos', (req, res) => {
    try {
      const data = fs.readFileSync(path.join(__dirname, 'cursos.json'), 'utf8');
      const cursos = JSON.parse(data);
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Servidor pronto na porta ${PORT}`);
  });
});
