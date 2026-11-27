CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco NUMERIC(8,2) NOT NULL CHECK (preco > 0),
  ativo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  aluno VARCHAR(100) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS itens_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id),
  produto_id INT REFERENCES produtos(id),
  quantidade INT NOT NULL CHECK (quantidade > 0),
  preco NUMERIC(8,2) NOT NULL
);

INSERT INTO produtos (nome, preco) VALUES
  ('Coxinha', 6.00),
  ('Pão de queijo', 4.50),
  ('Suco natural', 5.00),
  ('Misto quente', 7.00);
