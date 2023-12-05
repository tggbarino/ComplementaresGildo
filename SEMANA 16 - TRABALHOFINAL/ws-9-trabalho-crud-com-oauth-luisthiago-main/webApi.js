const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const jwtSecret = 'jwt';

const Autenticar = (req, res, next) => {
    const token = req.body.token || req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Token não existe' });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });
        req.user = decoded;
        next();
    });
};

const produtos = [
    { id: 1, nome: 'Camiseta', preco: 29.99, quantidade: 50, categoria: 'Roupas' },
    { id: 2, nome: 'Notebook', preco: 1499.99, quantidade: 10, categoria: 'Eletrônicos' },
    { id: 3, nome: 'Livro', preco: 19.99, quantidade: 100, categoria: 'Livros' }
];

const ClienteId = '695e962a166ce303405f70a7ce3f703bb6c29ceaa89ac3e6b32c2491a72f0c9c';
const ClienteSecret = 'gloas-af26e67b1b315857c44965b97c7122833459927adbd95874cc95049fa6e35041';
const gitUrl = 'http://localhost:3000/callback';

app.get('/auth/gitlab', (req, res) => {
    res.redirect(`https://gitlab.com/oauth/authorize?client_id=${ClienteId}&redirect_uri=${gitUrl}&response_type=code`);
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://gitlab.com/oauth/token', null, {
            params: {
                client_id: ClienteId,
                client_secret: ClienteSecret,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: gitUrl
            }
        });

        const accessToken = response.data.access_token;

        const jwtToken = jwt.sign({ accessToken }, jwtSecret, { expiresIn: '1h', algorithm: 'HS256' });

        res.json({ token: jwtToken });
    } catch (error) {
        console.error('Erro ao obter token:', error.message);
        res.status(500).json({ error: 'Erro ao obter token' });
    }
});

app.get('/produtos', (req, res) => {
    const nomesProdutos = produtos;
    res.json({ nomesProdutos });
});

app.get('/produtos/:id', Autenticar, (req, res) => {
    const { id } = req.params;
    const produto = produtos.find((p) => p.id == id);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

app.post('/produtos', Autenticar, (req, res) => {
    const novoProduto = req.body;
    produtos.push(novoProduto);
    res.status(201).json({ message: 'Produto adicionado' });
});

app.put('/produtos/:id', Autenticar, (req, res) => {
    const { id } = req.params;
    const produtoIndex = produtos.findIndex((p) => p.id == id);

    if (produtoIndex !== -1) {
        produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
        res.json({ message: 'Produto modificado' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

app.delete('/produtos/:id', Autenticar, (req, res) => {
    const { id } = req.params;
    const produtoIndex = produtos.findIndex((p) => p.id == id);

    if (produtoIndex !== -1) {
        produtos.splice(produtoIndex, 1);
        res.json({ message: 'Produto removido' });
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});


