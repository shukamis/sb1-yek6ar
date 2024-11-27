# LoveTracker

Um aplicativo web para casais acompanharem e celebrarem seu relacionamento.

## Requisitos do Sistema

- Node.js 18+
- NPM 8+
- Navegador moderno com suporte a ES6+

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Documentação da API

### Autenticação

O sistema utiliza Firebase Authentication para gerenciar usuários.

### Endpoints

- `GET /api/relationship/:id` - Obtém detalhes do relacionamento
- `PUT /api/relationship/:id` - Atualiza informações do relacionamento
- `POST /api/stories` - Gera uma nova história

## Changelog

### v1.0.0 (2024-02-27)
- Implementação inicial do sistema
- Autenticação com Google
- Dashboard do casal
- Gerador de stories
- Sistema premium

### v1.1.0 (2024-02-28)
- Adicionado sistema de nomes do casal
- Melhorias na UI/UX
- Correções de bugs no calendário
- Otimização de performance

## Licença

MIT