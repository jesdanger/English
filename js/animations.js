/**
 * Animations Module
 * Handles scroll animations, counters, and reveal effects
 */

class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupScrollObserver();
        this.setupCounters();
        this.setupParallax();
    }
    
    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('active');
                    
                    // Trigger counter animation if it's a stat card
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .reveal').forEach(el => {
            observer.observe(el);
        });
        
        document.querySelectorAll('.stat-card').forEach(el => {
            observer.observe(el);
        });
        
        document.querySelectorAll('.feature-card').forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    setupCounters() {
        // Additional counter setup if needed
    }
    
    animateCounter(element) {
        const numberEl = element.querySelector('.stat-number');
        if (!numberEl || numberEl.classList.contains('counted')) return;
        
        const target = parseInt(numberEl.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                numberEl.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                numberEl.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
        
        numberEl.classList.add('counted');
    }
    
    setupParallax() {
        const blobs = document.querySelectorAll('.blob');
        
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 30;
                const xOffset = (0.5 - x) * speed;
                const yOffset = (0.5 - y) * speed;
                
                blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
    
    // Smooth scroll to element
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    window.animations = new AnimationController();
});
