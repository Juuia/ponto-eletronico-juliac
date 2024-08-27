const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min=seg");

diaSemana.textContent = "Domingoooooooooo"
diaMesAno.textContent = getCurrentDate();

function getCurrentHour() {
    // getHours()
    // getMinutes()
    // getSeconds()
    // separados por ":"
    // todos com dois dígitos (se menor que 10, 0 a esquerda)
    // retorna hora:minuto:segundo
}

function getCurrentDate() {
    const date = new Date();
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

