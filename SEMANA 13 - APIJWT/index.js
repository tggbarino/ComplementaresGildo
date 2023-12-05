const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();
const port = 9000;
const secretKey = '1234';

app.use(express.json());
app.use(express.static('public'));

const produtos = [
    {
        id:1,
        nome: 'Smartphone Galaxy 2',
        preco: 599.99,
        quantidade: 100,
        categoria: 'Eletrônicos',
        fabricante: {
            nome: 'Galaxy',
            endereco: '123 Avenida Principal'
        }
    },
    {
        id:2,
        nome: 'Notbook Dell',
        preco: 1299.99,
        quantidade: 50,
        categoria: 'Computador',
        fabricante: {
            nome: 'Dell',
            endereco: '456 Arthur Bernardes'
        }
    },
    {
        id:3,
        nome: 'Fones de Ouvido Beats',
        preco: 199.99,
        quantidade: 200,
        categoria: 'Áudio',
        fabricante: {
            nome: 'SoundWave',
            endereco: '789 Rua Sonora'
        }
    }
];


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); 
  }
}
app.get('/', (_req, res) => {
    res.json({ mensagem: 'API de Produtos funcionando!' });
  });


app.get('/api/produtos/nomes', (_req, res) => {
  const nomes = produtos.map((produto) => produto.nome);
  res.status(200).json(nomes);
});


app.get('/api/produtos/:id', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    res.status(404).json({ message: 'Produto não encontrado' });
  } else {
    res.status(200).json(produto);
  }
});


app.post('/api/produtos', verifyToken, (req, res) => {
  const novoProduto = req.body;
  produtos.push(novoProduto);
  res.status(201).json({ message: 'Produto adicionado com sucesso' });
});


app.put('/api/produtos/:id', verifyToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Produto não encontrado' });
  } else {
    produtos[index] = req.body;
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  }
});


app.post('/api/auth', (req, res) => {
  const user = { username: 'seuUsuario', password: 'suaSenha' };

  if (
    req.body.username === user.username &&
    req.body.password === user.password
  ) {
    const token = jwt.sign({ user: user.username }, secretKey);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});