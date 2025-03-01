document.addEventListener('DOMContentLoaded', function() {
    const section1 = document.querySelector('#section-1');
    const section2 = document.querySelector('#section-2');
    const footer = document.querySelector('footer');
    
    let isScrolling = false;  // Flag to track if a scroll action is in progress
    const smoothness = 0.5;   // Adjust this to control smoothness (0 to 1, higher is smoother)
    const speed = 100;        // Duration in ms (lower is faster, higher is slower)

    // Custom smooth scroll function with speed and smoothness control
    function smoothScrollTo(target) {
        const start = window.scrollY;
        const distance = target.offsetTop - start;
        let startTime = null;

        function scrollAnimation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / speed, 1); // Ensure progress doesn't go beyond 1

            // Ease-in-out function for smoothness
            const easing = progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

            window.scrollTo(0, start + distance * easing);

            if (timeElapsed < speed) {
                requestAnimationFrame(scrollAnimation);
            } else {
                window.scrollTo(0, target.offsetTop); // Ensure it ends exactly at the target
            }
        }

        requestAnimationFrame(scrollAnimation);
    }

    // Handle mouse wheel scrolling
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;  // Prevent multiple scroll actions

        isScrolling = true;

        // Check direction of scroll (down or up)
        if (e.deltaY > 0) {
            // Scroll Down (from Section 1 to Section 2, or Section 2 to Footer)
            if (window.scrollY < section2.offsetTop) {
                smoothScrollTo(section2);
            } else if (window.scrollY >= section2.offsetTop && window.scrollY < footer.offsetTop) {
                // Normal scroll from Section 2 to Footer
                isScrolling = false;
            }
        } else if (e.deltaY < 0) {
            // Scroll Up (from Footer to Section 2, or Section 2 to Section 1)
            if (window.scrollY >= footer.offsetTop) {
                smoothScrollTo(section2);
            } else if (window.scrollY >= section2.offsetTop && window.scrollY < footer.offsetTop) {
                smoothScrollTo(section1);
            }
        }
        
        // Prevent default scrolling behavior when handling the wheel
        e.preventDefault();

        // Allow next scroll action after a short delay
        setTimeout(() => isScrolling = false, 500);
    }, { passive: false });

    // Handle arrow key presses (Up and Down)
    window.addEventListener('keydown', function(e) {
        if (isScrolling) return;  // Prevent multiple key presses

        isScrolling = true;

        // Arrow Down
        if (e.key === 'ArrowDown') {
            if (window.scrollY < section2.offsetTop) {
                // Smooth scroll from Section 1 to Section 2
                smoothScrollTo(section2);
            } else if (window.scrollY >= section2.offsetTop && window.scrollY < footer.offsetTop) {
                // Normal scroll from Section 2 to Footer (default behavior)
                isScrolling = false;
            }
        }

        // Arrow Up
        else if (e.key === 'ArrowUp') {
            if (window.scrollY >= footer.offsetTop) {
                // Smooth scroll from Footer to Section 2
                smoothScrollTo(section2);
            } else if (window.scrollY >= section2.offsetTop && window.scrollY < footer.offsetTop) {
                // Smooth scroll from Section 2 to Section 1
                smoothScrollTo(section1);
            }
        }

        // Allow next scroll action after a short delay
        setTimeout(() => isScrolling = false, 500);
    });
});
