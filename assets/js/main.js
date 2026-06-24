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

document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form.contact-form");

    forms.forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');
            const feedback = form.querySelector(".form-feedback");

            if (!submitButton || !feedback) return;

            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
            feedback.classList.remove("is-visible");
            feedback.textContent = "";

            try {
                await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    mode: "no-cors"
                });

                form.reset();
                feedback.textContent = "Your inquiry has been received for institutional review.";
                feedback.classList.add("is-visible");

                if (typeof playSofiaConcessionSeal === "function") {
                    playSofiaConcessionSeal();
                }

            } catch (error) {
                console.error(error);

                feedback.textContent = error.message;

                feedback.classList.add("is-visible");
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    });
});