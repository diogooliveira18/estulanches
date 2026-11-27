const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

// Regra de negócio (alvo dos testes unitários)
function calcularTotal(itens) {
  return itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);
}

function validarPedido(pedido) {
  if (!pedido.aluno || typeof pedido.aluno !== 'string') return false;
  if (!Array.isArray(pedido.itens) || pedido.itens.length === 0) return false;
  return pedido.itens.every(i => i.produto_id > 0 && i.quantidade > 0);
}

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'conectado' });
  } catch (e) {
    res.status(500).json({ status: 'erro', db: 'desconectado' });
  }
});

app.get('/cardapio', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, nome, preco FROM produtos WHERE ativo = true ORDER BY nome'
  );
  res.json(rows);
});

app.post('/pedidos', async (req, res) => {
  const pedido = req.body;
  if (!validarPedido(pedido)) {
    return res.status(400).json({ erro: 'Pedido inválido' });
  }
  const ids = pedido.itens.map(i => i.produto_id);
  const { rows } = await pool.query(
    'SELECT id, preco FROM produtos WHERE id = ANY($1) AND ativo = true', [ids]
  );
  if (rows.length !== new Set(ids).size) {
    return res.status(400).json({ erro: 'Produto inexistente' });
  }
  const itens = pedido.itens.map(i => ({
    ...i,
    preco: Number(rows.find(r => r.id === i.produto_id).preco),
  }));
  const total = calcularTotal(itens);
  const ped = await pool.query(
    'INSERT INTO pedidos (aluno, total) VALUES ($1, $2) RETURNING id',
    [pedido.aluno, total]
  );
  for (const i of itens) {
    await pool.query(
      'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco) VALUES ($1,$2,$3,$4)',
      [ped.rows[0].id, i.produto_id, i.quantidade, i.preco]
    );
  }
  res.status(201).json({ id: ped.rows[0].id, total });
});

app.get('/pedidos', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM pedidos ORDER BY id DESC LIMIT 50');
  res.json(rows);
});

module.exports = { app, calcularTotal, validarPedido };
