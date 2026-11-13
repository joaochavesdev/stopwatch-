// Elementos da página
const display = document.getElementById("display");
const btnIniciar = document.getElementById("btn-iniciar");
const btnPausar = document.getElementById("btn-pausar");
const btnZerar = document.getElementById("btn-zerar");

// Estado do cronômetro
let inicio = 0;        // momento (em ms) em que o cronômetro foi iniciado
let acumulado = 0;     // tempo já contado antes da última pausa
let intervalo = null;  // guarda o setInterval para poder parar depois

// Transforma milissegundos em "MM:SS.CC"
function formatar(ms) {
  const minutos = Math.floor(ms / 60000);
  const segundos = Math.floor((ms % 60000) / 1000);
  const centesimos = Math.floor((ms % 1000) / 10);

  return (
    String(minutos).padStart(2, "0") + ":" +
    String(segundos).padStart(2, "0") + "." +
    String(centesimos).padStart(2, "0")
  );
}

// Calcula quanto tempo passou e atualiza a tela
function atualizar() {
  const decorrido = acumulado + (Date.now() - inicio);
  display.textContent = formatar(decorrido);
}

function iniciar() {
  if (intervalo !== null) return; // já está rodando

  inicio = Date.now();
  intervalo = setInterval(atualizar, 10);

  btnIniciar.disabled = true;
  btnPausar.disabled = false;
}

function pausar() {
  if (intervalo === null) return; // já está pausado

  clearInterval(intervalo);
  intervalo = null;
  acumulado += Date.now() - inicio; // guarda o que já passou

  btnIniciar.disabled = false;
  btnPausar.disabled = true;
}

function zerar() {
  clearInterval(intervalo);
  intervalo = null;
  acumulado = 0;
  display.textContent = formatar(0);

  btnIniciar.disabled = false;
  btnPausar.disabled = true;
}

btnIniciar.addEventListener("click", iniciar);
btnPausar.addEventListener("click", pausar);
btnZerar.addEventListener("click", zerar);