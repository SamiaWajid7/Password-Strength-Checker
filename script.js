document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const strengthMessage = document.getElementById('strengthMessage');
    const suggestions = document.getElementById('suggestions');
    const checkbox = document.getElementById('togglePassword');

    // Set the checkbox to be checked by default
    checkbox.checked = true;
    // Set the password field type to text if the checkbox is checked
    passwordField.setAttribute('type', 'text');

    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;

        // Hide messages when the input is empty
        if (password === '') {
            strengthMessage.textContent = '';
            suggestions.innerHTML = '';
            return;
        }

        let strength = 'Weak';
        let suggestionsList = [];

        // Evaluate the strength of the password
        if (password.length >= 8) {
            // Count the number of character types present
            let types = 0;
            if (/[A-Z]/.test(password)) types++;
            if (/[a-z]/.test(password)) types++;
            if (/[0-9]/.test(password)) types++;
            if (/[^A-Za-z0-9]/.test(password)) types++;

            if (types === 1) {
                strength = 'Medium';
            } else if (types === 2 || types === 3) {
                strength = 'Strong';
            } else if (types === 4) {
                strength = 'Very Strong';
            }
        } else {
            strength = 'Weak';
            suggestionsList.push('Add more characters (8 or more).');
        }

        // Suggestions for missing password requirements
        if (!/[A-Z]/.test(password)) {
            suggestionsList.push('Include at least one uppercase letter.');
        }

        if (!/[a-z]/.test(password)) {
            suggestionsList.push('Include at least one lowercase letter.');
        }

        if (!/[0-9]/.test(password)) {
            suggestionsList.push('Include at least one number.');
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            suggestionsList.push('Include at least one special character.');
        }

        // Update the strength message and apply the appropriate class
        strengthMessage.textContent = `Strength: ${strength}`;
        // Remove existing strength classes
        strengthMessage.className = 'strength';
        // Add the new strength class
        strengthMessage.classList.add(strength.toLowerCase().replace(' ', ''));

        // Update the suggestions list
        suggestions.innerHTML = '';
        suggestionsList.forEach(function(suggestion) {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestions.appendChild(li);
        });
    });

    // Toggle password visibility function
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            passwordField.setAttribute('type', 'text');
        } else {
            passwordField.setAttribute('type', 'password');
        }
    });
});
