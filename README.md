# EstuLanches

Sistema de gestão de cardápio e pedidos da cantina escolar, implantado em produção com Docker.

**Autor:** Diogo da Silveira Oliveira
**Versão:** v1.0.0

## Problema que resolve

Pedidos em papel, filas no intervalo, erros de preço e falta de controle do cardápio. O EstuLanches centraliza cardápio e pedidos em uma API com banco de dados, calculando o preço sempre no servidor.

## Tecnologias

- Node.js 20 + Express
- PostgreSQL 16
- Docker e Docker Compose
- Jest e Supertest (testes)

## Como rodar

1. Copie o arquivo de variáveis e defina uma senha:
   ```
   copy .env.example .env
   ```
2. Suba a aplicação:
   ```
   docker compose up -d --build
   ```
3. Verifique:
   ```
   docker compose ps
   docker compose logs
   ```
4. Acesse:
   - http://localhost:3000/health
   - http://localhost:3000/cardapio

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | /health | Estado da aplicação e do banco |
| GET | /cardapio | Lista produtos ativos |
| POST | /pedidos | Cria pedido (preço vem do banco) |
| GET | /pedidos | Lista os últimos 50 pedidos |

## Testes

```
npm run test:unit
npm run test:integration
```

Os testes de integração precisam do banco acessível em `localhost:5432` (publique a porta temporariamente no `docker-compose.yml`).

## Segurança

- Credenciais em `.env`, fora do Git
- Banco sem porta exposta (rede interna do Docker)
- Container da aplicação roda como usuário não-root
- Consultas parametrizadas (previne SQL Injection)
- Validação de entrada e preço calculado no servidor

## Documentação

- Ficha RDM: [docs/RDM_EstuLanches.pdf](docs/RDM_EstuLanches.pdf)
- Vídeo de apresentação: LINK_DO_VIDEO_AQUI