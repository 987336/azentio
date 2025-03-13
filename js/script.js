document.addEventListener("DOMContentLoaded", function () {
    // Preloader
    setTimeout(() => document.getElementById("preloader").style.display = "none", 2000);

    // Sticky navbar with hide on scroll down
    let lastScroll = 0;
    const navbar = document.querySelector(".navBar");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle("hide", currentScroll > lastScroll && currentScroll > 0);
        lastScroll = currentScroll;
    });

    // Mobile menu toggle with animation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open");
        navLinks.style.animation = navLinks.classList.contains("active")
            ? "slideDown 0.3s ease-in-out forwards"
            : "slideUp 0.3s ease-in-out forwards";
    });

    // Mobile dropdown menus with slide animation
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const arrow = item.querySelector('.arrow');
        const dropdown = item.querySelector('.dropdown-menu');
        const backButton = dropdown?.querySelector('.back-button');

        if (link && arrow && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    document.querySelectorAll('.dropdown-menu.active').forEach(activeDropdown => {
                        if (activeDropdown !== dropdown) {
                            activeDropdown.style.animation = 'slideOutLeft 0.3s ease-in-out forwards';
                            setTimeout(() => activeDropdown.classList.remove('active'), 300);
                        }
                    });
                    dropdown.classList.add('active');
                    dropdown.style.animation = 'slideInRight 0.3s ease-in-out forwards';
                    arrow.classList.add('active');
                }
            });

            // Back button functionality
            if (backButton) {
                backButton.addEventListener('click', () => {
                    dropdown.style.animation = 'slideOutLeft 0.3s ease-in-out forwards';
                    setTimeout(() => {
                        dropdown.classList.remove('active');
                        arrow.classList.remove('active');
                    }, 300);
                });
            }
        }
    });


    // Intersection observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".businness-potential-container, .business-card, .Industry-specific-solutions, .hidden-left, .hidden-right")
        .forEach(el => observer.observe(el));

    // Card slider
    const container = document.querySelector(".business-potential-cards");
    const cards = document.querySelectorAll(".business-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dotsContainer = document.querySelector(".slider-dots");
    let currentIndex = 0, touchStartX = 0, touchEndX = 0;

    cards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot", ...(index === 0 ? ["active"] : []));
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");
    const updateDots = () => dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));

    const goToSlide = index => {
        currentIndex = index;
        container.scrollTo({ left: cards[index].offsetLeft - container.offsetLeft, behavior: "smooth" });
        updateDots();
    };

    const nextSlide = () => goToSlide((currentIndex + 1) % cards.length);
    const prevSlide = () => goToSlide((currentIndex - 1 + cards.length) % cards.length);

    container.addEventListener("touchstart", e => touchStartX = e.touches[0].clientX);
    container.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].clientX;
        if (Math.abs(touchEndX - touchStartX) > 50) (touchEndX > touchStartX ? prevSlide() : nextSlide());
    });

    container.addEventListener("scroll", () => {
        currentIndex = Math.round(container.scrollLeft / cards[0].offsetWidth);
        updateDots();
    });

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    document.addEventListener("keydown", e => (e.key === "ArrowLeft" ? prevSlide() : e.key === "ArrowRight" ? nextSlide() : null));

    // Accordion
    document.querySelectorAll(".accordion-item").forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");
        const icon = header.querySelector(".icon");

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            document.querySelectorAll(".accordion-item.active").forEach(activeItem => {
                activeItem.classList.remove("active");
                activeItem.querySelector(".accordion-content").classList.remove("open");
                activeItem.querySelector(".icon").textContent = "▸";
            });
            if (!isActive) {
                item.classList.add("active");
                content.classList.add("open");
                icon.textContent = "▾";
            }
        });
    });

    if (window.innerWidth > 768) {
        const observer = new IntersectionObserver(
            (entries) => {
                let delay = 0; 
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !entry.target.classList.contains("show")) {
                        entry.target.style.transitionDelay = `${delay}ms`;
                        entry.target.classList.add("show");
                        delay += 200; 
                    }
                });
            },
            { threshold: 0.5 }
        );

        cards.forEach((card) => observer.observe(card));
    } else {
        cards.forEach((card) => card.classList.add("show"));
    }

});

// erp cards

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.cloudERP-container-cards');
    const cards = document.querySelectorAll('.erp-cards');
    const prevBtn = document.querySelector('.prev-btn-card');
    const nextBtn = document.querySelector('.next-btn-card');
    const dotsContainer = document.querySelector('.slider-dots-card');

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function initializeMobileFeatures() {
        if (window.innerWidth <= 768) {
            dotsContainer.innerHTML = '';
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });

            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchend', handleTouchEnd);
        }
    }

    initializeMobileFeatures();
    window.addEventListener('resize', initializeMobileFeatures);

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        if (window.innerWidth <= 768) {
            currentIndex = index;
            const offset = cards[index].offsetLeft - container.offsetLeft;
            container.scrollTo({
                left: offset,
                behavior: 'smooth'
            });
            updateDots();
        }
    }

    function nextSlide() {
        if (window.innerWidth <= 768) {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }
    }

    function prevSlide() {
        if (window.innerWidth <= 768) {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(currentIndex);
        }
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }

    container.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
            const scrollPosition = container.scrollLeft;
            const cardWidth = cards[0].offsetWidth;
            currentIndex = Math.round(scrollPosition / cardWidth);
            updateDots();
        }
    });

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (window.innerWidth <= 768) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });
});

// cloud erp 
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".erp-cards");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-visible");
            } else {
                entry.target.classList.remove("animate-visible");
            }
        });
    }, { threshold: 0.2 }); 

    cards.forEach(card => observer.observe(card));
});

// Testimoneal JS 

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const dotsContainer = document.querySelector(".dots");
    let currentIndex = 0;

    // Create navigation dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            dots[i].classList.remove("active");
        });
        testimonials[index].classList.add("active");
        dots[index].classList.add("active");
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
    const testimonialContainer = document.querySelector(".testimonial-container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                testimonialContainer.classList.add("show");
                testimonialContainer.classList.remove("hide");
            } else {
                testimonialContainer.classList.remove("show");
                testimonialContainer.classList.add("hide");
            }
        });
    }, { threshold: 0.5 }); 

    observer.observe(testimonialContainer);
});

// Pattern Container
document.addEventListener("DOMContentLoaded", function () {
    const patternContainer = document.querySelector(".pattern-container");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                patternContainer.classList.add("show");
            } else {
                patternContainer.classList.remove("show");
            }
        });
    }, { threshold: 0.2 }); 

    observer.observe(patternContainer);
});

// contct form js 
document.querySelectorAll('.contact-form__input-contact-form, .contact-form__select-contact-form, .contact-form__textarea-contact-form').forEach(element => {
    element.setAttribute('placeholder', ' ');

    element.addEventListener('focus', () => {
        element.parentElement.classList.add('focused');
    });

    element.addEventListener('blur', () => {
        element.parentElement.classList.remove('focused');
    });
});

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted');
});

// Pointer JS -------
const pointer = document.querySelector(".pointer");

document.addEventListener("mousemove", (event) => {
    pointer.style.left = `${event.clientX}px`;
    pointer.style.top = `${event.clientY}px`;
});

// Footer JS 
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector(".azentio-footer");

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add("footer-visible");
                observer.unobserve(entry.target); 
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection, {
        root: null, 
        threshold: 0.2 
    });

    observer.observe(footer);
});






