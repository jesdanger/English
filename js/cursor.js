/**
 * Custom Cursor Module
 * Handles custom cursor with smooth following effect
 */

class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;
        
        this.init();
    }
    
    init() {
        if (window.innerWidth <= 968) return;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.animate();
        this.addHoverEffects();
    }
    
    animate() {
        // Smooth cursor movement
        this.cursorX += (this.mouseX - this.cursorX) * 0.2;
        this.cursorY += (this.mouseY - this.cursorY) * 0.2;
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        
        this.cursor.style.left = this.cursorX - 10 + 'px';
        this.cursor.style.top = this.cursorY - 10 + 'px';
        this.follower.style.left = this.followerX - 20 + 'px';
        this.follower.style.top = this.followerY - 20 + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    addHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .feature-card, .stat-card, input, textarea'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
    
    click() {
        this.cursor.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.cursor.style.transform = '';
        }, 150);
    }
}

// Initialize cursor
document.addEventListener('DOMContentLoaded', () => {
    window.cursor = new CustomCursor();
});
