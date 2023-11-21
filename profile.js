document.addEventListener('DOMContentLoaded', function () {

    var signOutButton = document.getElementById("sign_out");
    if (signOutButton) {
        signOutButton.addEventListener('click', async function () {
            chrome.runtime.sendMessage({ message: 'logout' },
                function (response) {
                    if (response === 'success')
                        window.location.replace('./signin.html');
                }
            );
            /*  // Clear the token and user data from storage
              chrome.storage.local.remove(['token', 'user'], function () {
                  console.log('Token and User data are cleared from local storage');
              });
    
              // Switch back to sign-in page
              chrome.browserAction.setPopup({ popup: 'signin.html' });
    
              // Close the popup window immediately
              window.close();*/
        });
    }



    chrome.runtime.sendMessage({ message: 'userStatus' },
        function (response) {
            if (response.message == 'success') {

                /*  document.getElementById('name').innerText =
                      response.user_info;*/
       
                const profileElement = document.getElementById('profile');
                console.log(JSON.stringify(response));
                if (profileElement) {
                    profileElement.innerHTML = `
                    <h2>Welcome ${response.user_info.loginEmail} !</h2> 
                `;
                }

            }
        }
    );



    /*
    
        // Fetch the stored token and user data from chrome storage
        chrome.storage.local.get(['token', 'user'], function (result) {
            const token = result.token;
            const user = result.user;
    
            console.log("token:" + token);
    
            if (token && user) {
                // Display user profile in the extension
                const profileElement = document.getElementById('profile');
    
                if (profileElement) {
                    profileElement.innerHTML = `
                        <h2>Welcome ${user.firstName} ${user.lastName}!</h2> 
                    `;
                }
    
                try {
                    // Fetch user profile from your server
                    fetch('http://localhost:8080/users/profile', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => response.json())
                        .then(userData => {
                            // Store updated user data in Chrome storage
                            chrome.storage.local.set({ 'user': userData }, function () {
                                console.log('User data is updated in local storage');
                            });
                        }).catch(function (e) {
                            console.error('Error:' + e);
                            alert(e);
                        });
                } catch (err) {
                    console.error('An error occurred:', err);
                    alert('An error occurred:', err);
                }
            } else {
                // User is not logged in. You can redirect them to your login page.
                chrome.browserAction.setPopup({ popup: 'signin.html' });
            }
        });*/
});
