const { calcularTotal, validarPedido } = require('../../src/app');

describe('calcularTotal', () => {
    test('soma preço x quantidade', () => {
        expect(calcularTotal([
            { preco: 6, quantidade: 2 },
            { preco: 4.5, quantidade: 1 },
        ])).toBe(16.5);
    });
    test('lista vazia = 0', () => {
        expect(calcularTotal([])).toBe(0);
    });
});

describe('validarPedido', () => {
    test('aceita pedido válido', () => {
        expect(validarPedido({ aluno: 'Ana', itens: [{ produto_id: 1, quantidade: 2 }] })).toBe(true);
    });
    test('rejeita sem itens', () => {
        expect(validarPedido({ aluno: 'Ana', itens: [] })).toBe(false);
    });
    test('rejeita quantidade zero', () => {
        expect(validarPedido({ aluno: 'Ana', itens: [{ produto_id: 1, quantidade: 0 }] })).toBe(false);
    });
});