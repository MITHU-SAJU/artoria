
        // Create floating elements
        function createFloatingElements() {
            const container = document.getElementById('floatingContainer');
            const emojis = ['🌸', '⭐', '🦋', '🖍️', '🌈', '🍄'];

            for (let i = 0; i < 14; i++) {
                const el = document.createElement('div');
                el.className = 'floaty';
                el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                el.style.left = Math.random() * 100 + 'vw';
                el.style.animationDuration = (18 + Math.random() * 22) + 's';
                el.style.animationDelay = '-' + Math.random() * 30 + 's';
                el.style.opacity = 0.12 + Math.random() * 0.12;
                container.appendChild(el);
            }

            // Sparkles
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + 'vw';
                sparkle.style.top = Math.random() * 100 + 'vh';
                sparkle.style.animationDelay = '-' + Math.random() * 3 + 's';
                container.appendChild(sparkle);
            }
        }

        // SVG Draw Animation
        function animateSVG(svgId) {
            const svg = document.getElementById(svgId);
            if (!svg) return;

            const elements = svg.querySelectorAll('.draw-element');
            let delay = 0;

            elements.forEach((el, index) => {
                const length = el.getTotalLength ? el.getTotalLength() : 400;
                el.style.strokeDasharray = length;
                el.style.strokeDashoffset = length;

                setTimeout(() => {
                    el.style.transition = `stroke-dashoffset ${1.4 + index * 0.1}s ease-out`;
                    el.style.strokeDashoffset = '0';
                }, delay);

                delay += 110;
            });

            // Animate petal fills
            const fills = svg.querySelectorAll('.petal-fill');
            let fillDelay = delay + 400;

            fills.forEach((fill, i) => {
                setTimeout(() => {
                    fill.style.transition = 'opacity 1.1s ease-in';
                    fill.style.opacity = '1';
                }, fillDelay + i * 180);
            });
        }

        // Crayon movement
        function moveCrayon(crayonId) {
            const crayon = document.getElementById(crayonId);
            if (!crayon) return;

            const positions = [{
                    left: 35,
                    top: 210
                },
                {
                    left: 85,
                    top: 95
                },
                {
                    left: 155,
                    top: 55
                },
                {
                    left: 215,
                    top: 95
                },
                {
                    left: 235,
                    top: 185
                },
                {
                    left: 175,
                    top: 235
                },
                {
                    left: 95,
                    top: 210
                }
            ];

            let i = 0;
            const interval = setInterval(() => {
                if (i >= positions.length) {
                    clearInterval(interval);
                    // Reset to start for loop effect
                    setTimeout(() => {
                        crayon.style.transition = 'none';
                        crayon.style.left = '40px';
                        crayon.style.top = '80px';
                        setTimeout(() => {
                            crayon.style.transition =
                                'all 900ms cubic-bezier(0.68, -0.55, 0.27, 1.55)';
                            moveCrayon(crayonId);
                        }, 50);
                    }, 1200);
                    return;
                }

                crayon.style.left = positions[i].left + 'px';
                crayon.style.top = positions[i].top + 'px';
                i++;
            }, 720);
        }

        // Buy modal
        function buyNow(vol) {
            const modal = new bootstrap.Modal(document.getElementById('buyModal'));
            modal.show();
        }

        // Scroll animations for product cards
        function initScrollAnimations() {
            const cards = document.querySelectorAll('.product-card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: "0px 0px -80px 0px"
            });

            cards.forEach((card, index) => {
                if (index === 0) card.classList.add('slide-left');
                else card.classList.add('slide-right');
                observer.observe(card);
            });
        }

        // Main initialization
        window.onload = function () {
            createFloatingElements();

            // Trigger animations with slight delay so they look natural
            setTimeout(() => {
                animateSVG('mandala1');
                animateSVG('mandala2');
            }, 800);

            setTimeout(() => {
                moveCrayon('crayon1');
                moveCrayon('crayon2');
            }, 1600);

            initScrollAnimations();

            // Initialize mobile nav slider behavior
            if (typeof initMobileNavSlider === 'function') initMobileNavSlider();

            // Smooth scroll for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // Keyboard shortcut fun (Easter egg)
            let konami = '';
            document.addEventListener('keydown', (e) => {
                konami += e.key;
                if (konami.length > 10) konami = konami.slice(-10);
                if (konami.includes('mandala')) {
                    document.body.style.transition = 'filter 1s';
                    document.body.style.filter = 'hue-rotate(180deg) saturate(1.6)';
                    setTimeout(() => {
                        document.body.style.filter = 'none';
                    }, 2200);
                    konami = '';
                }
            });
        };


// Initialize mobile nav slider: set nav height CSS var, handle clicks to hide slider and smooth-scroll with offset
function initMobileNavSlider() {
    const navbar = document.querySelector('.navbar');
    const slider = document.getElementById('mobileNavSlider');
    if (!slider) return;

    function updateNavHeight() {
        const height = navbar ? navbar.offsetHeight : 56;
        document.documentElement.style.setProperty('--nav-height', height + 'px');
        slider.style.top = height + 'px';
    }

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    // Hide slider when a link is clicked and perform offset scrolling
    const links = slider.querySelectorAll('.mobile-link');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            // hide slider
            slider.classList.add('hidden');

            // collapse navbar if open
            const collapseEl = document.getElementById('navbarNav');
            if (collapseEl && collapseEl.classList.contains('show')) {
                const bs = bootstrap.Collapse.getInstance(collapseEl);
                if (bs) bs.hide();
            }

            if (target) {
                const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 56;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset - 12;
                window.scrollTo({ top: top, behavior: 'smooth' });
            } else {
                window.location.href = href;
            }
        });
    });

    // Show slider again when user scrolls to very top
    let lastY = window.pageYOffset;
    window.addEventListener('scroll', () => {
        const y = window.pageYOffset;
        if (y < 60) slider.classList.remove('hidden');
        lastY = y;
    });
}
