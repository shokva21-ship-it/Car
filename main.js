
const search = document.querySelector(".search input");
const cards = document.querySelectorAll(".card");
const grid = document.querySelector(".grid");
const categories = document.querySelectorAll(".cats a");

let category = "all";

function filterCars() {
    const value = search.value.toLowerCase();
    let count = 0;

    document.querySelector(".empty")?.remove();

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const info = card.textContent.toLowerCase();

        let categoryMatch = true;

        if (category === "sedans") {
            categoryMatch = !["x5", "g-class", "cayenne", "range rover", "mustang", "charger", "porsche 911", "audi r8", "bmw m4"].some(item => name.includes(item));
        }

        if (category === "suvs") {
            categoryMatch = ["x5", "g-class", "cayenne", "range rover"].some(item => name.includes(item));
        }

        if (category === "sports cars") {
            categoryMatch = ["porsche 911", "audi r8", "bmw m4", "mustang", "charger"].some(item => name.includes(item));
        }

        if (category === "electric cars") {
            categoryMatch = name.includes("tesla");
        }

        if (category === "trucks") {
            categoryMatch = false;
        }

        const searchMatch = info.includes(value);
        const show = categoryMatch && searchMatch;

        card.style.display = show ? "block" : "none";

        if (show) count++;
    });

    if (count === 0) {
        const empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = "No cars found!";
        grid.appendChild(empty);
    }
}

search.addEventListener("input", filterCars);

categories.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        category = link.textContent.trim().toLowerCase();
        search.value = "";
        filterCars();

        document.querySelector("#cars").scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

const contactForm = document.querySelector(".contact form");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all required fields!");
        return;
    }

    alert("Thank you, " + name + "! Your message has been received.");
    contactForm.reset();
});

const newsletter = document.querySelector(".newsletter form");

newsletter.addEventListener("submit", event => {
    event.preventDefault();

    const email = newsletter.querySelector("input").value.trim();

    if (!email) {
        alert("Please enter your email!");
        return;
    }

    alert("Thank you for subscribing!");
    newsletter.reset();
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".card, .about-text, .about-img, .services div, .review, .contact-text").forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});

const stats = document.querySelectorAll(".stats h3");

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.textContent);
            const suffix = element.textContent.replace(/[0-9]/g, "");
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / 50);

                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                element.textContent = current + suffix;
            }, 30);

            statsObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.5
});

stats.forEach(stat => statsObserver.observe(stat));
