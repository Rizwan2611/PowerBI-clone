// Voice Control Implementation
class VoiceControl {
    constructor() {
        this.voiceButton = document.getElementById('voice-control-button');
        this.voiceStatus = document.getElementById('voice-control-status');
        this.isListening = false;
        this.recognition = null;

        // Basic commands
        this.commands = {
            'hello': 'Hello! How can I help you?',
            'hi': 'Hi there!',
            'hey': 'Hey! What\'s up?',
            'help': 'I can help you with revenue, customer, and conversion rate data. Try saying: "Show revenue for last year" or "Show active customers" or "What is the conversion rate?"',
            'thank you': 'You\'re welcome!',
            'thanks': 'No problem!',
            'goodbye': 'Goodbye! Have a great day!',
            'exit': 'Exiting voice control. Goodbye!',
            'show dashboard': 'Navigating to dashboard...',
            'go to dashboard': 'Navigating to dashboard...',
            'dashboard': 'Navigating to dashboard...',
            'go to home': 'Navigating to homepage...',
            'go to homepage': 'Navigating to homepage...',
            'refresh dashboard': 'Refreshing dashboard data...',
            'update dashboard': 'Updating dashboard...',
            'show faq': 'Showing FAQ section...',
            'show faqs': 'Showing FAQ section...',
            'faq': 'Showing FAQ section...',
            'show frequently asked questions': 'Showing FAQ section...',
            'show use cases': 'Showing Use Cases section...',
            'use cases': 'Showing Use Cases section...',
            'show usecase': 'Showing Use Cases section...',
            'show usecase section': 'Showing Use Cases section...',
            'show about power platform': 'Showing About Power Platform section...',
            'about power platform': 'Showing About Power Platform section...',
            'show product overview': 'Showing Product Overview section...',
            'product overview': 'Showing Product Overview section...',
            'show sign in page': 'Navigating to sign in page...',
            'sign in page': 'Navigating to sign in page...',
            'go to sign in': 'Navigating to sign in page...',
            'sign in': 'Navigating to sign in page...',
            'scroll down': 'Scrolling down...',
            'scroll up': 'Scrolling up...',
            'scroll to top': 'Scrolling to top...',
            'scroll to bottom': 'Scrolling to bottom...',
            'power bi': 'Hello, how can I help you with Power BI?'
        };

        // Add visual feedback element
        this.createVisualFeedback();
    }

    createVisualFeedback() {
        if (!document.getElementById('voice-feedback')) {
            const feedback = document.createElement('div');
            feedback.id = 'voice-feedback';
            feedback.className = 'voice-feedback';
            document.body.appendChild(feedback);
        }
    }

    initialize() {
        console.log('Initializing voice control...');
        
        if (!this.voiceButton || !this.voiceStatus) {
            console.error('Voice control elements not found in the DOM');
            return;
        }

        if (!('webkitSpeechRecognition' in window)) {
            console.error('Speech recognition not supported in this browser');
            this.voiceButton.style.display = 'none';
            this.voiceStatus.textContent = 'Voice control not supported in this browser.';
            this.voiceStatus.classList.add('error');
            return;
        }

        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.setupEventListeners();
        this.updateStatus('Click to speak');
        console.log('Voice control initialized successfully');
    }

    setupEventListeners() {
        this.voiceButton.addEventListener('click', () => this.toggleListening());
        this.recognition.onstart = () => this.handleRecognitionStart();
        this.recognition.onresult = (event) => this.handleRecognitionResult(event);
        this.recognition.onend = () => this.handleRecognitionEnd();
        this.recognition.onerror = (event) => this.handleRecognitionError(event);
    }

    toggleListening() {
        console.log('Voice button clicked, isListening:', this.isListening);
        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.updateStatus('Starting...');
                this.showVisualFeedback('Starting voice recognition...');
                this.recognition.start();
            } catch (error) {
                console.error('Error starting recognition:', error);
                this.updateStatus('Error starting voice recognition. Please try again.', 'error');
                this.showVisualFeedback('Error starting voice recognition', 'error');
            }
        }
    }

    handleRecognitionStart() {
        console.log('Recognition started');
        this.isListening = true;
        this.voiceButton.classList.add('active');
        this.updateStatus('Listening...', 'listening');
        this.showVisualFeedback('Listening...', 'listening');
    }

    handleRecognitionResult(event) {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript.toLowerCase();
        const isFinal = result.isFinal;

        console.log('Recognition result:', transcript, 'isFinal:', isFinal);
        
        if (isFinal) {
            this.updateStatus(`Heard: "${transcript}"`);
            this.showVisualFeedback(`Command: ${transcript}`, 'success');
            this.processCommand(transcript);
        } else {
            // Show interim results
            this.updateStatus(`Listening: "${transcript}"...`, 'listening');
            this.showVisualFeedback(`Listening: ${transcript}...`, 'listening');
        }
    }

    handleRecognitionEnd() {
        console.log('Recognition ended');
        this.isListening = false;
        this.voiceButton.classList.remove('active');
        if (!this.voiceStatus.textContent.startsWith('Heard:') && !this.voiceStatus.textContent.startsWith('Error:')) {
            this.updateStatus('Click to speak');
        }
        this.hideVisualFeedback();
    }

    handleRecognitionError(event) {
        console.error('Speech recognition error:', event.error);
        let errorMessage = `Error: ${event.error}.`;
        
        switch (event.error) {
            case 'not-allowed':
                errorMessage += ' Please allow microphone access and try again.';
                break;
            case 'no-speech':
                errorMessage += ' No speech detected. Please speak clearly.';
                break;
            case 'audio-capture':
                errorMessage += ' No microphone found. Please check your microphone connection.';
                break;
            case 'network':
                errorMessage += ' Network error occurred. Please check your internet connection.';
                break;
        }
        
        this.updateStatus(errorMessage + ' Click to speak.', 'error');
        this.showVisualFeedback(errorMessage, 'error');
        this.isListening = false;
        this.voiceButton.classList.remove('active');
    }

    updateStatus(message, type = '') {
        this.voiceStatus.textContent = message;
        this.voiceStatus.className = 'voice-status';
        if (type) {
            this.voiceStatus.classList.add(type);
        }
    }

    showVisualFeedback(message, type = '') {
        const feedback = document.getElementById('voice-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = 'voice-feedback';
            if (type) {
                feedback.classList.add(type);
            }
            feedback.style.display = 'block';
        }
    }

    hideVisualFeedback() {
        const feedback = document.getElementById('voice-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }

    processCommand(command) {
        console.time('processCommand');
        console.log(`[VoiceControl] Processing command: "${command}"`);

        // Sort commands by length in descending order to prioritize more specific commands
        const sortedCommands = Object.keys(this.commands).sort((a, b) => b.length - a.length);

        // Check for basic commands
        for (const key of sortedCommands) {
            if (command.includes(key)) {
                const response = this.commands[key];
                this.showVisualFeedback(response, 'success');
                // Speak the response aloud
                if ('speechSynthesis' in window) {
                  const utter = new SpeechSynthesisUtterance(response);
                  utter.lang = 'en-US';
                  window.speechSynthesis.speak(utter);
                }
                console.log(`[VoiceControl] Recognized command: "${key}"`);
                
                if (key.includes('dashboard') && (key.includes('show') || key.includes('go to'))) {
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else if (key.includes('home') && key.includes('go to')) {
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else if (key === 'scroll down') {
                    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                } else if (key === 'scroll up') {
                    window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
                } else if (key === 'scroll to top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (key === 'scroll to bottom') {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                } else if (key.includes('refresh dashboard') || key.includes('update dashboard')) {
                    if (typeof window.refreshDashboardData === 'function') {
                        window.refreshDashboardData();
                    } else {
                        console.warn('refreshDashboardData function not found in dashboard.js');
                        this.showVisualFeedback('Dashboard refresh function not available.', 'warning');
                    }
                } else if (key === 'show faq' || key === 'show faqs' || key === 'faq' || key === 'show frequently asked questions') {
                    setTimeout(() => {
                        const faqSection = document.getElementById('faq-section');
                        if (faqSection) {
                            faqSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 800);
                } else if (key === 'show use cases' || key === 'use cases' || key === 'show usecase' || key === 'show usecase section') {
                    setTimeout(() => {
                        const useCasesSection = document.getElementById('use-cases');
                        if (useCasesSection) {
                            useCasesSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 800);
                } else if (key === 'show about power platform' || key === 'about power platform' || key === 'show product overview' || key === 'product overview') {
                    setTimeout(() => {
                        const overviewSection = document.getElementById('power-bi-product-overview');
                        if (overviewSection) {
                            overviewSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 800);
                } else if (key === 'show sign in page' || key === 'sign in page' || key === 'go to sign in' || key === 'sign in') {
                    setTimeout(() => {
                        window.location.href = 'signin.html';
                    }, 1000);
                }
                
                console.timeEnd('processCommand');
                return;
            }
        }

        // Wake word: if user says 'power bi' anywhere in the command
        if (command.includes('power bi')) {
            const response = 'Hello, how can I help you with Power BI?';
            this.showVisualFeedback(response, 'success');
            if ('speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance(response);
              utter.lang = 'en-US';
              window.speechSynthesis.speak(utter);
            }
            return;
        }

        // If no command was recognized
        this.updateStatus(`Command not recognized: "${command}". Try "help" for available commands.`, 'error');
        this.showVisualFeedback(`Command not recognized: "${command}". Try "help" for available commands.`, 'error');
        console.log(`[VoiceControl] Command not recognized: "${command}"`);
        
        console.timeEnd('processCommand');
    }
}

// Initialize voice control when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const voiceControl = new VoiceControl();
    voiceControl.initialize();
}); 