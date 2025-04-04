document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("project-modal");
    const addProjectBtn = document.getElementById("add-project-btn");
    const closeModal = document.querySelector(".close");
    const projectForm = document.getElementById("project-form");
    const projectContainer = document.getElementById("project-container");

    // Abrir modal
    addProjectBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Fechar modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Enviar dados para o backend
    projectForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("titulo", document.getElementById("titulo").value);
        formData.append("descricao", document.getElementById("descricao").value);
        formData.append("imagem", document.getElementById("imagem").files[0]);

        const response = await fetch("/add", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            modal.style.display = "none";
            carregarProjetos();
        }
    });

    // Função para carregar projetos na página
    async function carregarProjetos() {
        const response = await fetch("/api/projetos");
        const projetos = await response.json();

        projectContainer.innerHTML = "";
        projetos.forEach(projeto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${projeto.imagem || 'placeholder.jpg'}" alt="${projeto.titulo}" style="width:100%; border-radius:10px;">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
            `;
            projectContainer.appendChild(card);
        });
    }

    carregarProjetos();
});

document.getElementById("imagem").addEventListener("change", function(event) {
            let reader = new FileReader();
            reader.onload = function() {
                let img = document.getElementById("preview");
                img.src = reader.result;
                img.style.display = "block";
            }
            reader.readAsDataURL(event.target.files[0]);
        });