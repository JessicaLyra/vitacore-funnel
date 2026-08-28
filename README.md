# VitaCore Funnel

Projeto demonstrativo de uma Sales Page voltada a uma operação fictícia de Direct Response e DTC.

O projeto está sendo desenvolvido em etapas para demonstrar a construção e a validação de um funil de vendas completo, incluindo páginas de oferta, checkout, upsell, downsell, tracking, UTMs, atribuição de afiliados e compliance.

## Etapa atual

### Sales Page

- Página de apresentação do VitaCore Balance
- Seção principal com chamada para ação
- Apresentação de benefícios
- Área preparada para VSL
- Seleção de ofertas
- Perguntas frequentes
- Layout responsivo
- Interações com JavaScript
- Redirecionamento da oferta selecionada para o checkout

### Checkout

- Recebimento da oferta por parâmetro de URL
- Resumo dinâmico do pedido
- Atualização do produto e preço
- Formulário de dados pessoais e entrega
- Seleção de país e forma de pagamento
- Validação de campos obrigatórios
- Validação do formato de e-mail
- Aceite obrigatório dos termos
- Armazenamento do pedido no Session Storage
- Confirmação visual do pedido
- Layout responsivo

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Manipulação do DOM
- URL Search Params
- Session Storage
- Design responsivo

## Estrutura

```text
vitacore-funnel/
├── index.html
├── checkout.html
├── README.md
└── assets/
    ├── css/
    │   ├── styles.css
    │   └── checkout.css
    ├── images/
    │   └── vitacore-produto.png
    └── js/
        ├── main.js
        └── checkout.js
```

## Como executar

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no VS Code.
3. Execute o `index.html` utilizando o Live Server.
4. Escolha uma das ofertas para acessar o checkout.

## Fluxo atual

```text
Sales Page → Seleção da oferta → Checkout → Validação → Confirmação
```

## Próximas etapas

- Upsell
- Downsell
- Thank-you Page
- Captura e persistência de UTMs
- Atribuição de afiliados
- Cookies
- Data Layer e eventos de tracking
- Painel de depuração
- Seletor de mercado e plataforma
- Páginas de compliance
- Testes do fluxo
- Deploy

## Aviso

Este é um projeto fictício criado exclusivamente para estudo e portfólio.

O produto, os preços e as condições apresentados não representam uma oferta comercial real. Nenhuma venda é realizada e nenhum pagamento é processado.