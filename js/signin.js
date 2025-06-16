document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = emailInput.value.trim();

            if (email === '') {
                alert('Please enter your email address.');
            } else if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
            } else {
                // Simulate account creation/sign-in
                alert('Account created/signed in successfully! Redirecting to dashboard.');
                window.location.href = 'dashboard.html'; // Redirect to dashboard page
            }
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        return /.+@.+\..+/.test(email);
    }
}); 