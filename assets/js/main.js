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

document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const feedback = form.querySelector(".form-feedback");
        const submitButton = form.querySelector("button[type='submit']");
        const originalButtonText = submitButton ? submitButton.textContent : "";

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        if (feedback) {
            feedback.classList.remove("is-visible", "is-error");
        }

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            form.reset();

            if (feedback) {
                feedback.classList.add("is-visible");
            }

            if (
                form.id === "class-s-access-form" &&
                typeof playSofiaConcessionSeal === "function"
            ) {
                playSofiaConcessionSeal();
            }

        } catch (error) {
            console.error("Erro ao enviar formulário:", error);

            if (feedback) {
                feedback.textContent = "Your message could not be submitted. Please verify the required fields and try again.";
                feedback.classList.add("is-visible", "is-error");
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
});

function setupClassSAccessWindow() {
    const accessForm = document.getElementById("class-s-access-form");

    if (!accessForm) return;

    const openAt = new Date("2026-06-25T14:00:00-03:00");
    const closeAt = new Date("2026-10-18T07:20:00-03:00");
    const now = new Date();

    const setFormEnabled = (enabled) => {
        accessForm.classList.toggle("form-is-hidden", !enabled);
        accessForm.hidden = !enabled;
        accessForm.setAttribute("aria-hidden", String(!enabled));

        accessForm
            .querySelectorAll("input, select, textarea, button")
            .forEach((field) => {
                field.disabled = !enabled;
            });
    };

    const showAccessMessage = (html) => {
        const existingMessage = document.querySelector(".access-window-message");

        if (existingMessage) {
            existingMessage.remove();
        }

        const statusMessage = document.createElement("div");
        statusMessage.className = "access-window-message";
        statusMessage.setAttribute("role", "status");
        statusMessage.setAttribute("aria-live", "polite");
        statusMessage.innerHTML = html;

        accessForm.parentNode.insertBefore(statusMessage, accessForm);
    };

    if (now < openAt) {
        setFormEnabled(false);

        showAccessMessage(`
            <p>
                The Class S concession access window will open on 25 June 2026 at 14:00 Brasília time.
            </p>
            <p>
                No institutional concession enquiries are being received through the official website at this time.
            </p>
        `);

        return;
    }

    if (now >= closeAt) {
        setFormEnabled(false);

        showAccessMessage(`
            <p>
                The Class S concession access window is now closed.
            </p>
            <p>
                No new institutional concession enquiries are being received through the official website at this time.
            </p>
            <p>
                The House of Sofia remains under protected governance.
            </p>
            <a href="contact.html" class="hero-button">
                Institutional Contact
            </a>
        `);

        return;
    }

    setFormEnabled(true);

    const existingMessage = document.querySelector(".access-window-message");

    if (existingMessage) {
        existingMessage.remove();
    }
}

setupClassSAccessWindow();