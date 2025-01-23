const usernameInput = document.getElementById('username');
let checkTimeout;

usernameInput.addEventListener('input', function() {
    clearTimeout(checkTimeout);
    const username = this.value;
    
    if (!username) {
        this.classList.remove('is-valid', 'is-invalid');
        return;
    }

    checkTimeout = setTimeout(() => {
        fetch(`/accounts/check-username/?username=${encodeURIComponent(username)}`)
            .then(response => response.json())
            .then(data => {
                if (data.is_taken) {
                    usernameInput.classList.remove('is-valid');
                    usernameInput.classList.add('is-invalid');
                } else {
                    usernameInput.classList.remove('is-invalid');
                    usernameInput.classList.add('is-valid');
                }
                validateForm();
            });
    }, 500);
});

const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');
const submitBtn = document.getElementById('submit-btn');

const requirements = {
    length: { regex: /.{8,}/, element: document.getElementById('length-check') },
    uppercase: { regex: /[A-Z]/, element: document.getElementById('uppercase-check') },
    lowercase: { regex: /[a-z]/, element: document.getElementById('lowercase-check') },
    special: { regex: /[!@#$%^&*(),.?":{}|<>]/, element: document.getElementById('special-check') }
};

function validatePassword() {
    const password = password1Input.value;
    let isValid = true;

    for (const [key, requirement] of Object.entries(requirements)) {
        const passes = requirement.regex.test(password);
        requirement.element.innerHTML = `${passes ? '✅' : '❌'} ${requirement.element.innerHTML.split(' ').slice(1).join(' ')}`;
        if (!passes) isValid = false;
    }

    return isValid;
}

function validatePasswordMatch() {
    const password1 = password1Input.value;
    const password2 = password2Input.value;

    if (!password2) {
        password2Input.classList.remove('is-valid', 'is-invalid');
        return false;
    }

    const matches = password1 === password2;
    password2Input.classList.toggle('is-valid', matches);
    password2Input.classList.toggle('is-invalid', !matches);
    return matches;
}

function validateForm() {
    const isUsernameValid = usernameInput.classList.contains('is-valid');
    const isPasswordValid = validatePassword();
    const isPasswordMatch = validatePasswordMatch();
    
    submitBtn.disabled = !(isUsernameValid && isPasswordValid && isPasswordMatch);
}

password1Input.addEventListener('input', () => {
    validatePassword();
    validatePasswordMatch();
    validateForm();
});

password2Input.addEventListener('input', () => {
    validatePasswordMatch();
    validateForm();
}); 