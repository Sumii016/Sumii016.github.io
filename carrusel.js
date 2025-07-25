document.addEventListener("DOMContentLoaded", () => {
    const lensObject = document.querySelector(".carusel");
    const trackObject = document.querySelector(".carusel-track");
    const slideObjects = [...document.querySelectorAll(".carusel-slide")];
    const maxSlide = slideObjects.length;
    let currentSlide = 0;
    let transitionDirection = 1; // 1: forward, -1: backward
    const waitTime = 5000;
    let iterationId = null;
    let dotElements = [];

    const caruselInit = () => {
        createNavigation();
        moveTo(currentSlide);
        tick();
    };

    const tick = () => {
        iterationId = setTimeout(() => {
            let nextSlide = currentSlide + transitionDirection;
            moveTo(nextSlide);
        }, waitTime);
    };

    const moveTo = (slideIndex) => {
        let nextSlide = slideIndex;

        // Reset timer
        if (iterationId) clearTimeout(iterationId);

        // Control de rebote
        if (nextSlide >= maxSlide) {
            nextSlide = maxSlide - 2;
            transitionDirection = -1;
        }
        if (nextSlide < 0) {
            nextSlide = 1;
            transitionDirection = 1;
        }

        currentSlide = nextSlide;
        trackObject.style.transform = `translateX(-${currentSlide * 100}vw)`;

        // Actualiza los dots activos
        updateActiveDot();

        tick();
    };

    const createNavigation = () => {
        const btnPrevious = document.createElement("DIV");
        const btnNext = document.createElement("DIV");
        const dotSection = document.createElement("SECTION");

        btnPrevious.innerHTML = "&lt;";
        btnPrevious.classList.add("carusel-btn-pre");

        btnNext.innerHTML = "&gt;";
        btnNext.classList.add("carusel-btn-nxt");

        btnPrevious.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            moveTo(currentSlide - 1);
        });

        btnNext.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            moveTo(currentSlide + 1);
        });

        dotSection.classList.add("carusel-dots");

        slideObjects.forEach((_, index) => {
            const dot = document.createElement("DIV");
            dot.classList.add("carusel-dot");
            dot.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                moveTo(index);
            });
            dotSection.appendChild(dot);
            dotElements.push(dot);
        });

        lensObject.appendChild(btnPrevious);
        lensObject.appendChild(btnNext);
        lensObject.appendChild(dotSection);
    };

    const updateActiveDot = () => {
        dotElements.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    };

    caruselInit();
});