
// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
    initAccordion();
    initThemeToggle();
    initFontControls();
    initSpeechSynthesis();
    initFormSubmissions();
});

/**
 * 1. ACORDION INTERATIVO (Seções Expansíveis)
 */
function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const currentItem = header.parentElement;
            
            // Alterna a classe ativa no item clicado
            currentItem.classList.toggle("active");
            
            // Opcional: Fecha os outros itens ao abrir um novo (Estilo sanfona puro)
            document.querySelectorAll(".accordion-item").forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove("active");
                }
            });
        });
    });
}

/**
 * 2. ACESSIBILIDADE - ALTERNAR TEMA (CLARO/ESCURO)
 */
function initThemeToggle() {
    const btnToggle = document.getElementById("btn-toggle-theme");
    
    btnToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });
}

/**
 * 3. ACESSIBILIDADE - CONTROLE DE TAMANHO DA FONTE
 */
function initFontControls() {
    const btnIncrease = document.getElementById("btn-increase-font");
    const btnDecrease = document.getElementById("btn-decrease-font");
    
    let currentScale = 100; // Porcentagem base

    btnIncrease.addEventListener("click", () => {
        if (currentScale < 130) { // Limite máximo seguro
            currentScale += 10;
            document.documentElement.style.fontSize = `${currentScale}%`;
        }
    });

    btnDecrease.addEventListener("click", () => {
        if (currentScale > 85) { // Limite mínimo seguro
            currentScale -= 10;
            document.documentElement.style.fontSize = `${currentScale}%`;
        }
    });
}

/**
 * 4. ACESSIBILIDADE - LEITURA POR VOZ (SpeechSynthesis API)
 * Lê exclusivamente o conteúdo de texto da seção principal
 */
function initSpeechSynthesis() {
    const btnSpeak = document.getElementById("btn-speak");
    const btnStop = document.getElementById("btn-stop-speak");
    let speechUtterance = null;

    btnSpeak.addEventListener("click", () => {
        // Evita sobreposição de vozes parando leituras em andamento
        window.speechSynthesis.cancel();

        // Alvo específico: pega apenas o texto do container de conteúdo (ignora menus/botões)
        const contentContainer = document.getElementById("conteudo-principal");
        if (!contentContainer) return;

        const textToRead = contentContainer.innerText;

        speechUtterance = new SpeechSynthesisUtterance(textToRead);
        speechUtterance.lang = "pt-BR";
        speechUtterance.rate = 1.1; // Velocidade levemente ajustada

        window.speechSynthesis.speak(speechUtterance);
    });

    btnStop.addEventListener("click", () => {
        window.speechSynthesis.cancel();
    });
}

/**
 * 5. GERENCIAMENTO DE FORMULÁRIOS (Seminário e Comentários)
 */
function initFormSubmissions() {
    // Cadastro do Seminário
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        alert(`Inscrição realizada com sucesso! Parabéns ${name}, te vemos no seminário virtual em 2026!`);
        
        registerForm.reset();
    });

    // Envio de Comentários Dinâmicos
    const commentForm = document.getElementById("comment-form");
    const commentsList = document.getElementById("comments-list");

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const textarea = document.getElementById("comment-text");
        const commentText = textarea.value.trim();
        
        if (commentText) {
            // Cria elemento do card de comentário de maneira limpa
            const commentCard = document.createElement("div");
            commentCard.classList.add("comment-card");
            commentCard.innerHTML = `<p>${commentText}</p>`;
            
            // Adiciona no topo da lista
            commentsList.prepend(commentCard);
            
            textarea.value = "";
        }
    });
}