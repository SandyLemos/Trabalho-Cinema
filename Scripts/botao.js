/* Usamos Esse script para definir o compotamento dos botões
O que inclui animações e etc. */

// Seleciona todos os botões com a classe .button
const buttons = document.querySelectorAll(".button");

// Adiciona um evento de clique para cada botão
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        button.classList.add("animate");

        // Remove a classe animate após 600ms para reiniciar a animação
        setTimeout(() => {
            button.classList.remove("animate");
        }, 600);
    });
});
