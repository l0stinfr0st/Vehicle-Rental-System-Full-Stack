
document.addEventListener("DOMContentLoaded", function () {
    const signInBtn = document.getElementById('sign-in-btn');
    const overlay = document.getElementById('overlay');
    const closeBtn1 = document.getElementById('close-btn1');
    const closeBtn2 = document.getElementById('close-btn2');
    const doc = document;
    const create = document.getElementById('create');
    const modal2 = document.getElementById('modal2');
    const modal1 = document.getElementById('modal1');
    const back = document.getElementById('back');
    const passField = document.querySelector('.pass1');
    const showBtn = document.getElementById('show-btn');
    const passIcon = document.getElementById('pass-vis');
    const passField2 = document.querySelector('.pass');
    const showBtn2 = document.getElementById('show-btn2');
    const passIcon2 = document.getElementById('pass-vis2');
    const logIn = document.getElementById('log-in');
    const complete = document.getElementById('complete')

    signInBtn.addEventListener('click', function (event) {
        event.preventDefault();
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
    });

    closeBtn1.addEventListener('click', function () {
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
    });

    closeBtn2.addEventListener('click', function () {
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
        modal1.style.visibility = 'visible';
        modal2.style.visibility = 'hidden';
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.style.visibility = 'hidden';
            overlay.style.opacity = '0';
            modal1.style.visibility = 'visible';
            modal2.style.visibility = 'hidden';
        }
    });

    create.addEventListener('click', function () {
        modal1.style.visibility = 'hidden';
        modal2.style.visibility = 'visible';
        modal2.style.opacity = 1;
    });

    back.addEventListener('click', function () {
        modal2.style.visibility = 'hidden';
        modal1.style.visibility = 'visible';
        modal2.style.opacity = 0;
    });

    showBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (passField.type === "password") {
            passField.type = "text";
            passIcon.className = "fas fa-eye";
        } else {
            passField.type = "password";
            passIcon.className = "fas fa-eye-slash";
        }
    });

    showBtn2.addEventListener('click', function (event) {
        event.preventDefault();
        if (passField2.type === "password") {
            passField2.type = "text";
            passIcon2.className = "fas fa-eye";
        } else {
            passField2.type = "password";
            passIcon2.className = "fas fa-eye-slash";
        }
    });

    logIn.addEventListener('click', function (event) {
        event.preventDefault();

        const email = document.querySelector('.em-field1').value;
        const password = document.querySelector('.pass1').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Logged in succesfully');

                } else {
                    alert('Invalid email or password, please try again');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    complete.addEventListener('click', function () {
        const email = document.querySelector('.em-field').value;
        const password = document.querySelector('.pass').value;
        const first = document.querySelector('.First-Name').value;
        const last = document.querySelector('.Last-Name').value;
        const cityCountry = document.querySelector('.Country-City').value || null;
        const street = document.querySelector('.Street-Address').value || null;
        const postalCode = document.querySelector('.Postal-Coded').value || null;
        const address = cityCountry && street && postalCode ? `${cityCountry}, ${street}, ${postalCode}` : null;
        const phone = document.querySelector('.num').value;

        const data = {
            email: email,
            password: password,
            firstName: first,
            lastName: last,
            address: address,
            phone: phone
        };

        fetch('http://localhost:3000/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

});