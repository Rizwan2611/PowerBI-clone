// Navbar functionality
class Navbar {
    constructor() {
        this.header = document.querySelector('.header');
        this.dropdowns = document.querySelectorAll('.nav-item.dropdown');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        // Initialize scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Initialize dropdowns
        this.initDropdowns();
        
        // Initialize mobile menu
        this.initMobileMenu();
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        this.lastScroll = currentScroll;
    }
    
    initDropdowns() {
        this.dropdowns.forEach(item => {
            const dropdown = item.querySelector('.dropdown-menu');
            
            item.addEventListener('mouseenter', () => {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            });
            
            item.addEventListener('mouseleave', () => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
            });
        });
    }
    
    initMobileMenu() {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const navContainer = document.querySelector('.navbar');
        if (navContainer) {
            navContainer.appendChild(mobileMenuButton);
            
            mobileMenuButton.addEventListener('click', () => {
                const navCenter = document.querySelector('.nav-center');
                if (navCenter) {
                    navCenter.classList.toggle('active');
                    mobileMenuButton.classList.toggle('active');
                }
            });
        }
    }
}

// Export the Navbar class
window.Navbar = Navbar; 