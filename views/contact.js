    function validateInput(inputField, errorMessageElement) {
        const regex = /^[A-Za-z\s]+$/;
        const inputValue = inputField.value;

        if (!regex.test(inputValue)) {
            errorMessageElement.textContent = 'Input contains invalid characters (numbers and symbols)';
            inputField.classList.add('error');
            return false;
        } else {
            errorMessageElement.textContent = '';
            inputField.classList.remove('error');
            return true;
        }
    }

    const fname = document.getElementById('fname');
    const fnameError = document.getElementById('fname-error');

    const lname = document.getElementById('lname');
    const lnameError = document.getElementById('lname-error');

    function validateForm(e) {
        e.preventDefault();

        const isFnameValid = validateInput(fname, fnameError);
        const isLnameValid = validateInput(lname, lnameError);
        if (!isFnameValid || !isLnameValid) {
            alert('Please fill in all fields correctly.');
        } else {
            location.reload();
        }
    }

    fname.addEventListener('input', () => validateInput(fname, fnameError));
    fname.addEventListener('blur', () => validateInput(fname, fnameError));

    lname.addEventListener('input', () => validateInput(lname, lnameError));
    lname.addEventListener('blur', () => validateInput(lname, lnameError));

    document.getElementById('submit-button').addEventListener('click', validateForm);
