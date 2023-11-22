function flip_user_status(signIn, user_info) {
    // Your API fetching logic here...
    return fetch('https://turbograding-api-ae8e0a55a59d.herokuapp.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email:user_info.loginEmail,
         password:user_info.loginPassword
 
    }),
    })
      .then((response) => response.json())
      .then((apiResponse) => {
        // Send the API response to the background script
        console.log("apiResponse")
        console.log(apiResponse)

        chrome.runtime.sendMessage({ action: 'apiResponse', data: apiResponse });
      })
      .catch((error) => {
        console.error('API request failed:', error);
      });
  }
  
// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'triggerAPIRequest') {
      // Trigger the API request function with the provided user_info
      flip_user_status(true, request.user_info);
    }
  });



//   // Example: Call your API function
//   flip_user_status(true, {email,password});