const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = "Hora: " + getCurrentHour();

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

function register() {
    dialogPonto.showModal();
}


function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 
    }
    // getHours()
    // getMinutes()
    // getSeconds()
    // separados por ":"
    // todos com dois dígitos (se menor que 10, 0 a esquerda)
    // retorna hora:minuto:segundo

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();

}


function getCurrentDate() {
    const date = new Date();
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

setInterval

//const date = new Date();
//const options = {
//    month: '2-digit',
//    day: '2-digit',
//    year: 'numeric'
//};
//    return date.toLocaleDateString();
