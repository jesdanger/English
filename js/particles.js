/**
 * Particles Module
 * Creates interactive particle effects on click and hover
 */

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.colors = ['#FF3D8B', '#8B5CF6', '#B8FF3D', '#FFD93D', '#3B82F6'];
        this.init();
    }
    
    init() {
        document.addEventListener('click', (e) => {
            this.createExplosion(e.clientX, e.clientY);
        });
        
        // Create floating particles periodically
        setInterval(() => {
            this.createFloatingParticle();
        }, 3000);
    }
    
    createExplosion(x, y) {
        const particleCount = 12;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(x, y, true);
        }
    }
    
    createParticle(x, y, explode = false) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 20 + 10;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        if (explode) {
            const angle = (Math.random() * Math.PI * 2);
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.animation = 'particleExplode 1s ease-out forwards';
        } else {
            particle.style.animation = 'particleFloat 1s ease-out forwards';
        }
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    createFloatingParticle() {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 50;
        this.createParticle(x, y);
    }
}

// Add explosion animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleExplode {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    window.particles = new ParticleSystem();
});
