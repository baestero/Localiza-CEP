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
    buscadorCep(CEP);
  } else {
    alert("Digite CEP com 8 dígitos");
  }
});

function buscadorCep(CEP) {
  document.querySelector(".resultado").style.display = "none";
  document.querySelector(".mapa").style.display = "none";

  document.querySelectorAll(".link").forEach((item) => {
    item.href = `https://www.google.com.br/maps/place/${CEP}`;
  });

  fetch(`https://viacep.com.br/ws/${CEP}/json/`)
    .then((r) => r.json())
    .then((json) => {
      if (json.erro === true) {
        erro.innerText = "CEP inexistente";
        codigoPostal.innerText = "";
        bairro.innerText = "";
        logradouro.innerText = "";
        localidade.innerText = "";

        document.querySelectorAll(".link").forEach((item) => {
          item.href = "#";
          item.target = "";
        });

        document.querySelector(".mapa").style.display = "grid";
        document.querySelector(".resultado").style.display = "grid";
        document.querySelector(".resultado-container").style.display = "grid";
      } else {
        erro.innerText = "";
        codigoPostal.innerText = json.cep;
        bairro.innerText = json.bairro;
        logradouro.innerText = json.logradouro;
        localidade.innerText = json.localidade;

        document.querySelector(".mapa").style.display = "grid";
        document.querySelector(".resultado").style.display = "grid";
        document.querySelector(".resultado-container").style.display = "grid";
      }
    });
}

const animacao = document.querySelectorAll(".js-scroll");

animacao.forEach((item) => {
  item.classList.add("animacao-ativo");
});
