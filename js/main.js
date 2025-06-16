// Main JavaScript for Power BI Landing Page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    ['initializeHeroAnimations', 'initializeFeatureCards', 'initializeScrollEffects', 
     'initializeFilters', 'initializeCapabilityTabSwitching', 'initializeProductDetailSections', 
     'initializeInteroperabilityCarousel', 'animateNextStepCards'].forEach(func => window[func]());

    // FAQ animations and functionality
    initializeFAQ();
    
    // Customer stories carousel
    initializeCustomerStories();
    
    // AI Chatbot
    initializeChatbot();
});

// Image mappings for different sections
const imageMappings = {
    powerBICapabilities: {
        "Uncover insights with AI": "./images/image.png",
        "Bring all your data together": "./images/image 2.png",
        "Turn insights into impact": "./images/image 3.png",
        "Empower every data team": "./images/image 4.png"
    },
    whyPowerBI: {
        "Seamlessly scale as needed": "./images/why.png",
        "Share insights everywhere": "./images/why2.png",
        "Get more done with AI": "./images/why3.png",
        "Govern and protect data": "./images/why4.png"
    },
    copilot: {
        "Overview": "./images/image.png",
        "Create reports in seconds": "./images/microsoft.png",
        "Quickly explore and summarize your data": "./images/image 3.png",
        "Write DAX queries": "./images/image 4.png"
    },
    fabric: {
        "Overview": "./images/fabric-overview.png",
        "Unify your data estate": "./images/fabric-unify.png",
        "Transform your data": "./images/fabric-transform.png",
        "Unify data governance": "./images/fabric-data-governance.png"
    },
    pro: {
        "Overview": "./images/fabric-pro-overview.png",
        "Self-service BI": "./images/fabric-pro-self_Service.png",
        "Microsoft 365 E5": "./images/fabric-pro-microsoft-365-e5.png"
    },
    freeAccount: {
        "Create a free account": "./images/create-free-account.png",
        "Power BI Desktop": "./images/BI-Desktop.png",
        "Activate your free trial": "./images/activate-free-trial.png",
        "Sharpen your skills": "./images/skills.png"
    }
};

// Core functionality functions
function initializeFAQ() {
    const faqCards = document.querySelectorAll('.faq-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        faqCards.forEach(card => observer.observe(card));
    } else {
        faqCards.forEach(card => card.classList.add('visible'));
    }

    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const isActive = item.classList.contains('active');
            
            item.parentElement.querySelectorAll('.faq-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
                activeItem.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
            });
            
            if (!isActive) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function initializeCustomerStories() {
    const customerStories = [
        { logo: 'images/customer-jacobs.png', quote: "We are building a data-driven culture around the world-class problems that Jacobs undertakes for our clients.", author: 'Alex Mahrou, Director of Emerging Technology and Platforms, Jacobs Solutions Inc.', image: 'images/customer-jacobs-main.jpg' },
        { logo: 'images/customer-kraftheinz.png', quote: "Imagine this dream scenario. You already have all the data you need... You gather client insights, and... send them to the buyer.", author: 'Cristian Spuza, Head of Customer Development, Kraft Heinz', image: 'images/customer-kraftheinz-main.jpg' },
        { logo: 'images/customer-mns.png', quote: "Having all of our data in one single place... has allowed us to quickly build dashboards... helping improve the speed to insight.", author: 'Anthony Reed, Foods Data Product Manager, Marks & Spencer', image: 'images/customer-mns-main.jpg' },
        { logo: 'images/customer-eon.png', quote: "Power BI had a clear advantage over other tools in terms of interoperability with the Microsoft 365 platform. We face no obstacles in getting data to the right place.", author: 'Lars Hesse, Data Analyst, E.ON Energie Deutschland GmbH', image: 'images/customer-eon-main.jpg' },
        { logo: 'images/customer-usf.png', quote: "From an analytics perspective, we're able to use data to make progress... and empower that data-driven decision making.", author: 'Jenny Paulsen, Deputy Chief Information Officer, University of South Florida', image: 'images/customer-usf-main.jpg' },
        { logo: 'images/customer-abnamro.png', quote: "Power BI and Azure ... provided us with the performance for hundreds of concurrent users handling tens of billions of records.", author: 'Jurriaan Amesz, Lead Product Owner, ABN AMRO Bank', image: 'images/customer-abnamro-main.jpg' }
    ];

    document.querySelectorAll('.customer-logo-btn').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const story = customerStories[idx];
            document.getElementById('customer-story-logo').innerHTML = `<img src="${story.logo}" alt="Customer Logo" />`;
            document.getElementById('customer-story-quote').textContent = story.quote;
            document.getElementById('customer-story-author').textContent = story.author;
            document.getElementById('customer-story-image').innerHTML = `<img src="${story.image}" alt="Customer" />`;
            document.querySelectorAll('.customer-logo-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
        });
    });
}

function initializeChatbot() {
    const elements = {
        btn: document.getElementById('ai-chatbot-button'),
        panel: document.getElementById('ai-chatbot-panel'),
        close: document.getElementById('ai-chatbot-close'),
        form: document.getElementById('ai-chatbot-form'),
        input: document.getElementById('ai-chatbot-input'),
        body: document.getElementById('ai-chatbot-body'),
        mic: document.getElementById('ai-chatbot-mic')
    };

    let chatbotData = {};
    fetch('chatbot-data.json').then(res => res.json()).then(data => { chatbotData = data; });

    elements.btn.addEventListener('click', () => {
        elements.panel.style.display = 'flex';
        setTimeout(() => elements.input.focus(), 200);
    });

    elements.close.addEventListener('click', () => {
        elements.panel.style.display = 'none';
    });

    elements.form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const msg = elements.input.value.trim();
        if (!msg) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'ai-chatbot-message ai-chatbot-message-user';
        userMsg.textContent = msg;
        elements.body.appendChild(userMsg);
        elements.input.value = '';
        elements.body.scrollTop = elements.body.scrollHeight;

        const botMsg = document.createElement('div');
        botMsg.className = 'ai-chatbot-message ai-chatbot-message-bot';
        botMsg.textContent = "Thinking...";
        elements.body.appendChild(botMsg);
        elements.body.scrollTop = elements.body.scrollHeight;

        let reply = chatbotData[msg.toLowerCase()] || Object.keys(chatbotData).find(key => msg.toLowerCase().includes(key))?.value || "Sorry, I don't have an answer for that. Please try another question about Power BI.";
        botMsg.textContent = reply;
        elements.body.scrollTop = elements.body.scrollHeight;

        if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(reply);
            utter.lang = 'en-US';
            window.speechSynthesis.speak(utter);
        }
    });

    if (elements.mic && 'webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        elements.mic.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                recognition.stop();
                this.classList.remove('active');
            } else {
                recognition.start();
                this.classList.add('active');
            }
        });

        recognition.onresult = event => {
            elements.input.value = event.results[0][0].transcript;
            elements.mic.classList.remove('active');
            elements.input.focus();
        };

        recognition.onend = recognition.onerror = () => elements.mic.classList.remove('active');
    } else if (elements.mic) {
        elements.mic.style.display = 'none';
    }
}

function initializeInsightSections(contentId) {
    const currentContent = document.getElementById(contentId);
    if (!currentContent) return;

    const insightItems = currentContent.querySelectorAll('.insight-item');
    const insightImage = currentContent.querySelector('.dashboard-image');
    const dashboardImageContainer = currentContent.querySelector('.dashboard-image-container');
    if (!insightImage || !dashboardImageContainer) return;

    const insightImages = {
        'power-bi-pro-content': imageMappings.pro,
        'power-bi-capabilities-content': imageMappings.powerBICapabilities,
        'why-power-bi-capabilities-content': imageMappings.whyPowerBI,
        'copilot-product-overview-content': imageMappings.copilot,
        'power-bi-fabric-content': imageMappings.fabric,
        'free-account-content': imageMappings.freeAccount
    }[contentId];

    if (!insightImages) return;

    const loadImage = src => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });

    // Set initial image if there's an expanded item
    const initialExpandedItem = currentContent.querySelector('.insight-item.expanded');
    if (initialExpandedItem) {
        const initialInsightTitle = initialExpandedItem.querySelector('.insight-title').textContent.replace(/\s[\^v]$/, '').trim();
        if (insightImages[initialInsightTitle]) {
            loadImage(insightImages[initialInsightTitle])
                .then(() => {
                    insightImage.src = insightImages[initialInsightTitle];
                    insightImage.style.opacity = '1';
                })
                .catch(error => {
                    console.error(`Error loading initial image: ${error}`);
                    insightImage.style.opacity = '0';
                });
        }
    }

    insightItems.forEach(item => {
        const title = item.querySelector('.insight-title');
        const description = item.querySelector('.insight-description');
        const toggleIcon = item.querySelector('.toggle-icon');
        const insightText = title.textContent.replace(/\s[\^v]$/, '').trim();

        if (item.classList.contains('expanded')) {
            description.style.maxHeight = description.scrollHeight + "px";
            toggleIcon.textContent = '^';
        }

        title.addEventListener('click', async function() {
            // First, collapse all other items
            currentContent.querySelectorAll('.insight-item.expanded').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('.insight-description').style.maxHeight = null;
                    otherItem.querySelector('.toggle-icon').textContent = 'v';
                }
            });

            // Toggle current item
            const wasExpanded = item.classList.contains('expanded');
            item.classList.toggle('expanded');
            
            if (item.classList.contains('expanded')) {
                description.style.maxHeight = description.scrollHeight + "px";
                toggleIcon.textContent = '^';

                // Update image if available
                if (insightImages[insightText]) {
                    try {
                        insightImage.style.opacity = '0';
                        await loadImage(insightImages[insightText]);
                        insightImage.src = insightImages[insightText];
                        insightImage.style.opacity = '1';
                    } catch (error) {
                        console.error(`Error updating image: ${error}`);
                        insightImage.style.opacity = '0';
                    }
                }
            } else {
                description.style.maxHeight = null;
                toggleIcon.textContent = 'v';
            }
        });
    });
}

function initializeCapabilityTabSwitching() {
    const capabilityTabs = document.querySelectorAll('.capabilities-tabs .capability-tab');
    const dynamicCapabilityContentWrapper = document.querySelector('.dynamic-capability-content-wrapper');
    if (!capabilityTabs.length || !dynamicCapabilityContentWrapper) return;

    capabilityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetContentId = this.getAttribute('data-target-content');
            capabilityTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            Array.from(dynamicCapabilityContentWrapper.children).forEach(contentDiv => {
                contentDiv.style.display = 'none';
            });

            const targetContent = document.getElementById(targetContentId);
            if (targetContent) {
                targetContent.style.display = 'flex';
                initializeInsightSections(targetContentId);
            }
        });
    });

    const defaultActiveTab = document.querySelector('.capabilities-tabs .capability-tab.active');
    if (defaultActiveTab) {
        const defaultContentId = defaultActiveTab.getAttribute('data-target-content');
        const defaultContent = document.getElementById(defaultContentId);
        if (defaultContent) {
            defaultContent.style.display = 'flex';
            initializeInsightSections(defaultContentId);
        }
    }
}

function initializeProductDetailSections() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailSectionsContainer = document.getElementById('product-detail-sections');
    if (!productLinks.length || !productDetailSectionsContainer) return;

    Array.from(productDetailSectionsContainer.children).forEach(section => {
        if (section.id !== 'power-bi-product-overview') {
            section.style.display = 'none';
        }
    });

    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSectionId = this.getAttribute('data-target-section');
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                Array.from(productDetailSectionsContainer.children).forEach(section => {
                    section.style.display = 'none';
                });
                targetSection.style.display = 'block';
            }
        });
    });
}

function initializeInteroperabilityCarousel() {
    const interopCardsGrid = document.querySelector('.interop-cards-grid');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    if (!interopCardsGrid || !prevButton || !nextButton) return;

    const scrollAmount = interopCardsGrid.querySelector('.interop-card')?.offsetWidth + 30 || 330;

    prevButton.addEventListener('click', () => {
        interopCardsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        interopCardsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

function animateNextStepCards() {
    const cards = document.querySelectorAll('.next-step-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(entry.target.style.getPropertyValue('--delay') || 0));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

function showFabricDemo(demoType) {
    const demoContainer = document.getElementById(`fabric-${demoType}-demo`);
    if (!demoContainer) return;

    const demoContent = {
        overview: {
            title: "Power BI in Fabric Overview",
            subtitle: "Experience how Power BI integrates with Microsoft Fabric",
            steps: [
                "Connect to your data sources",
                "Transform and model your data",
                "Create interactive reports"
            ]
        },
        unify: {
            title: "OneLake Data Hub",
            subtitle: "Unify your data estate with OneLake",
            steps: [
                "Connect to OneLake",
                "Browse data sources",
                "Curate and organize data"
            ]
        },
        transform: {
            title: "Data Transformation",
            subtitle: "Transform your data with Fabric workloads",
            steps: [
                "Select transformation type",
                "Configure transformation",
                "Apply and validate"
            ]
        },
        governance: {
            title: "Data Governance",
            subtitle: "Manage data access and security",
            steps: [
                "Set access policies",
                "Configure data protection",
                "Monitor compliance"
            ]
        }
    };

    const content = demoContent[demoType];
    if (!content) return;

    demoContainer.innerHTML = `
        <div class="fabric-demo-content">
            <div class="demo-header">
                <h4>${content.title}</h4>
                <p>${content.subtitle}</p>
            </div>
            <div class="demo-steps">
                ${content.steps.map((step, index) => `
                    <div class="step">
                        <span class="step-number">${index + 1}</span>
                        <p>${step}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    demoContainer.classList.add('demo-active');
    setTimeout(() => demoContainer.classList.remove('demo-active'), 500);
}

// Animation functions
function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroContent || !heroVisual) return;

    [heroContent, heroVisual].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        [heroContent, heroVisual].forEach(el => {
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 500);
}

function initializeFeatureCards() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeScrollEffects() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

function initializeFilters() {
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed to:', this.value);
        });
    });
}