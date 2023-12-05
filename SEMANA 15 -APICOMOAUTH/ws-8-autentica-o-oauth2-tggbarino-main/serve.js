const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const jwtSecret = 'jwt';

const authenticate = (req, res, next) => {
  const token = req.body.token || req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Token inexistente' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token não válido!!' });
    req.user = decoded;
    next();
  });
};

const produtos = [
  { id: 1, nome: 'Mouse', preco: 19.99, quantidade: 50, categoria: 'Acessorios' },
  { id: 2, nome: 'Iphone', preco: 1999.99, quantidade: 10, categoria: 'Eletrônicos' },
  { id: 3, nome: 'Jogo', preco: 19.99, quantidade: 100, categoria: 'Jogos' }
];


const ClienteId = 'f8719b3ddc05b02851a0';
const ClienteSecret = '6b8f8d2d138c0af3145b075c51e9e69c3d1e487c';
const gitUrl = 'http://localhost:3000/callback';

app.get('/auth/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${ClienteId}&redirect_uri=${gitUrl}`);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: ClienteId,
      client_secret: ClienteSecret,
      code: code,
    });

    const accessToken = response.data.access_token;

    const jwtToken = jwt.sign({ accessToken }, jwtSecret, { expiresIn: '1h', algorithm: 'HS256' });

    res.json({ token: jwtToken });
  } catch (error) {
    console.error('Erro ao obter token:', error.message);
    res.status(500).json({ error: 'Erro ao obter token' });
  }
});


app.get('/produtos/nomes', (req, res) => {
  const nomesProdutos = produtos.map((produto) => produto.nome);
  res.json({ nomesProdutos });
});

app.get('/produtos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const produto = produtos.find((p) => p.id == id);

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ error: 'Produto error' });
  }
});


app.post('/produtos', authenticate, (req, res) => {

  const novoProduto = req.body;
  produtos.push(novoProduto);

  res.status(201).json({ message: 'Produto adicionado com sucesso' });
});


app.put('/produtos/:id', authenticate, (req, res) => {
  const { id } = req.params;

  const produtoIndex = produtos.findIndex((p) => p.id == id);

  if (produtoIndex !== -1) {
    produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
    res.json({ message: 'Produto em processo de modificação' });
  } else {
    res.status(404).json({ error: 'Produto error' });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});