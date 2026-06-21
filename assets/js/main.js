document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");

    if (!menuToggle || !mainNav) {
        console.error("Menu mobile: elementos não encontrados.");
        return;
    }

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("is-open");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("is-open");
        });
    });
});