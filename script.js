document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Navigation Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change hamburger icon to an 'X' when open
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // --- 2. Image Lightbox (Zoom) for Portfolio AND Pricing ---
    // Select images in both the portfolio items and the shop items
    const zoomableImages = document.querySelectorAll('.portfolio-item img, .product-img-wrapper img');

    if (zoomableImages.length > 0) {
        // Create the overlay elements dynamically
        const overlay = document.createElement('div');
        overlay.classList.add('lightbox-overlay');
        
        const lightboxImg = document.createElement('img');
        lightboxImg.classList.add('lightbox-img');
        
        overlay.appendChild(lightboxImg);
        document.body.appendChild(overlay);

        // Open Lightbox when an image is clicked
        zoomableImages.forEach(img => {
            img.addEventListener('click', (e) => {
                lightboxImg.src = e.target.src; // Get the clicked image source
                overlay.classList.add('active'); // Show overlay
                document.body.style.overflow = 'hidden'; // Stop background from scrolling
            });
        });

        // Close Lightbox when clicking anywhere on the overlay
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active'); // Hide overlay
            document.body.style.overflow = 'auto'; // Restore background scrolling
            
            // Wait for fade-out animation to finish before clearing source
            setTimeout(() => {
                lightboxImg.src = ''; 
            }, 300);
        });
    }

    // --- 3. Shop Category Filtering (Pricing Page) ---
    const filterBtns = document.querySelectorAll('.category-filter li');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Get category to filter
                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.classList.remove('hidden'); // Show card
                    } else {
                        card.classList.add('hidden'); // Hide card
                    }
                });
            });
        });
    }
});