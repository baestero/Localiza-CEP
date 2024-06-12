const entrada = document.querySelector("#entrada");
const btn = document.querySelector("#btn");
const codigoPostal = document.querySelector(".codigoPostal");
const bairro = document.querySelector(".bairro");
const logradouro = document.querySelector(".logradouro");
const localidade = document.querySelector(".localidade");
const erro = document.querySelector(".erro");
const inexistente = document.querySelector(".inexistente");

btn.addEventListener("click", () => {
  const CEP = entrada.value;
  erro.style.display = "none";

  if (CEP.length === 8) {
    displayNone();
    buscadorCep(CEP);
    linkMaps(CEP);
  } else {
    limpaJson();
    erroContainer();
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
    inexistente.innerText = "CEP inexistente";

    limpaJson();
    removeTargetBlank();
    ativarGrid();
  } else {
    inexistente.innerText = "";
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

function limpaJson() {
  const elementosJson = [codigoPostal, bairro, logradouro, localidade];
  elementosJson.forEach((elemento) => (elemento.innerText = ""));
}

function erroContainer() {
  inexistente.style.display = "none";
  erro.innerText = "Digite um CEP com 8 dígitos sem pontos ou traços.";
  document
    .querySelectorAll(".resultado, .erro, .resultado-container")
    .forEach((item) => (item.style.display = "grid"));

  document.querySelector(".resultado-container").style.gridTemplateColumns =
    "1fr";

  document.querySelector(".link").style.display = "none";
  document.querySelector(".mapa").style.display = "none";
}

function removeTargetBlank() {
  document.querySelectorAll(".link").forEach((item) => {
    (item.href = "#"), (item.target = "");
  });
}

function ativarGrid() {
  document
    .querySelectorAll(".mapa, .resultado, .resultado-container, .inexistente")
    .forEach((classes) => {
      classes.style.display = "grid";
    });

  document.querySelector(".resultado-container").style.gridTemplateColumns =
    "1fr 1fr";
  document.querySelector(".link").style.display = "grid";
}

function animacao() {
  const animacao = document.querySelectorAll(".js-scroll");
  animacao.forEach((item) => {
    item.classList.add("animacao-ativo");
  });
}

animacao();
