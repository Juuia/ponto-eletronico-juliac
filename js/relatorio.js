document.addEventListener("DOMContentLoaded", () => {
    const registrosContainer = document.getElementById("registros-container");
    const registros = getRegisterLocalStorage();

    // Agrupar registros por data
    const registrosPorData = registros.reduce((acc, registro) => {
        const data = registro.data.split("T")[0]; // Pega apenas a data sem o horário
        if (!acc[data]) {
            acc[data] = [];
        }
        acc[data].push(registro);
        return acc;
    }, {});

    // Exibir registros agrupados por data
    Object.keys(registrosPorData).forEach(data => {
        const divData = document.createElement("div");
        divData.classList.add("data-registro");
        
        const dataFormatada = data.split("-").reverse().join("/"); // Formatação para exibição
        divData.innerHTML = `<h2>${dataFormatada}</h2>`;
        
        registrosPorData[data].forEach((registro, index) => {
            const divRegistro = document.createElement("div");
            divRegistro.classList.add("registro");

            divRegistro.innerHTML = `
                <p>${registro.hora} | Tipo: ${registro.tipo}</p>
                <button class="btn-editar" data-data="${data}" data-index="${index}">Editar</button>
                <button class="btn-excluir" data-index="${index}">Excluir</button>
            `;

            divData.appendChild(divRegistro);
        });

        registrosContainer.appendChild(divData);
    });

    const btnVoltar = document.getElementById("btn-voltar");
    btnVoltar.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Lógica de edição
    const btnEditar = document.querySelectorAll(".btn-editar");
    btnEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const data = e.target.dataset.data; // Obtém a data do botão
            const index = e.target.dataset.index; // Obtém o índice dentro do grupo
            const registro = registrosPorData[data][index]; // Obtém o registro correto

            console.log("Registro para edição:", registro);

            const dialog = document.createElement("dialog");
            dialog.innerHTML = `
                <p>Editar horário do ponto:</p>
                <label>Data: <input type="date" id="data-input" value="${registro.data.split("T")[0]}"></label>
                <label>Hora: <input type="time" id="hora-input" value="${registro.hora}"></label>
                <button id="btn-confirmar-edicao">Confirmar</button>
                <button id="btn-cancelar-edicao">Cancelar</button>
            `;
            document.body.appendChild(dialog);
            dialog.showModal();

            document.getElementById("btn-confirmar-edicao").addEventListener("click", () => {
                const novaData = document.getElementById("data-input").value;
                const novaHora = document.getElementById("hora-input").value;

                if (novaData && novaHora) {
                    registro.data = novaData;
                    registro.hora = novaHora;

                    console.log("Registro atualizado:", registro);

                    // Salva o registro atualizado no localStorage
                    localStorage.setItem("register", JSON.stringify(registros));
                    
                    // Atualiza a exibição na página
                    window.location.reload();
                }
            });

            document.getElementById("btn-cancelar-edicao").addEventListener("click", () => {
                dialog.close();
                document.body.removeChild(dialog);
            });
        });
    });

    const btnExcluir = document.querySelectorAll(".btn-excluir");
    btnExcluir.forEach(btn => {
        btn.addEventListener("click", () => {
            alert("O ponto não pode ser excluído.");
        });
    });
});

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    if (!registers) {
        return [];
    }
    return JSON.parse(registers);
}
