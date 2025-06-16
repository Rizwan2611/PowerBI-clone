// FAQ Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqToggles = document.querySelectorAll('.faq-toggle');
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Function to close all FAQ items
    function closeAllFaqItems() {
        faqItems.forEach((item, index) => {
            item.classList.remove('active');
            faqToggles[index].textContent = '+';
            faqToggles[index].setAttribute('aria-expanded', 'false');
        });
    }

    // Function to toggle a specific FAQ item
    function toggleFaqItem(index) {
        const isActive = faqItems[index].classList.contains('active');
        closeAllFaqItems();
        
        if (!isActive) {
            faqItems[index].classList.add('active');
            faqToggles[index].textContent = '-';
            faqToggles[index].setAttribute('aria-expanded', 'true');
            
            // Scroll the item into view if it's not fully visible
            const itemRect = faqItems[index].getBoundingClientRect();
            const isFullyVisible = (
                itemRect.top >= 0 &&
                itemRect.bottom <= window.innerHeight
            );
            
            if (!isFullyVisible) {
                faqItems[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }
    }

    // Click event for toggle buttons
    faqToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleFaqItem(index);
        });
    });

    // Click event for questions
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', () => {
            toggleFaqItem(index);
        });
    });

    // Keyboard navigation
    faqItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaqItem(index);
            }
        });
    });

    // Add keyboard navigation between FAQ items
    document.addEventListener('keydown', (e) => {
        const activeIndex = Array.from(faqItems).findIndex(item => 
            item.classList.contains('active')
        );

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (activeIndex + 1) % faqItems.length;
            toggleFaqItem(nextIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (activeIndex - 1 + faqItems.length) % faqItems.length;
            toggleFaqItem(prevIndex);
        } else if (e.key === 'Escape') {
            closeAllFaqItems();
        }
    });

    // Add ARIA attributes for accessibility
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        // Set ARIA attributes
        question.setAttribute('role', 'heading');
        question.setAttribute('aria-level', '3');
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', `faq-question-${index}`);
        toggle.setAttribute('aria-controls', `faq-answer-${index}`);
        toggle.setAttribute('aria-expanded', 'false');

        // Add IDs for ARIA relationships
        question.id = `faq-question-${index}`;
        answer.id = `faq-answer-${index}`;
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === 'faq-section') {
                e.preventDefault();
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 