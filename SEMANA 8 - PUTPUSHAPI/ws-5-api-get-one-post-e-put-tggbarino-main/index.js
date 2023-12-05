const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.json());


const produtos = [
  {
    id: 1,
    nome: 'Produto 1',
    preco: 10.99,
    quantidade: 20,
    categoria: 'Eletrônicos',
    fabricante: {
      nome: 'Fabricante A',
      endereco: 'Rua A, 123',
    },
  },
  {
    id: 2,
    nome: 'Produto 2',
    preco: 15.99,
    quantidade: 15,
    categoria: 'Roupas',
    fabricante: {
      nome: 'Fabricante B',
      endereco: 'Rua B, 456',
    },
  },
  {
    id: 3,
    nome: 'Produto 3',
    preco: 5.99,
    quantidade: 30,
    categoria: 'Alimentos',
    fabricante: {
      nome: 'Fabricante C',
      endereco: 'Rua C, 789',
    },
  },
];


app.get('/produto/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});


app.post('/produto', (req, res) => {
  const novoProduto = req.body;
  novoProduto.id = produtos.length + 1;
  produtos.push(novoProduto);
  res.status(201).json({ message: 'Produto adicionado com sucesso' });
});


app.post('/produto/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex((p) => p.id === id);

  if (produtoIndex !== -1) {
    const produtoModificado = req.body;
    produtos[produtoIndex] = { ...produtos[produtoIndex], ...produtoModificado };
    res.status(200).json({ message: 'Produto modificado com sucesso' });
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
