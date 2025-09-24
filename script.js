// Replace your existing typing animation code with this improved version
document.addEventListener("DOMContentLoaded", () => {
    // ---------------------- Typing Animation ----------------------
    const phrases = [
        "Full-Stack Web Developer",
        "UI/UX Designer",
        "Creative Coder",
        "Digital Creator",
        "Problem Solver"
    ];
    const typingElement = document.getElementById("typing-text");
    const cursorElement = document.querySelector(".cursor");

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        typingElement.textContent = currentPhrase.substring(0, charIndex);

        if (!isDeleting && charIndex < currentPhrase.length) {
            charIndex++;
            setTimeout(typeEffect, 120);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 60);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1800);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        }
    }

    typeEffect();

    if (cursorElement) cursorElement.style.display = "inline-block";


    // ... rest of your existing code ...


    // ---------------------- Set Current Year ----------------------
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // ---------------------- Back To Top ----------------------
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        let scrollTimeout;
        const toggleBack = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                backToTop.classList.toggle('show', window.pageYOffset > 300);
            }, 100);
        };
        window.addEventListener('scroll', toggleBack);
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ---------------------- Smooth Scroll for Anchor Links & Tabs ----------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', e => {
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ---------------------- Intersection Observer for Fade-in ----------------------
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.visibility = 'hidden';
        fadeObserver.observe(el);
    });

    // ---------------------- Skill Progress Animation ----------------------
    const skills = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.skill-progress');
                const percentEl = entry.target.querySelector('.skill-percent');
                if (bar && percentEl) {
                    const value = bar.getAttribute('data-percent') || percentEl.getAttribute('data-percent');
                    bar.style.width = value + '%';
                    percentEl.textContent = value + '%';
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => skillObserver.observe(skill));

    // ---------------------- Theme Toggle ----------------------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    const body = document.body;

    const setTheme = theme => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon?.classList.replace('bi-moon-fill', 'bi-sun-fill');
        } else {
            body.classList.remove('dark-mode');
            themeIcon?.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    themeToggle?.addEventListener('click', () => {
        setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
    });

    // ---------------------- Tooltip Initialization ----------------------
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (typeof bootstrap !== 'undefined') {
        tooltipElements.forEach(el => new bootstrap.Tooltip(el));
    }

    // ---------------------- EmailJS Form ----------------------
    const contactForm = document.getElementById("contactForm");
    if (contactForm && typeof emailjs !== 'undefined') {
        emailjs.init("vRDRj0SlZD5LhAW4d"); // Your public key
        const formToastEl = document.getElementById("formToast");
        const formToast = formToastEl ? new bootstrap.Toast(formToastEl) : null;

        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
                time: new Date().toLocaleString(),
            };

            emailjs.send("service_fvfir5p", "template_62k84er", formData)
                .then(() => {
                    formToast?.show();
                    contactForm.reset();
                })
                .catch(error => {
                    console.error("Email sending failed:", error);
                    alert("❌ Failed to send: " + (error.text || error));
                });
        });
    }

});
