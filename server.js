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

  
    
  
    // Calcular o valor total dos cursos selecionados
    const data = fs.readFileSync(path.join(__dirname, 'cursos.json'), 'utf8');
    const cursos = JSON.parse(data);
    let total = 0;
    for (const curso of cursos) {
      console.log(curso);
      if (courses.map(Number).includes(curso.id)) {
        total += parseFloat(curso.valor.replace(',', '.'));
        console.log(total); // Adicionado aqui
      }
    }
  
    console.log('Valor total dos cursos selecionados:', total);
  
    const preference = {
      items: [
        {
          title: 'Cursos selecionados',
          unit_price: total,
          quantity: 1,
        },
      ],
    };
  
    console.log(preference);
  
    try {
      console.log('Criando preferência de pagamento com o Mercado Pago');
      const response = await mercadopago.preferences.create(preference);
      console.log('Preferência de pagamento criada com sucesso');
      res.status(200).json({ init_point: response.body.init_point });
    } catch (error) {
      console.error('Erro ao criar preferência de pagamento:', error);
      res.status(500).json({ error: error.message });
    }
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

  module.exports = server;
});