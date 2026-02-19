// ==============================================
// ARTORIA KIDS COLORING BOOK WEBSITE - JS
// ==============================================

// ============================================
// Scroll-Triggered Animations with IntersectionObserver
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Configuration for IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animations for cards
                if (entry.target.classList.contains('highlight-card')) {
                    entry.target.classList.add('card-animation');
                }

                // Trigger animations for benefit boxes
                if (entry.target.classList.contains('benefit-box')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.animation = `slide-fade-in 0.6s ease-out forwards`;
                    const delay = entry.target.style.getPropertyValue('--delay') || '0s';
                    entry.target.style.animationDelay = delay;
                }

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and benefits
    document.querySelectorAll('.highlight-card, .benefit-box, .book-product-card, .coloring-book-card').forEach(card => {
        observer.observe(card);
    });
});

// ============================================
// Letter-by-Letter Headline Animation (Enhanced)
// ============================================
function animateHeadline() {
    const headlines = document.querySelectorAll('.highlight-text');
    let totalDelay = 0;
    
    headlines.forEach((headline, lineIndex) => {
        const text = headline.textContent;
        headline.innerHTML = '';
        
        text.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `letter-reveal 0.08s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
            span.style.animationDelay = `${totalDelay}s`;
            headline.appendChild(span);
            totalDelay += 0.08;
        });
        
        // Add delay between lines
        totalDelay += 0.2;
}

// Add letter-reveal keyframe dynamically if not already in CSS
function ensureLetterRevealAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letter-reveal {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Smooth Scroll Behavior
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Interactive Button Effects (Enhanced)
// ============================================
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-gradient, .btn-white');

    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // Active state feedback
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98) translateY(2px)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.08) translateY(-2px)';
        });
    });
}

// Add ripple styles
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .btn-gradient, .btn-white {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Mobile Menu Auto-Close
// ============================================
function initMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Close menu when a link is clicked
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarToggler.offsetParent !== null) { // Check if visible
                navbarToggler.click();
            }
        });
    });
}

// ============================================
// Parallax Effect on Hero Section (Enhanced)
// ============================================
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    const mandalas = document.querySelectorAll('.mandala');
    const floatingElements = document.querySelectorAll('.floating-star, .floating-shape, .floating-heart');
    
    if (!heroSection) return;
    
    // Scroll parallax
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroBottom = heroSection.offsetHeight;
        
        if (scrollPosition < heroBottom) {
            mandalas.forEach((mandala, index) => {
                const speed = 0.5 + (index * 0.1);
                mandala.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
            
            floatingElements.forEach((el, index) => {
                const speed = 0.3 + (index * 0.05);
                el.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });
    
    // Mouse movement parallax (Desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
            const mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            floatingElements.forEach((el, index) => {
                const strength = 1 + (index * 0.3);
                el.style.transform = `translate(${mouseX * strength}px, ${mouseY * strength}px)`;
            });
        });
    }

// ============================================
// Product Card Hover Effects
// ============================================
function initCardHoverEffects() {
    const bookCards = document.querySelectorAll('.book-product-card');

    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add subtle glow
            this.style.boxShadow = '0 20px 50px rgba(224, 187, 228, 0.35)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 10px 30px rgba(224, 187, 228, 0.15)';
        });
    });

    // Highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');

    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 40px rgba(224, 187, 228, 0.25)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(224, 187, 228, 0.15)';
        });
    });
}

// ============================================
// Navbar Shadow on Scroll
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============================================
// Counter Animation for Benefits
// ============================================
function initBenefitAnimation() {
    const benefitSection = document.querySelector('.benefits-section');

    if (!benefitSection) return;

    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const boxes = entry.target.querySelectorAll('.benefit-box');
                boxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.animation = 'slide-fade-in 0.6s ease-out forwards';
                    }, index * 100);
                });
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    benefitObserver.observe(benefitSection);
}

// ============================================
// Form Input Focus Effects
// ============================================
function initInputEffects() {
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.boxShadow = '0 0 0 3px rgba(255, 182, 193, 0.2)';
        });

        input.addEventListener('blur', function () {
            this.style.boxShadow = 'none';
        });
    });
}

// ============================================
// Social Icon Hover Effect
// ============================================
function initSocialIcons() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// Hero Section Enhanced Animations
// ============================================
function initHeroAnimations() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Animate book cards with enhanced timing
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `book-entrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
        card.style.animationDelay = `${0.4 + (index * 0.2)}s`;
    });

    // Animate CTA container
    const ctaContainer = document.querySelector('.hero-cta-container');
    if (ctaContainer) {
        ctaContainer.style.opacity = '0';
        ctaContainer.style.animation = `fade-in 0.8s ease-out forwards`;
        ctaContainer.style.animationDelay = '0.7s';
    }

    // Add subtle rotation to floating emojis on load
    const floatingEmojis = document.querySelectorAll('.floating-star, .floating-shape, .floating-heart');
    floatingEmojis.forEach((emoji, index) => {
        emoji.style.willChange = 'transform';
        emoji.style.backfaceVisibility = 'hidden';
    });
}

// ============================================
// Available Books Section - Scroll Triggered Animation
// ============================================
function initBooksAnimation() {
    const booksSection = document.querySelector('.available-books-section');
    if (!booksSection) return;

    // Create observer for the books section
    const booksObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate coloring book cards
                const coloringCards = entry.target.querySelectorAll('.coloring-book-card');
                coloringCards.forEach(card => {
                    // Ensure animations are applied
                    card.style.willChange = 'transform, opacity';
                    card.style.backfaceVisibility = 'hidden';
                    
                    // Force reflow to ensure animation starts
                    void card.offsetWidth;
                });

                // Animate section header
                const sectionHeader = entry.target.querySelector('.section-header-books');
                if (sectionHeader) {
                    sectionHeader.style.animation = 'fade-in 0.6s ease 0.2s both';
                }

                // Animate sparkles
                const sparkles = entry.target.querySelectorAll('.sparkle-icon');
                sparkles.forEach((sparkle, index) => {
                    sparkle.style.animation = `sparkle-float 3s ease-in-out infinite`;
                    sparkle.style.animationDelay = `${index * 0.3}s`;
                });

                // Animate floating blobs
                const blobs = entry.target.querySelectorAll('.floating-blob');
                blobs.forEach((blob, index) => {
                    blob.style.animation = `float-blob 8s ease-in-out infinite`;
                    blob.style.animationDelay = `${index * 1}s`;
                });

                // Stop observing once animated
                booksObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    booksObserver.observe(booksSection);
}

// ============================================
// Performance: Reduce animation on low-end devices
// ============================================
function checkPerformance() {
    const memory = (navigator.deviceMemory || 4);

    if (memory <= 2) {
        // Reduce animation complexity for low-end devices
        document.body.classList.add('low-performance');

        const style = document.createElement('style');
        style.textContent = `
            .low-performance * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// Initialize All Functions on Page Load
// ============================================
window.addEventListener('load', function () {
    // Ensure animations are available
    ensureLetterRevealAnimation();
    addRippleStyles();

    // Initialize components
    setTimeout(() => animateHeadline(), 200);
    initSmoothScroll();
    initButtonEffects();
    initMobileMenu();
    initParallax();
    initCardHoverEffects();
    initNavbarScroll();
    initBenefitAnimation();
    initBooksAnimation();
    initInputEffects();
    initSocialIcons();
    initHeroAnimations();
    checkPerformance();

    // Add scroll reveal to additional elements
    const revealElements = document.querySelectorAll('.book-product-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.animation = 'scroll-fade-in 0.6s ease-out forwards';
    });
});

// ============================================
// Smooth refresh on visibility change
// ============================================
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// ============================================
// Debug Console Helper (remove in production)
// ============================================
console.log('%cArtoria Kids Book Website', 'font-size: 20px; font-weight: bold; color: #FFB6C1;');
console.log('%cWebsite loaded successfully! 🎨', 'font-size: 14px; color: #E0BBE4;');