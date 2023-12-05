const express = require('express');
const app = express();
const port = 3000;

const produtos = [
  {
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

app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

app.listen(port, () => {
  console.log(`Servidor está na porta ${port}`);
});
