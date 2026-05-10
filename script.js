/* ========================================
   MOTHER'S DAY — INTERACTIVE SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    createFloatingHearts();
    createSparkles();
    createHeroPetals();
    createConfetti();
    initMusicToggle();
});

/* -----------------------------------------
   SCROLL REVEAL ANIMATIONS
   ----------------------------------------- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* -----------------------------------------
   FLOATING HEARTS
   ----------------------------------------- */
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['♥', '♡', '❤', '💕', '💖', '💗', '💝', '🩷'];
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            spawnHeart(container, hearts);
        }, i * 800);
    }

    // Continue spawning
    setInterval(() => {
        spawnHeart(container, hearts);
    }, 3000);
}

function spawnHeart(container, hearts) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const size = 12 + Math.random() * 20;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 5;

    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(heart);

    // Clean up after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + delay) * 1000);
}

/* -----------------------------------------
   SPARKLES
   ----------------------------------------- */
function createSparkles() {
    const container = document.getElementById('sparklesContainer');
    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 2 + Math.random() * 4;
        const delay = Math.random() * 6;
        const duration = 1.5 + Math.random() * 2;

        sparkle.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        container.appendChild(sparkle);
    }
}

/* -----------------------------------------
   HERO PETALS
   ----------------------------------------- */
function createHeroPetals() {
    const container = document.getElementById('heroPetals');
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 10;
        const size = 8 + Math.random() * 12;

        const hue = 340 + Math.random() * 30; // pink range
        const lightness = 70 + Math.random() * 20;

        petal.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: radial-gradient(ellipse, hsl(${hue}, 80%, ${lightness}%), rgba(240, 160, 184, 0.2));
        `;

        container.appendChild(petal);
    }
}

/* -----------------------------------------
   CONFETTI IN FINAL SECTION
   ----------------------------------------- */
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = [
        '#f0a0b8', '#d4a76a', '#e8d5e8',
        '#fce4ec', '#c9956b', '#d4577a',
        '#f5deb3', '#b76e79', '#fef9f4'
    ];
    const confettiCount = 40;

    for (let i = 0; i < confettiCount; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';

        const left = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const width = 4 + Math.random() * 8;
        const height = 8 + Math.random() * 12;

        piece.style.cssText = `
            left: ${left}%;
            width: ${width}px;
            height: ${height}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        container.appendChild(piece);
    }
}

/* -----------------------------------------
   MUSIC TOGGLE (Laung Laachi)
   ----------------------------------------- */
function initMusicToggle() {
    const btn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    // Optional: lower the volume slightly so it's pleasant background music
    bgMusic.volume = 0.4;

    btn.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                btn.classList.add('playing');
                isPlaying = true;
            }).catch(e => {
                console.error("Audio play failed:", e);
            });
        } else {
            bgMusic.pause();
            btn.classList.remove('playing');
            isPlaying = false;
        }
    });
}

/* -----------------------------------------
   PARALLAX-LIKE SMOOTH SCROLL EFFECT
   ----------------------------------------- */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Parallax hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const heroHeight = document.querySelector('.hero').offsetHeight;
                if (scrollY < heroHeight) {
                    heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrollY / heroHeight) * 1.2;
                }
            }

            ticking = false;
        });
        ticking = true;
    }
});
