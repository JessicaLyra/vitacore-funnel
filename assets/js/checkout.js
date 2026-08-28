// Objeto que concentra as informações das três ofertas.
// Cada chave representa o identificador recebido pela URL.
const plans = {
  1: {
    name: "Experimente",
    description: "1 frasco • 30 porções",
    price: 99
  },

  3: {
    name: "Rotina Completa",
    description: "3 frascos • 90 porções",
    price: 239
  },

  6: {
    name: "Plano Estendido",
    description: "6 frascos • 180 porções",
    price: 419
  }
};

// Lê os parâmetros existentes na URL atual.
// Exemplo: checkout.html?plan=3
const queryParameters = new URLSearchParams(
  window.location.search
);

// Procura o parâmetro chamado "plan".
// Se ele não existir, utiliza o plano 3 como padrão.
const selectedPlanId = queryParameters.get("plan") || "3";

// Procura os dados do plano no objeto "plans".
// Se o ID recebido for inválido, utiliza o plano 3.
const selectedPlan =
  plans[selectedPlanId] || plans["3"];

// Seleciona o formulário do checkout.
const checkoutForm = document.getElementById(
  "checkout-form"
);

// Seleciona a mensagem de confirmação.
const successMessage = document.getElementById(
  "checkout-success"
);

// Seleciona os elementos do resumo do pedido.
const summaryPlan = document.getElementById(
  "summary-plan"
);

const summaryDescription = document.getElementById(
  "summary-description"
);

const summarySubtotal = document.getElementById(
  "summary-subtotal"
);

const summaryTotal = document.getElementById(
  "summary-total"
);

/**
 * Converte um número para o formato de moeda brasileira.
 *
 * Exemplo:
 * 239 vira R$ 239,00.
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
 * Atualiza o resumo do checkout com a oferta selecionada.
 */
function updateOrderSummary() {
  // Exibe o nome do plano.
  summaryPlan.textContent = selectedPlan.name;

  // Exibe a quantidade de frascos e porções.
  summaryDescription.textContent =
    selectedPlan.description;

  // Formata e exibe o subtotal.
  summarySubtotal.textContent = formatPrice(
    selectedPlan.price
  );

  // Formata e exibe o total.
  summaryTotal.textContent = formatPrice(
    selectedPlan.price
  );
}

/**
 * Apresenta um erro em um campo do formulário.
 *
 * @param {HTMLElement} field Campo com erro.
 * @param {string} message Mensagem que será apresentada.
 */
function showFieldError(field, message) {
  // Monta o ID da mensagem com base no ID do campo.
  // Exemplo: email transforma-se em email-error.
  const errorElement = document.getElementById(
    `${field.id}-error`
  );

  // Adiciona a classe que deixa a borda vermelha.
  field.classList.add("invalid");

  // Verifica se o elemento da mensagem existe.
  if (errorElement) {
    // Exibe a mensagem correspondente.
    errorElement.textContent = message;
  }
}

/**
 * Remove o erro visual de um campo.
 *
 * @param {HTMLElement} field Campo que será limpo.
 */
function clearFieldError(field) {
  // Procura a mensagem ligada ao campo.
  const errorElement = document.getElementById(
    `${field.id}-error`
  );

  // Remove a borda vermelha.
  field.classList.remove("invalid");

  // Verifica se existe uma área para a mensagem.
  if (errorElement) {
    // Remove o texto de erro.
    errorElement.textContent = "";
  }
}

/**
 * Verifica se o texto possui um formato básico de e-mail.
 *
 * @param {string} email Endereço digitado.
 * @returns {boolean} Retorna true se o formato for válido.
 */
function validateEmail(email) {
  // Expressão regular que verifica:
  // texto + @ + domínio + extensão.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

/**
 * Valida todos os campos obrigatórios do checkout.
 *
 * @returns {boolean} Informa se o formulário é válido.
 */
function validateForm() {
  // Lista dos campos obrigatórios e suas mensagens.
  const requiredFields = [
    {
      id: "name",
      message: "Informe seu nome completo."
    },
    {
      id: "email",
      message: "Informe seu e-mail."
    },
    {
      id: "phone",
      message: "Informe seu telefone."
    },
    {
      id: "country",
      message: "Selecione um país."
    },
    {
      id: "postal-code",
      message: "Informe o CEP ou código postal."
    },
    {
      id: "address",
      message: "Informe seu endereço."
    },
    {
      id: "city",
      message: "Informe sua cidade."
    },
    {
      id: "state",
      message: "Informe seu estado ou região."
    },
    {
      id: "payment-method",
      message: "Selecione uma forma de pagamento."
    }
  ];

  // O formulário começa sendo considerado válido.
  let formIsValid = true;

  // Percorre a lista de campos obrigatórios.
  requiredFields.forEach((fieldData) => {
    // Procura o campo pelo ID.
    const field = document.getElementById(
      fieldData.id
    );

    // Limpa um possível erro anterior.
    clearFieldError(field);

    // Verifica se o campo está vazio.
    if (!field.value.trim()) {
      // Mostra a mensagem correspondente.
      showFieldError(field, fieldData.message);

      // Informa que o formulário contém erro.
      formIsValid = false;
    }
  });

  // Seleciona especificamente o campo de e-mail.
  const emailField = document.getElementById("email");

  // Verifica se o e-mail foi preenchido,
  // mas não possui um formato válido.
  if (
    emailField.value &&
    !validateEmail(emailField.value)
  ) {
    showFieldError(
      emailField,
      "Digite um endereço de e-mail válido."
    );

    formIsValid = false;
  }

  // Seleciona o checkbox dos termos.
  const termsField = document.getElementById("terms");

  // Seleciona a área reservada para o erro dos termos.
  const termsError = document.getElementById(
    "terms-error"
  );

  // Limpa a mensagem anterior.
  termsError.textContent = "";

  // Verifica se os termos não foram aceitos.
  if (!termsField.checked) {
    termsError.textContent =
      "Você precisa aceitar os termos para continuar.";

    formIsValid = false;
  }

  // Retorna o resultado final da validação.
  return formIsValid;
}

/**
 * Cria um objeto com os dados necessários para a próxima etapa.
 *
 * Não armazenamos e-mail, telefone ou endereço, porque esses
 * dados não serão necessários na página de upsell.
 *
 * @returns {object} Pedido criado.
 */
function createOrder() {
  // Monta o objeto com os dados do pedido.
  const order = {
    planId: selectedPlanId,
    planName: selectedPlan.name,
    quantity: Number(selectedPlanId),
    total: selectedPlan.price,

    customerName: document
      .getElementById("name")
      .value
      .trim(),

    country: document.getElementById(
      "country"
    ).value,

    paymentMethod: document.getElementById(
      "payment-method"
    ).value,

    createdAt: new Date().toISOString()
  };

  // Converte o objeto para texto e guarda no sessionStorage.
  // O dado permanece somente durante a sessão do navegador.
  sessionStorage.setItem(
    "vitacoreOrder",
    JSON.stringify(order)
  );

  // Devolve o pedido criado.
  return order;
}

// Aguarda o envio do formulário.
checkoutForm.addEventListener("submit", (event) => {
  // Impede o navegador de recarregar a página.
  event.preventDefault();

  // Executa a validação.
  if (!validateForm()) {
    // Localiza o primeiro campo que possui erro.
    const firstInvalidField =
      document.querySelector(".invalid");

    // Coloca o cursor no primeiro campo inválido.
    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    // Interrompe a função.
    return;
  }

  // Cria e armazena o pedido.
  createOrder();

  // Mostra a confirmação visual.
  successMessage.classList.add("show");

  // Esconde a confirmação após quatro segundos.
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 4000);

  // Registra a conclusão no Console.
  console.log("Pedido criado com sucesso.");
});

// Seleciona todos os inputs e selects do formulário.
checkoutForm
  .querySelectorAll("input, select")
  .forEach((field) => {
    // Ao alterar um campo, remove seu erro anterior.
    field.addEventListener("input", () => {
      clearFieldError(field);
    });
  });

// Atualiza o resumo assim que o JavaScript é carregado.
updateOrderSummary();