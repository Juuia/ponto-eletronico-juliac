const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");
const btnBaterPonto = document.getElementById("btn-bater-ponto");
const dialogPonto = document.getElementById("dialog-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");

let registerLocalStorage = getRegisterLocalStorage();
let lastRegister = {};

// Atualiza as informações de data e hora na página
diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

btnBaterPonto.addEventListener("click", register);
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// Função para registrar ponto
function register() {
    const dialogData = document.getElementById("dialog-data");
    const dialogHora = document.getElementById("dialog-hora");

    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();

    let lastRegisterText = "Último registro: " + localStorage.getItem("lastDateRegister") + " - " + localStorage.getItem("lastTimeRegister") + " | " + localStorage.getItem("lastTypeRegister");
    document.getElementById("dialog-last-register").textContent = lastRegisterText;

    const horaInput = document.createElement("input");
    horaInput.type = "time";
    horaInput.id = "hora-input";
    horaInput.value = getCurrentHour(); // Define a hora atual como padrão

    const horaContainer = document.getElementById("hora-container"); // Um contêiner onde o campo de hora será adicionado
    horaContainer.innerHTML = ""; // Limpa o conteúdo anterior
    horaContainer.appendChild(horaInput); // Adiciona o campo de hora ao contêiner

    dialogPonto.showModal();
}

const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", () => {
    let typeRegister = document.getElementById("tipos-ponto").value;
    let selectedDate = document.getElementById("calendar").value;
    let currentDate = getCurrentDate();

    if (!selectedDate) {
        selectedDate = getCurrentDateFormatted();
    }

    if (new Date(selectedDate) > new Date(currentDate)) {
        alert("Não é permitido registrar ponto em data futura.");
        return;
    }

    let pontoHora = document.getElementById("hora-input").value; // Obtém a hora do input

    let ponto = {
        "data": selectedDate,
        "hora": pontoHora,
        "localizacao": getCurrentPosition(),
        "id": Date.now(),
        "tipo": typeRegister
    };

    saveRegisterLocalStorage(ponto);
    localStorage.setItem("lastTypeRegister", typeRegister);
    localStorage.setItem("lastDateRegister", ponto.data);
    localStorage.setItem("lastTimeRegister", ponto.hora);

    dialogPonto.close();
    divAlertaRegistroPonto.classList.remove("hidden");
    divAlertaRegistroPonto.classList.add("show");

    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
        divAlertaRegistroPonto.classList.add("hidden");
    }, 3000);
});

// Função para salvar o registro no localStorage
function saveRegisterLocalStorage(register) {
    registerLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registerLocalStorage));
}

// Função para obter registros do localStorage
function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    return registers ? JSON.parse(registers) : [];
}

// Função para obter a localização do usuário
function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        return position;
    });
}

// Funções auxiliares
function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

function getCurrentDate() {
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    if (month < 9) month = "0" + (month + 1);
    return day + "/" + (month + 1) + "/" + date.getFullYear();
}

function getCurrentDateFormatted() {
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    if (month < 9) month = "0" + (month + 1);
    return `${date.getFullYear()}-${month + 1}-${day}`;
}

// Atualiza a hora a cada segundo
function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}

printCurrentHour();
setInterval(printCurrentHour, 1000);

// Função para abrir o relatório
function openReport() {
    window.open('relatorio.html', '_blank');
}

document.getElementById("btn-view-report").addEventListener("click", openReport);
