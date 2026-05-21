function readableType(type) {
  const labels = {
    calculo: "Cálculo",
    unidades: "Unidades",
    lengua: "Lengua",
    logica: "Lógica",
    instrucciones: "Instrucciones",
    ciencias: "Ciencias",
    informacion: "Información",
    sin_error: "Sin error"
  };
  return labels[type] || "Caso";
}

function setScreen(homeScreen, blockScreen, screenName) {
  homeScreen.classList.toggle("active", screenName === "home");
  blockScreen.classList.toggle("active", screenName === "block");
}
