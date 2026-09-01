// Procura o pedido armazenado durante o checkout.
const storedOrder = sessionStorage.getItem(
  "vitacoreOrder"
);

// A página de confirmação só pode ser acessada
// quando existe um pedido na sessão.
if (!storedOrder) {
  // Se não houver pedido, volta para a Sales Page.
  window.location.replace("index.html");
} else {
  // Converte o pedido armazenado em texto JSON
  // novamente para um objeto JavaScript.
  const order = JSON.parse(storedOrder);

  // Informações das ofertas principais.
  // Essas informações ajudam a montar o resumo final.
  const plans = {
    1: {
      name: "Experimente",
      description: "1 frasco • 30 porções",
      quantity: 1,
      price: 99
    },

    3: {
      name: "Rotina Completa",
      description: "3 frascos • 90 porções",
      quantity: 3,
      price: 239
    },

    6: {
      name: "Plano Estendido",
      description: "6 frascos • 180 porções",
      quantity: 6,
      price: 419
    }
  };

  // Localiza o plano principal do pedido.
  // Se o identificador for inválido, utiliza o plano 3.
  const selectedPlan =
    plans[order.planId] || plans["3"];

  // Seleciona as informações gerais da confirmação.
  const customerNameElement = document.getElementById(
    "customer-name"
  );

  const orderNumberElement = document.getElementById(
    "order-number"
  );

  const orderDateElement = document.getElementById(
    "order-date"
  );

  // Seleciona as informações do produto principal.
  const mainPlanElement = document.getElementById(
    "main-plan"
  );

  const mainDescriptionElement =
    document.getElementById(
      "main-description"
    );

  const mainQuantityElement = document.getElementById(
    "main-quantity"
  );

  const mainTotalElement = document.getElementById(
    "main-total"
  );

  // Seleciona as linhas do Upsell e do Downsell.
  const upsellItem = document.getElementById(
    "upsell-item"
  );

  const downsellItem = document.getElementById(
    "downsell-item"
  );

  // Seleciona os totais do pedido.
  const totalQuantityElement =
    document.getElementById(
      "total-quantity"
    );

  const paymentMethodElement =
    document.getElementById(
      "payment-method"
    );

  const grandTotalElement = document.getElementById(
    "grand-total"
  );

  /**
   * Converte um número para moeda brasileira.
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
   * Converte a data do pedido para o padrão brasileiro.
   *
   * @param {string} dateString Data armazenada no pedido.
   * @returns {string} Data e horário formatados.
   */
  function formatOrderDate(dateString) {
    const orderDate = new Date(dateString);

    return orderDate.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    });
  }

  /**
   * Gera um número de pedido.
   *
   * O número é criado apenas uma vez e armazenado
   * junto com o pedido no Session Storage.
   *
   * @returns {string} Número do pedido.
   */
  function getOrderNumber() {
    // Se o pedido já possui um número, reutiliza.
    if (order.orderNumber) {
      return order.orderNumber;
    }

    // Gera um número aleatório entre 100000 e 999999.
    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    // Monta o identificador final.
    order.orderNumber = `VTC-${randomNumber}`;

    // Atualiza o pedido armazenado.
    sessionStorage.setItem(
      "vitacoreOrder",
      JSON.stringify(order)
    );

    return order.orderNumber;
  }

  /**
   * Converte o identificador da forma de pagamento
   * para um texto mais amigável.
   *
   * @param {string} paymentMethod Identificador armazenado.
   * @returns {string} Nome apresentado na página.
   */
  function formatPaymentMethod(paymentMethod) {
    const paymentMethods = {
      pix: "Pix",
      "credit-card": "Cartão de crédito"
    };

    return (
      paymentMethods[paymentMethod] ||
      "Pagamento confirmado"
    );
  }

  /**
   * Retorna somente o primeiro nome do cliente.
   *
   * @param {string} fullName Nome completo.
   * @returns {string} Primeiro nome.
   */
  function getFirstName(fullName) {
    if (!fullName) {
      return "Cliente";
    }

    return fullName.trim().split(" ")[0];
  }

  /**
   * Verifica se o Upsell foi aceito.
   *
   * @returns {boolean} Resultado da escolha.
   */
  function wasUpsellAccepted() {
    return order.upsell?.accepted === true;
  }

  /**
   * Verifica se o Downsell foi aceito.
   *
   * @returns {boolean} Resultado da escolha.
   */
  function wasDownsellAccepted() {
    return order.downsell?.accepted === true;
  }

  /**
   * Calcula a quantidade total de frascos.
   *
   * @returns {number} Quantidade final.
   */
  function calculateTotalQuantity() {
    // Começa com a quantidade da oferta principal.
    let totalQuantity = selectedPlan.quantity;

    // Soma dois frascos caso o Upsell tenha sido aceito.
    if (wasUpsellAccepted()) {
      totalQuantity += Number(
        order.upsell.quantity
      );
    }

    // Soma um frasco caso o Downsell tenha sido aceito.
    if (wasDownsellAccepted()) {
      totalQuantity += Number(
        order.downsell.quantity
      );
    }

    return totalQuantity;
  }

  /**
   * Atualiza os dados gerais do pedido.
   */
  function updateGeneralInformation() {
    customerNameElement.textContent = getFirstName(
      order.customerName
    );

    orderNumberElement.textContent =
      getOrderNumber();

    orderDateElement.textContent = formatOrderDate(
      order.createdAt
    );
  }

  /**
   * Atualiza os dados da oferta principal.
   */
  function updateMainProduct() {
    mainPlanElement.textContent = selectedPlan.name;

    mainDescriptionElement.textContent =
      selectedPlan.description;

    mainQuantityElement.textContent =
      `${selectedPlan.quantity} ${
        selectedPlan.quantity === 1
          ? "unidade"
          : "unidades"
      }`;

    mainTotalElement.textContent = formatPrice(
      selectedPlan.price
    );
  }

  /**
   * Mostra somente as ofertas adicionais aceitas.
   */
  function updateAdditionalOffers() {
    // Oculta o Upsell quando ele não foi aceito.
    if (!wasUpsellAccepted()) {
      upsellItem.classList.add("hidden");
    }

    // Oculta o Downsell quando ele não foi aceito.
    if (!wasDownsellAccepted()) {
      downsellItem.classList.add("hidden");
    }
  }

  /**
   * Atualiza quantidade, pagamento e valor final.
   */
  function updateFinalTotals() {
    const totalQuantity =
      calculateTotalQuantity();

    totalQuantityElement.textContent =
      `${totalQuantity} ${
        totalQuantity === 1
          ? "frasco"
          : "frascos"
      }`;

    paymentMethodElement.textContent =
      formatPaymentMethod(
        order.paymentMethod
      );

    grandTotalElement.textContent = formatPrice(
      Number(order.total)
    );
  }

  /**
   * Inicializa a página de confirmação.
   */
  function initializeThankYouPage() {
    updateGeneralInformation();
    updateMainProduct();
    updateAdditionalOffers();
    updateFinalTotals();

    // Registra o pedido final no Console.
    console.log("Pedido final confirmado:", order);
  }

  // Executa a montagem da página.
  initializeThankYouPage();
}