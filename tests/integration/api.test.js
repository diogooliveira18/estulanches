const request = require('supertest');
const { app } = require('../../src/app');
const pool = require('../../src/db');

afterAll(async () => { await pool.end(); });

test('GET /health conecta no banco', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.db).toBe('conectado');
});

test('GET /cardapio retorna produtos', async () => {
  const res = await request(app).get('/cardapio');
  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test('POST /pedidos cria pedido com preço do banco', async () => {
  const res = await request(app).post('/pedidos')
    .send({ aluno: 'Ana', itens: [{ produto_id: 1, quantidade: 2 }] });
  expect(res.status).toBe(201);
  expect(res.body.total).toBe(12);
});

test('POST /pedidos rejeita pedido inválido', async () => {
  const res = await request(app).post('/pedidos').send({ aluno: '', itens: [] });
  expect(res.status).toBe(400);
});
