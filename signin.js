
document.addEventListener('DOMContentLoaded', function () {
    var signInButton = document.getElementById("sign_in");
    if (signInButton) {
        signInButton.addEventListener('click', function () {

            const loginEmail = document.getElementById("loginEmail").value;
            const loginPassword = document.getElementById("loginPassword").value;

            if (loginEmail && loginPassword) {

                chrome.runtime.sendMessage({
                    message: 'signin',
                    payload: { "loginEmail": loginEmail, "loginPassword": loginPassword }
                },
                    function (response) {
                        console.log(response);
                    }
                );

                /*
                try {
                
                    const response = await fetch('http://localhost:8080/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "email": loginEmail,
                            "password": loginPassword
                        })
                    });
                
                    const res = await response.json();
                
                    const token = res.token;
                    // Wrap chrome.storage.local.set() in a promise
                    const setTokenPromise = new Promise((resolve, reject) => {
                        chrome.storage.local.set({ 'token': token }, function () {
                            if (chrome.runtime.lastError) {
                                reject(chrome.runtime.lastError);
                            } else {
                                console.log('Token is stored in local storage');
                                resolve();
                            }
                        });
                    });
                
                    // Wait for the token to be stored before switching the popup
                    await setTokenPromise;
                
                    // Switch to profile.html
                    chrome.browserAction.setPopup({ popup: 'profile.html' });
                    window.close();
                } catch (error) {
                    alert('There has been a problem with your fetch operation: ' + error);
                    console.error('There has been a problem with your fetch operation:', error);
                }*/

            } else {
                document.querySelector('#loginEmail').placeholder = "Enter an email.";
                document.querySelector('#loginPassword').placeholder = "Enter a password.";
                document.querySelector('#loginEmail').style.backgroundColor = 'red';
                document.querySelector('#loginPassword').style.backgroundColor = 'red';
                document.querySelector('#loginEmail').classList.add('white_placeholder');
                document.querySelector('#loginPassword').classList.add('white_placeholder');
            }


        });
    }
});
