document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (!menuToggle || !mainNav) {
        console.error("Menu mobile: elementos não encontrados.");
        return;
    }

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("is-open");
        console.log("Menu clicado");
    });
});