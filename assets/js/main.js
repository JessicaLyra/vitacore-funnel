const toast = document.getElementById("toast");
const offerButtons = document.querySelectorAll(".choose");
const playButton = document.getElementById("play");

let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3600);
}

offerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPlan = button.dataset.plan;

    showToast(
      `Oferta de ${selectedPlan} selecionada. Estamos preparando seu checkout.`
    );
  });
});

playButton.addEventListener("click", () => {
  showToast(
    "A VSL será integrada em uma etapa futura. Este bloco demonstra sua posição na Sales Page."
  );
});