// Valor da oferta adicional apresentada no upsell.
const upsellPrice = 149;

// Procura o pedido criado anteriormente pelo checkout.
const storedOrder = sessionStorage.getItem(
  "vitacoreOrder"
);

// Define um pedido padrão caso a página seja acessada
// diretamente, sem passar pelo checkout.
const defaultOrder = {
  planId: "3",
  planName: "Rotina Completa",
  quantity: 3,
  total: 239,
  customerName: "",
  country: "BR",
  paymentMethod: "",
  createdAt: new Date().toISOString()
};

// Se existe um pedido no Session Storage, converte o texto
// armazenado novamente para um objeto JavaScript.
// Caso contrário, utiliza o pedido padrão.
const order = storedOrder
  ? JSON.parse(storedOrder)
  : defaultOrder;

// Guarda separadamente o valor original do pedido.
// Isso evita que o upsell seja somado mais de uma vez.
const baseOrderTotal = Number(
  order.baseTotal || order.total
);

// Seleciona os elementos que receberão as informações do pedido.
const customerName = document.getElementById(
  "customer-name"
);

const currentPlan = document.getElementById(
  "current-plan"
);

const currentTotal = document.getElementById(
  "current-total"
);

const totalWithUpsell = document.getElementById(
  "total-with-upsell"
);

// Seleciona os botões de aceitar e recusar a oferta.
const acceptButton = document.getElementById(
  "accept-upsell"
);

const declineButton = document.getElementById(
  "decline-upsell"
);

// Seleciona a mensagem apresentada depois da escolha.
const upsellMessage = document.getElementById(
  "upsell-message"
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

// Guarda o temporizador usado para esconder a mensagem.
let messageTimer;

/**
 * Converte um número para o formato de moeda brasileira.
 *
 * Exemplo:
 * 149 transforma-se em R$ 149,00.
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
 * Atualiza os dados visíveis na página com base
 * no pedido criado no checkout.
 */
function updateOrderPreview() {
  // Exibe o nome da pessoa quando ele estiver disponível.
  if (order.customerName) {
    customerName.textContent =
      `${order.customerName}, seu pedido está confirmado.`;
  } else {
    customerName.textContent =
      "Seu pedido está confirmado.";
  }

  // Exibe o nome do plano escolhido.
  currentPlan.textContent = order.planName;

  // Exibe o valor original do pedido.
  currentTotal.textContent = formatPrice(
    baseOrderTotal
  );

  // Calcula e exibe o valor total caso o upsell seja aceito.
  totalWithUpsell.textContent = formatPrice(
    baseOrderTotal + upsellPrice
  );
}

/**
 * Mostra uma mensagem temporária após a escolha.
 *
 * @param {string} icon Símbolo exibido na mensagem.
 * @param {string} title Título da mensagem.
 * @param {string} description Descrição apresentada.
 */
function showMessage(icon, title, description) {
  // Cancela uma mensagem anterior, caso exista.
  clearTimeout(messageTimer);

  // Atualiza o conteúdo visual.
  messageIcon.textContent = icon;
  messageTitle.textContent = title;
  messageDescription.textContent = description;

  // Deixa a mensagem visível.
  upsellMessage.classList.add("show");

  // Esconde a mensagem depois de quatro segundos.
  messageTimer = setTimeout(() => {
    upsellMessage.classList.remove("show");
  }, 4000);
}

/**
 * Desativa os botões depois que uma escolha é feita.
 * Isso evita cliques repetidos.
 */
function disableOfferButtons() {
  acceptButton.disabled = true;
  declineButton.disabled = true;
}

/**
 * Registra a aceitação da oferta adicional.
 */
function acceptUpsell() {
  // Cria os dados da oferta adicional.
  const upsell = {
    accepted: true,
    productName: "VitaCore Balance",
    quantity: 2,
    price: upsellPrice
  };

  // Guarda o valor original do pedido.
  order.baseTotal = baseOrderTotal;

  // Adiciona as informações do upsell ao pedido.
  order.upsell = upsell;

  // Atualiza o valor final.
  order.total = baseOrderTotal + upsellPrice;

  // Salva o pedido atualizado no Session Storage.
  sessionStorage.setItem(
    "vitacoreOrder",
    JSON.stringify(order)
  );

  // Impede novos cliques.
  disableOfferButtons();

  // Mostra a confirmação.
  showMessage(
    "✓",
    "Oferta adicionada!",
    `O novo total do pedido é ${formatPrice(order.total)}.`
  );

  // Registra a escolha no Console.
  console.log("Upsell aceito:", upsell);
}

/**
 * Registra a recusa da oferta adicional.
 */
function declineUpsell() {
  // Cria o registro da recusa.
  const upsell = {
    accepted: false,
    productName: "VitaCore Balance",
    quantity: 0,
    price: 0
  };

  // Mantém o total original.
  order.baseTotal = baseOrderTotal;
  order.upsell = upsell;
  order.total = baseOrderTotal;

  // Salva a escolha no Session Storage.
  sessionStorage.setItem(
    "vitacoreOrder",
    JSON.stringify(order)
  );

  // Impede novos cliques.
  disableOfferButtons();

  // Mostra a confirmação.
  showMessage(
    "→",
    "Oferta não adicionada",
    "Seu pedido continuará com o valor original."
  );

  // Registra a escolha no Console.
  console.log("Upsell recusado:", upsell);
}

// Aguarda o clique no botão de aceitar.
acceptButton.addEventListener("click", acceptUpsell);

// Aguarda o clique no botão de recusar.
declineButton.addEventListener(
  "click",
  declineUpsell
);

// Preenche o resumo assim que a página é carregada.
updateOrderPreview();