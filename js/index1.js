document.addEventListener('DOMContentLoaded', function() {
    const section1 = document.querySelector('#section-1');
    const section2 = document.querySelector('#section-2');
    const footer = document.querySelector('footer');
    
    let isScrolling = false;  // Flag to track if a scroll action is in progress
    let isSmoothScrolling = true;  // Flag for enabling/disabling smooth scrolling

    // Smooth scroll on wheel or arrow keys
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;  // Prevent multiple scroll actions

        if (isSmoothScrolling) {
            isScrolling = true;

            if (window.scrollY < section2.offsetTop && e.deltaY > 0) {
                // Scroll from Section 1 to Section 2
                section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => isScrolling = false, 500);
                e.preventDefault();  // Prevent default scroll behavior
            } else if (window.scrollY >= section2.offsetTop && window.scrollY < footer.offsetTop && e.deltaY > 0) {
                // Allow normal scroll from Section 2 to footer (no smooth scroll)
                setTimeout(() => isScrolling = false, 500);
            } else if (window.scrollY >= footer.offsetTop && e.deltaY < 0) {
                // Scroll from footer to Section 2 (smooth scroll)
                section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => isScrolling = false, 500);
                e.preventDefault();  // Prevent default scroll behavior
            } else if (window.scrollY >= section2.offsetTop && e.deltaY < 0 && window.scrollY < footer.offsetTop) {
                // Scroll from Section 2 to Section 1 (smooth scroll)
                section1.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => isScrolling = false, 500);
                e.preventDefault();  // Prevent default scroll behavior
            }
        } else {
            setTimeout(() => isScrolling = false, 500);  // Allow normal scroll if not in target sections
        }
    }, { passive: false });

    // Arrow keys handling (Up and Down)
    window.addEventListener('keydown', function(e) {
        if (isScrolling) return;  // Prevent multiple key presses
        isScrolling = true;

        if (e.key === 'ArrowDown' && window.scrollY < section2.offsetTop) {
            // Scroll from Section 1 to Section 2
            section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => isScrolling = false, 500);
            e.preventDefault();  // Prevent default scroll behavior
        } else if (e.key === 'ArrowDown' && window.scrollY >= section2.offsetTop && window.scrollY < footer.offsetTop) {
            // Normal scroll from Section 2 to footer
            setTimeout(() => isScrolling = false, 500); // Allow normal scroll
        } else if (e.key === 'ArrowDown' && window.scrollY >= footer.offsetTop) {
            // Scroll from Footer to Section 2
            section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => isScrolling = false, 500);
            e.preventDefault();  // Prevent default scroll behavior
        } else if (e.key === 'ArrowUp' && window.scrollY >= section2.offsetTop) {
            // Scroll from Section 2 back to Section 1
            section1.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => isScrolling = false, 500);
            e.preventDefault();  // Prevent default scroll behavior
        } else if (e.key === 'ArrowUp' && window.scrollY >= footer.offsetTop) {
            // Scroll from Footer back to Section 2 with smooth scroll
            section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => isScrolling = false, 500);
            e.preventDefault();  // Prevent default scroll behavior
        } else {
            setTimeout(() => isScrolling = false, 500); // Allow normal scroll if you're not in the target sections
        }
    });
});
