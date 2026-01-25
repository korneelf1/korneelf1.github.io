document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const logo = document.querySelector('.logo');

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Function to observe fade-in elements in a section
    function observeFadeElements(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const fadeElements = section.querySelectorAll('.fade-in');
            fadeElements.forEach(el => {
                el.classList.remove('visible');
                fadeInObserver.observe(el);
            });
        }
    }

    // Function to switch sections with smooth transition
    function switchSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Trigger fade-in animations after a small delay
            setTimeout(() => {
                observeFadeElements(targetId);
            }, 50);
        }

        // Activate corresponding nav link
        const activeLink = document.querySelector(`[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add click event listener to logo
    logo.addEventListener('click', () => {
        switchSection('about');
        history.pushState(null, null, '#about');
    });

    // Add cursor pointer to logo
    logo.style.cursor = 'pointer';

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            switchSection(targetId);

            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // Handle initial page load with hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        switchSection(hash);
    } else {
        // Default to about section if no hash
        switchSection('about');
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchSection(hash);
        } else {
            switchSection('about');
        }
    });

    // Add subtle parallax effect to hero section on mouse move
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = hero;

            const moveX = (clientX - offsetWidth / 2) / 50;
            const moveY = (clientY - offsetHeight / 2) / 50;

            const heroImage = hero.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        hero.addEventListener('mouseleave', () => {
            const heroImage = hero.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = 'translate(0, 0)';
                heroImage.style.transition = 'transform 0.3s ease-out';
            }
        });
    }

    // Add smooth hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
});
