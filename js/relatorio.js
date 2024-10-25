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

// CAROL AQUIO
document.addEventListener("DOMContentLoaded", () => {
    const registrosContainer = document.getElementById("registros-container");
    const registros = getRegisterLocalStorage();
    let registrosPorData = {}; 

    function exibirRegistros(registrosParaExibir) {
        registrosContainer.innerHTML = ""; 


        registrosPorData = registrosParaExibir.reduce((acc, registro) => {
            const data = registro.data.split("T")[0]; 
            if (!acc[data]) {
                acc[data] = [];
            }
            acc[data].push(registro);
            return acc;
        }, {});

    
        Object.keys(registrosPorData).forEach(data => {
            const divData = document.createElement("div");
            divData.classList.add("data-registro");

            const dataFormatada = data.split("-").reverse().join("/"); 
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

       
        configurarEdicaoEExclusao();
    }

   
    function configurarEdicaoEExclusao() {
        const btnEditar = document.querySelectorAll(".btn-editar");
        btnEditar.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const data = e.target.dataset.data; 
                const index = e.target.dataset.index; 
                const registro = registrosPorData[data][index]; 

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

                        
                        localStorage.setItem("register", JSON.stringify(registros));

                        
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
    }

   
    exibirRegistros(registros);

    
    document.getElementById("btn-filtrar").addEventListener("click", () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        if (startDate && endDate) {
            const registrosFiltrados = registros.filter(registro => {
                const dataRegistro = registro.data.split("T")[0]; 
                return dataRegistro >= startDate && dataRegistro <= endDate; 
            });

            
            exibirRegistros(registrosFiltrados);
        } else {
           
            exibirRegistros(registros);
        }
    });

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

    const btnVoltar = document.getElementById("btn-voltar");
    btnVoltar.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    if (!registers) {
        return [];
    }
    return JSON.parse(registers);
}
