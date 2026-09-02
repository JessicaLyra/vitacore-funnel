(function initializeCampaignTracking() {
  // Nome utilizado para guardar a campanha no Session Storage.
  const storageKey = "vitacoreCampaign";

  // Lista dos parâmetros que o projeto aceita.
  // Outros parâmetros da URL serão ignorados.
  const allowedParameters = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "affiliate_id",
    "click_id",
    "platform",
    "market",
    "currency",
    "variant"
  ];

  /**
   * Recupera uma campanha que já tenha sido armazenada.
   *
   * @returns {object} Dados armazenados ou objeto vazio.
   */
  function getStoredCampaign() {
    const storedCampaign = sessionStorage.getItem(
      storageKey
    );

    // Se ainda não existir campanha, retorna um objeto vazio.
    if (!storedCampaign) {
      return {};
    }

    try {
      // Converte o texto JSON novamente para objeto.
      return JSON.parse(storedCampaign);
    } catch (error) {
      // Se o conteúdo estiver inválido, remove o valor corrompido.
      sessionStorage.removeItem(storageKey);

      console.warn(
        "Os dados anteriores da campanha estavam inválidos.",
        error
      );

      return {};
    }
  }

  /**
   * Lê somente os parâmetros permitidos na URL.
   *
   * @returns {object} Parâmetros encontrados.
   */
  function getCampaignParametersFromUrl() {
    const urlParameters = new URLSearchParams(
      window.location.search
    );

    const capturedParameters = {};

    allowedParameters.forEach((parameterName) => {
      const parameterValue =
        urlParameters.get(parameterName);

      // Ignora parâmetros ausentes ou vazios.
      if (!parameterValue?.trim()) {
        return;
      }

      // Limita o tamanho para evitar valores excessivos.
      capturedParameters[parameterName] =
        parameterValue.trim().slice(0, 200);
    });

    return capturedParameters;
  }

  /**
   * Verifica se o objeto possui parâmetros de campanha.
   *
   * @param {object} parameters Parâmetros capturados.
   * @returns {boolean} Resultado da verificação.
   */
  function hasCampaignParameters(parameters) {
    return Object.keys(parameters).length > 0;
  }

  /**
   * Cria ou atualiza os dados da campanha.
   *
   * A regra usada nesta etapa é last touch:
   * novos parâmetros substituem os valores anteriores.
   *
   * @returns {object} Campanha atualizada.
   */
  function captureCampaign() {
    const storedCampaign = getStoredCampaign();

    const urlCampaign =
      getCampaignParametersFromUrl();

    const currentDate = new Date().toISOString();

    // Verifica se esta é a primeira entrada da sessão.
    const isFirstCapture =
      !storedCampaign.firstCapturedAt;

    // Se não houver UTMs na primeira entrada,
    // registra a origem como acesso direto.
    const directTraffic =
      isFirstCapture &&
      !hasCampaignParameters(urlCampaign)
        ? {
            utm_source: "direct",
            utm_medium: "none"
          }
        : {};

    // Mantém os dados anteriores e substitui somente
    // os parâmetros que chegaram na URL atual.
    const campaign = {
      ...storedCampaign,
      ...directTraffic,
      ...urlCampaign,

      // A primeira página de entrada é preservada.
      landingPage:
        storedCampaign.landingPage ||
        `${window.location.pathname}${window.location.search}`,

      // Registra o site de origem, quando disponível.
      referrer:
        storedCampaign.referrer ||
        document.referrer ||
        "direct",

      // A primeira captura não deve ser alterada.
      firstCapturedAt:
        storedCampaign.firstCapturedAt ||
        currentDate,

      // Atualiza sempre que novos parâmetros são recebidos.
      lastUpdatedAt: hasCampaignParameters(
        urlCampaign
      )
        ? currentDate
        : storedCampaign.lastUpdatedAt ||
          currentDate,

      // Informa qual página executou a última leitura.
      lastPage: window.location.pathname,

      // Regra de atribuição utilizada.
      attributionModel: "last_touch"
    };

    // Guarda a campanha durante a sessão do funil.
    sessionStorage.setItem(
      storageKey,
      JSON.stringify(campaign)
    );

    return campaign;
  }

  /**
   * Retorna os dados atuais da campanha.
   *
   * @returns {object} Campanha armazenada.
   */
  function getCampaign() {
    return getStoredCampaign();
  }

  /**
   * Adiciona os parâmetros da campanha a uma URL.
   *
   * Essa função poderá ser utilizada futuramente
   * em links externos ou checkouts de plataformas.
   *
   * @param {string} destinationUrl URL de destino.
   * @returns {string} URL com os parâmetros.
   */
  function appendCampaignToUrl(destinationUrl) {
    const campaign = getCampaign();

    const finalUrl = new URL(
      destinationUrl,
      window.location.href
    );

    allowedParameters.forEach((parameterName) => {
      const parameterValue = campaign[parameterName];

      if (parameterValue) {
        finalUrl.searchParams.set(
          parameterName,
          parameterValue
        );
      }
    });

    return finalUrl.toString();
  }

  // Executa a captura ao carregar qualquer página.
  const currentCampaign = captureCampaign();

  // Disponibiliza funções para os demais arquivos.
  // Exemplo: window.VitaCoreCampaign.getCampaign()
  window.VitaCoreCampaign = {
    getCampaign,
    appendCampaignToUrl
  };

  // Exibe os dados para facilitar a validação no DevTools.
  console.log(
    "Campanha VitaCore:",
    currentCampaign
  );
})();