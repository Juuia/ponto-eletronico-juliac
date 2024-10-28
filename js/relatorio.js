document.addEventListener("DOMContentLoaded", () => {
    const registrosContainer = document.getElementById("registros-container");
    let registros = getRegisterLocalStorage();
    let registrosPorData = {};

    function exibirRegistros(registrosParaExibir) {
        registrosContainer.innerHTML = ""; 
        registrosPorData = agruparRegistrosPorData(registrosParaExibir);
    
        Object.keys(registrosPorData).forEach(data => {
            const divData = document.createElement("div");
            divData.classList.add("data-registro");
    
            const dataFormatada = data.split("-").reverse().join("/"); 
            divData.innerHTML = `<h2>${dataFormatada}</h2>`;
    
            registrosPorData[data].forEach((registro, index) => {
                const divRegistro = document.createElement("div");
                divRegistro.classList.add("registro");
    
                if (registro.observacao) {
                    divRegistro.classList.add("com-observacao"); // Adiciona uma classe diferenciada
                }
    
                divRegistro.innerHTML = `
                    <p>${registro.hora} | Tipo: ${registro.tipo}</p>
                    ${registro.isRetroactive ? '<p><em>Registro marcado no passado</em></p>' : ""}
                    ${registro.isEdited ? '<p><em>Registro Editado</em></p>' : ""}
                    ${registro.observacao ? `<p><strong>Observação:</strong> ${registro.observacao}</p>` : ""}
                    ${registro.mensagem ? `<p><strong>Justificativa:</strong> ${registro.mensagem}</p>` : ""} <!-- Adicionando Justificativa -->
                    <button class="btn-editar" data-data="${data}" data-index="${index}">Editar</button>
                    <button class="btn-excluir" data-index="${index}">Excluir</button>
                `;
    
                divData.appendChild(divRegistro);
            });
    
            registrosContainer.appendChild(divData);
        });
    
        configurarEdicaoEExclusao();
    }
    
    function agruparRegistrosPorData(registrosParaAgrupar) {
        return registrosParaAgrupar.reduce((acc, registro) => {
            const data = registro.data.split("T")[0];
            if (!acc[data]) acc[data] = [];
            acc[data].push(registro);
            return acc;
        }, {});
    }

    function configurarEdicaoEExclusao() {
        document.querySelectorAll(".btn-editar").forEach(btn => {
            btn.addEventListener("click", editarRegistro);
        });

        document.querySelectorAll(".btn-excluir").forEach(btn => {
            btn.addEventListener("click", () => {
                alert("O ponto não pode ser excluído.");
            });
        });
    }

    function editarRegistro(e) {
        const data = e.target.dataset.data;
        const index = e.target.dataset.index;
        const registro = registrosPorData[data][index];
    
        const dialog = document.createElement("dialog");
        dialog.innerHTML = `
            <p class="editar-horario">Editar horário do ponto:</p>
            <label>Data: <input type="date" id="data-input" value="${registro.data.split("T")[0]}"></label>
            <label>Hora: <input type="time" id="hora-input" value="${registro.hora}"></label>
            <label>Observação: <input type="text" id="observacao-input" value="${registro.observacao || ''}"></label>
            <label>Mensagem: <input type="text" id="mensagem-input" value="${registro.mensagem || ''}"></label>
            <p>${registro.arquivo ? `Arquivo anexado: ${registro.arquivo}` : "Nenhum arquivo anexado."}</p>
            <button id="btn-confirmar-edicao">Confirmar</button>
            <button id="btn-cancelar-edicao">Cancelar</button>
        `;
        document.body.appendChild(dialog);
        dialog.showModal();
    
        document.getElementById("btn-confirmar-edicao").addEventListener("click", () => {
            const novaData = document.getElementById("data-input").value;
            const novaHora = document.getElementById("hora-input").value;
            const novaObservacao = document.getElementById("observacao-input").value;
            const novaMensagem = document.getElementById("mensagem-input").value; // Nova mensagem
    
            if (novaData && novaHora) {
                registro.data = novaData;
                registro.hora = novaHora;
                registro.observacao = novaObservacao; // Salva a observação
                registro.mensagem = novaMensagem; // Salva a nova mensagem
                registro.isEdited = true; // Marcação de registro editado
    
                localStorage.setItem("register", JSON.stringify(registros));
                window.location.reload();
            }
        });
    
        document.getElementById("btn-cancelar-edicao").addEventListener("click", () => {
            dialog.close();
            document.body.removeChild(dialog);
        });
    }
    
    function getRegisterLocalStorage() {
        let registers = localStorage.getItem("register");
        return registers ? JSON.parse(registers) : [];
    }

    function aplicarFiltroPorData(dataInicio, dataFim) {
        if (dataInicio && dataFim) {
            const registrosFiltrados = registros.filter(registro => {
                const dataRegistro = registro.data.split("T")[0];
                return dataRegistro >= dataInicio && dataRegistro <= dataFim;
            });
            exibirRegistros(registrosFiltrados);
        } else {
            exibirRegistros(registros);
        }
    }

    document.getElementById("btn-ultima-semana").addEventListener("click", () => {
        const hoje = new Date();
        const ultimaSemana = new Date(hoje);
        ultimaSemana.setDate(hoje.getDate() - 7);

        const registrosFiltrados = registros.filter(registro => {
            const dataRegistro = new Date(registro.data.split("T")[0]);
            return dataRegistro >= ultimaSemana && dataRegistro <= hoje;
        });
        exibirRegistros(registrosFiltrados);
    });

    document.getElementById("btn-ultimo-mes").addEventListener("click", () => {
        const hoje = new Date();
        const ultimoMes = new Date(hoje);
        ultimoMes.setMonth(hoje.getMonth() - 1);

        const registrosFiltrados = registros.filter(registro => {
            const dataRegistro = new Date(registro.data.split("T")[0]);
            return dataRegistro >= ultimoMes && dataRegistro <= hoje;
        });
        exibirRegistros(registrosFiltrados);
    });

    document.getElementById("btn-filtrar").addEventListener("click", () => {
        const dataInicio = document.getElementById('start-date').value;
        const dataFim = document.getElementById('end-date').value;
        aplicarFiltroPorData(dataInicio, dataFim);
    });

    document.getElementById("btn-voltar").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    exibirRegistros(registros);
});
