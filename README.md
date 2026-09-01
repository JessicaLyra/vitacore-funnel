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

### Upsell

- Recuperação do pedido pelo Session Storage
- Exibição do nome do cliente e da oferta selecionada
- Cálculo do valor original e do total com oferta adicional
- Oferta de dois frascos extras
- Registro de aceitação ou recusa
- Atualização do total do pedido
- Prevenção de cliques repetidos
- Confirmação visual da escolha
- Layout responsivo

### Downsell

- Acesso após a recusa do Upsell
- Recuperação do pedido pelo Session Storage
- Oferta alternativa de um frasco adicional
- Cálculo do valor original e do total atualizado
- Registro de aceitação ou recusa
- Atualização do valor final do pedido
- Prevenção de cliques repetidos
- Confirmação visual da escolha
- Layout responsivo

### Thank-you Page

- Confirmação final do pedido
- Geração e persistência do número do pedido
- Exibição do cliente, data e forma de pagamento
- Resumo dinâmico da oferta principal
- Exibição somente das ofertas adicionais aceitas
- Cálculo da quantidade total de frascos
- Exibição do valor final
- Orientações de acompanhamento do pedido
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

vitacore-funnel/
├── index.html
├── checkout.html
├── upsell.html
├── downsell.html
├── thank-you.html
├── README.md
└── assets/
    ├── css/
    │   ├── styles.css
    │   ├── checkout.css
    │   ├── upsell.css
    │   ├── downsell.css
    │   └── thank-you.css
    ├── images/
    │   └── vitacore-produto.png
    └── js/
        ├── main.js
        ├── checkout.js
        ├── upsell.js
        ├── downsell.js
        └── thank-you.js

## Como executar

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no VS Code.
3. Execute o `index.html` utilizando o Live Server.
4. Escolha uma das ofertas para acessar o checkout.

## Fluxo atual

```
Sales Page → Seleção da oferta → Checkout → Validação → Confirmação
```

## Próximas etapas

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