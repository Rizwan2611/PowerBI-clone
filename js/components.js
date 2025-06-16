// Load components
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize voice control
        if (typeof VoiceControl !== 'undefined') {
            const voiceControl = new VoiceControl();
            voiceControl.initialize();
        } else {
            console.error('VoiceControl class not found. Ensure js/voice-control.js is loaded.');
        }

        // Initialize other components
        initializeNavigation();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}); 