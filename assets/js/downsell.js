// Valor da oferta apresentada no Downsell.
const downsellPrice = 79;

// Procura no Session Storage o pedido criado no checkout.
const storedOrder = sessionStorage.getItem(
  "vitacoreOrder"
);

// Cria um pedido padrão caso a página seja acessada
// diretamente, sem passar pelo checkout.
const defaultOrder = {
  planId: "3",
  planName: "Rotina Completa",
  quantity: 3,
  total: 239,
  baseTotal: 239,
  customerName: "",
  country: "BR",
  paymentMethod: "",
  createdAt: new Date().toISOString(),
  upsell: {
    accepted: false,
    productName: "VitaCore Balance",
    quantity: 0,
    price: 0
  }
};

// Se houver um pedido armazenado, converte o texto JSON
// novamente para um objeto JavaScript.
// Caso contrário, utiliza o pedido padrão.
const order = storedOrder
  ? JSON.parse(storedOrder)
  : defaultOrder;

// Recupera o valor original do pedido.
// O baseTotal foi criado no Upsell para preservar
// o valor antes das ofertas adicionais.
const baseOrderTotal = Number(
  order.baseTotal || order.total
);

// Seleciona as informações do cliente e do pedido.
const customerName = document.getElementById(
  "customer-name"
);

const currentPlan = document.getElementById(
  "current-plan"
);

const currentTotal = document.getElementById(
  "current-total"
);

const totalWithDownsell = document.getElementById(
  "total-with-downsell"
);

// Seleciona os botões da oferta.
const acceptButton = document.getElementById(
  "accept-downsell"
);

const declineButton = document.getElementById(
  "decline-downsell"
);

// Seleciona a mensagem apresentada após a escolha.
const downsellMessage = document.getElementById(
  "downsell-message"
);

const messageIcon = document.querySelector(
  ".message-icon"
);

const messageTitle = document.getElementById(
  "message-title"
);

const messageDescription = document.getElementById(
  "message-description"
);

// Guardará o temporizador da mensagem.
let messageTimer;

/**
 * Converte um número para o formato de moeda brasileira.
 *
 * Exemplo:
 * 79 transforma-se em R$ 79,00.
 *
 * @param {number} price Valor que será formatado.
 * @returns {string} Valor formatado em reais.
 */
function formatPrice(price) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/**
 * Atualiza as informações visíveis do pedido.
 */
function updateOrderPreview() {
  // Exibe o nome do cliente quando estiver disponível.
  if (order.customerName) {
    customerName.textContent =
      `${order.customerName}, seu pedido continua confirmado.`;
  } else {
    customerName.textContent =
      "Seu pedido continua confirmado.";
  }

  // Exibe o nome da oferta original.
  currentPlan.textContent = order.planName;

  // Exibe o valor original do pedido.
  currentTotal.textContent = formatPrice(
    baseOrderTotal
  );

  // Calcula e exibe o total com o Downsell.
  totalWithDownsell.textContent = formatPrice(
    baseOrderTotal + downsellPrice
  );
}

/**
 * Mostra uma mensagem temporária após a escolha.
 *
 * @param {string} icon Símbolo apresentado.
 * @param {string} title Título da mensagem.
 * @param {string} description Descrição da mensagem.
 */
function showMessage(icon, title, description) {
  // Cancela o temporizador anterior, caso exista.
  clearTimeout(messageTimer);

  // Atualiza o conteúdo da mensagem.
  messageIcon.textContent = icon;
  messageTitle.textContent = title;
  messageDescription.textContent = description;

  // Exibe a mensagem.
  downsellMessage.classList.add("show");

  // Esconde a mensagem depois de quatro segundos.
  messageTimer = setTimeout(() => {
    downsellMessage.classList.remove("show");
  }, 4000);
}

/**
 * Desativa os botões após a escolha.
 * Isso impede que a oferta seja adicionada várias vezes.
 */
function disableOfferButtons() {
  acceptButton.disabled = true;
  declineButton.disabled = true;
}

/**
 * Registra a aceitação do Downsell.
 */
function acceptDownsell() {
  // Cria as informações da oferta aceita.
  const downsell = {
    accepted: true,
    productName: "VitaCore Balance",
    quantity: 1,
    price: downsellPrice
  };

  // Preserva o valor original do pedido.
  order.baseTotal = baseOrderTotal;

  // Adiciona a escolha ao objeto do pedido.
  order.downsell = downsell;

  // Atualiza o total com o frasco adicional.
  order.total = baseOrderTotal + downsellPrice;

  // Salva o pedido atualizado no Session Storage.
  sessionStorage.setItem(
    "vitacoreOrder",
    JSON.stringify(order)
  );

  // Impede cliques repetidos.
  disableOfferButtons();

  // Mostra a confirmação para o cliente.
  showMessage(
    "✓",
    "Oferta adicionada!",
    `O novo total do pedido é ${formatPrice(order.total)}.`
  );

  // Registra o resultado no Console.
  console.log("Downsell aceito:", downsell);

  // Aguarda a confirmação visual e abre a página final.
    setTimeout(() => {
    window.location.href = "thank-you.html";
    }, 1500);
}

/**
 * Registra a recusa do Downsell.
 */
function declineDownsell() {
  // Cria as informações da oferta recusada.
  const downsell = {
    accepted: false,
    productName: "VitaCore Balance",
    quantity: 0,
    price: 0
  };

  // Preserva o valor original do pedido.
  order.baseTotal = baseOrderTotal;

  // Adiciona a recusa ao objeto do pedido.
  order.downsell = downsell;

  // Mantém o total original.
  order.total = baseOrderTotal;

  // Salva a escolha no Session Storage.
  sessionStorage.setItem(
    "vitacoreOrder",
    JSON.stringify(order)
  );

  // Impede cliques repetidos.
  disableOfferButtons();

  // Mostra a confirmação para o cliente.
  showMessage(
    "→",
    "Pedido mantido",
    "Seu pedido será finalizado com o valor original."
  );

  // Registra o resultado no Console.
  console.log("Downsell recusado:", downsell);

  // Finaliza o pedido sem adicionar a oferta.
    setTimeout(() => {
    window.location.href = "thank-you.html";
    }, 1500);
}

// Aguarda o clique no botão de aceitar.
acceptButton.addEventListener(
  "click",
  acceptDownsell
);

// Aguarda o clique no botão de recusar.
declineButton.addEventListener(
  "click",
  declineDownsell
);

// Preenche as informações quando a página é carregada.
updateOrderPreview();