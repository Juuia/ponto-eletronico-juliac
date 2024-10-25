document.addEventListener("DOMContentLoaded", () => {
    const registrosContainer = document.getElementById("registros-container");
    const registros = getRegisterLocalStorage();

    registros.forEach((registro, index) => {
        console.log("Registro carregado:", registro); // Log para verificar o registro

        const divRegistro = document.createElement("div");
        divRegistro.classList.add("registro");

        const dataRegistro = new Date(registro.data);
        const dataFormatada = dataRegistro.toLocaleDateString('pt-BR'); // Formata a data no formato local

        divRegistro.innerHTML = `
            <p>${dataFormatada} - ${registro.hora} | Tipo: ${registro.tipo}</p>
            <button class="btn-editar" data-index="${index}">Editar</button>
            <button class="btn-excluir" data-index="${index}">Excluir</button>
        `;

        registrosContainer.appendChild(divRegistro);
    });

    const btnVoltar = document.getElementById("btn-voltar");
    btnVoltar.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    const btnEditar = document.querySelectorAll(".btn-editar");
    btnEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            const registro = registros[index];
            console.log("Registro para edição:", registro); // Log para verificar o registro sendo editado

            const inputData = document.createElement("input");
            inputData.type = "date";
            inputData.value = new Date(registro.data).toISOString().split("T")[0];

            const dialog = document.createElement("dialog");
            dialog.innerHTML = `
                <p>Editar horário do ponto:</p>
                <p>Data: ${inputData.outerHTML}</p>
                <input type="time" id="hora-input" value="${registro.hora}">
                <button id="btn-confirmar-edicao">Confirmar</button>
                <button id="btn-cancelar-edicao">Cancelar</button>
            `;
            document.body.appendChild(dialog);
            dialog.showModal();

            document.getElementById("btn-confirmar-edicao").addEventListener("click", () => {
                const novaData = inputData.value;
                const novaHora = document.getElementById("hora-input").value;
                if (novaData && novaHora) {
                    registro.data = `${novaData}T${novaHora}`; // Atualiza a data e hora corretamente
                    console.log("Registro atualizado:", registro); // Log para verificar o registro após a atualização
                    registro.hora = novaHora;
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
});

function getRegisterLocalStorage() {
    let registers = localStorage.getItem("register");
    if (!registers) {
        return [];
    }
    return JSON.parse(registers);
}
