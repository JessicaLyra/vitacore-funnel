// Seleciona a caixa usada para mostrar mensagens na Sales Page.
const toast = document.getElementById("toast");

// Seleciona todos os botões que possuem a classe "choose".
const offerButtons = document.querySelectorAll(".choose");

// Seleciona o botão da área da VSL.
const playButton = document.getElementById("play");

// Guardará o temporizador responsável por esconder a mensagem.
let toastTimer;

/**
 * Mostra uma mensagem temporária na parte inferior da página.
 *
 * @param {string} message Texto que será apresentado.
 */
function showToast(message) {
  // Cancela o temporizador anterior, caso exista.
  clearTimeout(toastTimer);

  // Coloca a mensagem dentro do elemento.
  toast.textContent = message;

  // Adiciona a classe que deixa a mensagem visível.
  toast.classList.add("show");

  // Espera 3,6 segundos antes de esconder a mensagem.
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3600);
}

/**
 * Abre o checkout levando o identificador da oferta.
 *
 * @param {string} planId Identificador do plano: 1, 3 ou 6.
 */
function goToCheckout(planId) {
  // Cria uma URL para o checkout com base na página atual.
  const checkoutUrl = new URL(
    "checkout.html",
    window.location.href
  );

  // Acrescenta o plano como parâmetro da URL.
  // Exemplo: checkout.html?plan=3
  checkoutUrl.searchParams.set("plan", planId);

  // Redireciona o navegador para o checkout.
  window.location.href = checkoutUrl.toString();
}

// Percorre todos os botões das ofertas.
offerButtons.forEach((button) => {
  // Adiciona um evento de clique em cada botão.
  button.addEventListener("click", () => {
    // Lê o valor do atributo data-plan do botão clicado.
    const selectedPlanId = button.dataset.plan;

    // Envia o plano selecionado para o checkout.
    goToCheckout(selectedPlanId);
  });
});

// Aguarda o clique no botão da VSL.
playButton.addEventListener("click", () => {
  // Mostra uma mensagem enquanto o vídeo ainda não está disponível.
  showToast(
    "O vídeo de apresentação estará disponível em breve."
  );
});