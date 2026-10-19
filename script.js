/**
 * Bhavna Sahu - Portfolio Interactive Script
 * Modern vanilla JavaScript handling accessibility, theme switching, 
 * scroll progress, animated counters, project filtering, and form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME TOGGLING (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootEl = document.documentElement;

    // Detect saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    const setTheme = (theme) => {
        rootEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }
    };

    setTheme(initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            showToast(`Switched to ${newTheme} theme`);
        });
    }

    // Listen to OS theme changes if user has not explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    /* ==========================================================================
       2. SCROLL PROGRESS INDICATOR (FALLBACK FOR BROWSERS WITHOUT ANIMATION-TIMELINE)
       ========================================================================== */
    if (!CSS.supports('animation-timeline', 'scroll()')) {
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
                const ratio = scrollable > 0 ? (scrolled / scrollable) : 0;
                progressBar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
            }, { passive: true });
        }
    }

    /* ==========================================================================
       3. MOBILE NAVIGATION TOGGLE & ACCESSIBILITY
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    if (navToggle && navMenu) {
        const toggleMenu = (open) => {
            const isOpen = open !== undefined ? open : !navMenu.classList.contains('show-menu');
            navMenu.classList.toggle('show-menu', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        };

        navToggle.addEventListener('click', () => toggleMenu());

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('show-menu') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
                toggleMenu(false);
                navToggle.focus();
            }
        });
    }

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header?.classList.add('header-scrolled');
        } else {
            header?.classList.remove('header-scrolled');
        }
    }, { passive: true });

    /* ==========================================================================
       4. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHTING)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

            if (targetLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive, { passive: true });

    /* ==========================================================================
       5. TYPEWRITER EFFECT
       ========================================================================== */
    const words = [
        "Frontend Developer.",
        "B.Tech Student @ SSIPMT.",
        "Smart IoT Explorer.",
        "DSA Streak Achiever."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingEl = document.getElementById("typing-text");

    function type() {
        if (!typingEl) return;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 45 : 95;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2200; // Pause at complete word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 450;
        }

        setTimeout(type, speed);
    }
    type();

    /* ==========================================================================
       6. ANIMATED STAT COUNTERS & SKILL BARS (INTERSECTION OBSERVER)
       ========================================================================== */
    const counterElements = document.querySelectorAll('.info-num');
    const skillBars = document.querySelectorAll('.skill-fill');

    // Stat Counter Animation
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600; // ms
        const startTime = performance.now();

        const updateNumber = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * target);
            el.textContent = currentVal + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                el.textContent = target + suffix;
            }
        };

        requestAnimationFrame(updateNumber);
    };

    if ('IntersectionObserver' in window) {
        // Counter Observer
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));

        // Skill Bars Observer
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || '0%';
                    bar.style.width = width;
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => skillsObserver.observe(bar));
    } else {
        // Fallback for older browsers
        counterElements.forEach(el => {
            el.textContent = (el.getAttribute('data-target') || '0') + (el.getAttribute('data-suffix') || '');
        });
        skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') || '100%';
        });
    }

    /* ==========================================================================
       7. PROJECTS CATEGORY FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('filter-hide');
                } else {
                    card.classList.add('filter-hide');
                }
            });
        });
    });

    /* ==========================================================================
       8. COPY EMAIL TO CLIPBOARD WITH TOAST
       ========================================================================== */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        toast.setAttribute('aria-hidden', 'false');

        setTimeout(() => {
            toast.classList.remove('show');
            toast.setAttribute('aria-hidden', 'true');
        }, 3200);
    }

    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = emailText.textContent.trim();
            try {
                await navigator.clipboard.writeText(email);
                showToast("Email address copied to clipboard!");
            } catch (err) {
                showToast("Failed to copy. Email: " + email);
            }
        });
    }

    /* ==========================================================================
       9. FORM VALIDATION & INTERACTIVE SUBMISSION
       ========================================================================== */
    // Sync aria-invalid with CSS :user-invalid state for accessibility
    const syncAria = (el) => {
        if (!el || typeof el.matches !== 'function') return;
        if (el.matches(':user-invalid')) {
            el.setAttribute('aria-invalid', 'true');
        } else if (el.matches(':user-valid')) {
            el.setAttribute('aria-invalid', 'false');
        }
    };

    document.addEventListener('blur', (e) => syncAria(e.target), true);
    document.addEventListener('input', (e) => {
        if (e.target && e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) {
            syncAria(e.target);
        }
    });

    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm && feedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                feedback.textContent = "Please fill out all required fields correctly.";
                feedback.className = "form-feedback error";
                const firstInvalid = contactForm.querySelector(':invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Simulate sending with loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>`;
            }

            setTimeout(() => {
                feedback.textContent = "✨ Thank you, Bhavna will get back to you shortly!";
                feedback.className = "form-feedback success";
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>`;
                }

                showToast("Message sent successfully!");

                setTimeout(() => {
                    feedback.style.display = "none";
                    feedback.textContent = "";
                }, 6000);
            }, 900);
        });
    }

    /* ==========================================================================
       10. BACK TO TOP BUTTON
       ========================================================================== */
    const scrollUp = document.getElementById('scroll-up');

    function toggleBackToTop() {
        if (!scrollUp) return;
        if (window.scrollY >= 400) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }
    }
    window.addEventListener('scroll', toggleBackToTop, { passive: true });

});