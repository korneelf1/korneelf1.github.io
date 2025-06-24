document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const logo = document.querySelector('.logo');

    // Function to switch sections
    function switchSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show target section and activate corresponding nav link
        document.getElementById(targetId).classList.add('active');
        document.querySelector(`[href="#${targetId}"]`).classList.add('active');
    }

    // Add click event listener to logo
    logo.addEventListener('click', () => {
        switchSection('about');
        history.pushState(null, null, '#about');
    });

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
    if (hash) {
        switchSection(hash);
    } else {
        // Default to about section if no hash
        switchSection('about');
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchSection(hash);
        } else {
            switchSection('about');
        }
    });
}); 