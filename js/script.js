const entrada = document.querySelector("#entrada");
const btn = document.querySelector("#btn");
const codigoPostal = document.querySelector(".codigoPostal");
const bairro = document.querySelector(".bairro");
const logradouro = document.querySelector(".logradouro");
const localidade = document.querySelector(".localidade");
const erro = document.querySelector(".erro");

btn.addEventListener("click", () => {
  const CEP = entrada.value;
  if (CEP.length === 8) {
    displayNone();
    buscadorCep(CEP);
    linkMaps(CEP);
  } else {
    alert("Digite CEP com 8 dígitos sem pontos ou traços.");
  }
});

function displayNone() {
  document
    .querySelectorAll(".resultado, .mapa")
    .forEach((item) => (item.style.display = "none"));
}

async function buscadorCep(CEP) {
  const responseDados = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
  const jsonDados = await responseDados.json();

  if (jsonDados.erro === true) {
    erro.innerText = "CEP inexistente";

    const elementosJson = [codigoPostal, bairro, logradouro, localidade];
    elementosJson.forEach((elemento) => (elemento.innerText = ""));

    removeTargetBlank();
    ativarGrid();
  } else {
    erro.innerText = "";
    codigoPostal.innerText = jsonDados.cep;
    bairro.innerText = jsonDados.bairro;
    logradouro.innerText = jsonDados.logradouro;
    localidade.innerText = jsonDados.localidade;

    ativarGrid();
  }
}

function linkMaps(CEP) {
  document.querySelectorAll(".link").forEach((item) => {
    item.href = `https://www.google.com.br/maps/place/${CEP}`;
    item.target = "_blank";
  });
}

function removeTargetBlank() {
  document.querySelectorAll(".link").forEach((item) => {
    (item.href = "#"), (item.target = "");
  });
}

function ativarGrid() {
  document
    .querySelectorAll(".mapa, .resultado, .resultado-container")
    .forEach((classes) => {
      classes.style.display = "grid";
    });
}

function animacao() {
  const animacao = document.querySelectorAll(".js-scroll");
  animacao.forEach((item) => {
    item.classList.add("animacao-ativo");
  });
}

animacao();
