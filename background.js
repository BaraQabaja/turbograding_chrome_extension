// import { URL } from "./server_url";

const URL = "https://turbograding-api-ae8e0a55a59d.herokuapp.com";

//Function to detect the part of URL and perform action
// function checkURL(url, tabId) {
//   // Check if URL contains 'example.com'
//   if (url.includes('/d2l/le/activities/iterator')) {

//     // Create turboGrading for assignments page
//     //createButton("assignment");
//     chrome.tabs.executeScript(tabId, { file: 'turbograding.js' });
//   } else if (url.includes('/quizzing/')) {
//     // Create turboGrading for quiz page

//     //For Manifest V3:
//     /*chrome.scripting.executeScript({
//       target: { tabId: tabId },
//       files: ['turbograding.js']
//     });*/

//     chrome.tabs.executeScript(tabId, { file: 'turbograding.js' });

//     // createButton("quiz");

//   }
// }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
  if (request.action === "signup") {
    // Replace 'https://www.yourwebsite.com/signup' with the actual URL of your signup page
    chrome.tabs.create({ url: "http://localhost:3000/register-1" });
  }
  if (request.action === "forgetpassword") {
    // Replace 'https://www.yourwebsite.com/signup' with the actual URL of your signup page
    chrome.tabs.create({ url: "http://localhost:3000/forget-pass" });
  }


  if (request.action === 'apiResponse') {
    console.log('Background received API response:', request.data);
    // You can process the API response here or send it to the popup script
    console.log("hiiiiii ",request.data)
    console.log(request.data)

    sendResponse({ message: 'API response received in background!' });
  }
  // if (request.action === "signin") {
    
  //     console.log("request.payload ===> ", request.payload);
  //     flip_user_status(true, request.payload).then((res)=>{
  //       console.log("The res is ===> ");

  //       console.log(res);
  //       console.log(sendResponse({
  //         success: true,
  //         message: "success",
  //         userData: {},
  //       }))
       

  //       if(res.status=='success'){
  //          chrome.browserAction.setPopup({ popup: "profile.html" });

  //       }
  

  //     // Send the response to the profile script
  //     // sendResponse({
  //     //   message: res,
  //     //   userStatus: 'userStatus'
  //     // })
  //     }) .catch((error) => {
  //       console.error(error);
  //       sendResponse({
  //         success: false,
  //         message: "error",
  //         error: error.message,
  //       });

  //     });
   
  //     sendResponse({
  //       success: false,
  //       message: "error",
  //       error: error.message,
  //     });
  //     return true
  // }



     else if (request.action === "logout") {
    flip_user_status(false, null)
      .then((res) => sendResponse(res))
      .catch((err) => console.log(err));
    return true;
  }
  // else if (request.action === 'userStatus') {
  //   is_user_signed_in()
  //     .then(res => {
  //       sendResponse({
  //         message: 'success',
  //         userStatus: 'userStatus',
  //         token: res.token,
  //         user_info: res.user_info
  //       });
  //     })
  //     .catch(err => console.log(err));
  //   return true;
  // }

  // sendBodyToExtension();

});

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {});

// const flip_user_status=(signIn, user_info)=>{
//   if (signIn) {
//     return fetch(
//       `https://turbograding-api-ae8e0a55a59d.herokuapp.com/api/auth/login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: user_info.loginEmail,
//           password: user_info.loginPassword,
//         }),
//       }
//     )
//       .then((response) => response.json())
//       .then((res) => {
//         if (!res.token) {
//           resolve("fail");
//         } else {
//           const token = res.token;
//           // const status=res.status;
//           // const userInfo=res.userInfo;
         
//           return new Promise((resolve, reject) => {
//             chrome.storage.local.set(
//               { token: token, userStatus: signIn, user_info: user_info },
//               function (response) {
//                 if (chrome.runtime.lastError) {
//                   reject(chrome.runtime.lastError);
//                 } else {
//                   console.log("Token is stored in local storage");
//                   // user_signed_in = signIn;
                 
//                   resolve(res);
//                 }

//                 // if (chrome.runtime.lastError) resolve('fail');
//               }
//             );
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   } else if (!signIn) {
//     // fetch the logout route
//     return new Promise((resolve) => {
//       chrome.storage.local.get(
//         ["token", "userStatus", "user_info"],
//         function (response) {
//           if (chrome.runtime.lastError) resolve("fail");

//           if (response.userStatus === undefined) resolve("fail");

//           fetch(
//             `https://turbograding-api-ae8e0a55a59d.herokuapp.com/api/auth/logout`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 token: response.token,
//               }),
//             }
//           )
//             .then((response) => response.json())
//             .then((res) => {
//               console.log("USER RESPONSE ===> ", res);
//               if (res.status !== 200) resolve("fail");

//               chrome.storage.local.set(
//                 { token: "", userStatus: signIn, user_info: {} },
//                 function (response) {
//                   if (chrome.runtime.lastError) resolve("fail");

//                   user_signed_in = signIn;
//                   resolve("success");
//                 }
//               );
//             })
//             .catch((err) => console.log(err));
//         }
//       );
//     });
//   }
// }

function is_user_signed_in() {
  return new Promise((resolve) => {
    chrome.storage.local.get(
      ["token", "userStatus", "user_info"],
      function (response) {
        if (chrome.runtime.lastError)
          resolve({
            userStatus: false,
            user_info: {},
            token: "",
          });
        resolve(
          response.userStatus === undefined
            ? { userStatus: false, user_info: {}, token: "" }
            : {
                userStatus: response.userStatus,
                user_info: response.user_info,
                token: response.token,
              }
        );
      }
    );
  });
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === 'signin') {
//     flip_user_status(true, request.payload)
//       .then(res => {
//         // window.close();

//         chrome.browserAction.setPopup({ popup: 'profile.html' });

//         console.log("The res is:" + res);
//         sendResponse({
//           message: res,
//           userStatus: 'userStatus'
//         })
//       })
//       //  .then((res) => { sendResponse(res); })
//       .catch(err => console.log(err));
//     return true;
//   } else if (request.message === 'logout') {
//     flip_user_status(false, null)
//       .then(res => sendResponse(res))
//       .catch(err => console.log(err));
//     return true;
//   } else if (request.message === 'userStatus') {
//     is_user_signed_in()
//       .then(res => {
//         sendResponse({
//           message: 'success',
//           userStatus: 'userStatus',
//           token: res.token,
//           user_info: res.user_info
//         });
//       })
//       .catch(err => console.log(err));
//     return true;
//   }

//   sendBodyToExtension();

// });

// Function to call when the user activates (switches to) a tab
function onTabActivated(activeInfo) {
  console.log("Activated Tab:", activeInfo.tabId);
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log("Activated Tab URL:", tab.url);
    // Call the function
    // checkURL(tab.url, activeInfo.tabId);
  });
}

// Function to call when the content of a tab is updated
function onTabUpdated(tabId, changeInfo, tab) {
  // Checking if the tab is fully loaded
  if (changeInfo.status === "complete") {
    console.log("Updated Tab:", tabId);

    // Call the function
    // checkURL(tab.url, tabId);
  }
}

// Listen for when a tab is activated (switched to)
chrome.tabs.onActivated.addListener(onTabActivated);

// Listen for when the content of a tab is updated
chrome.tabs.onUpdated.addListener(onTabUpdated);
