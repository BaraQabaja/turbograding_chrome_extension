// import { URL } from "./server_url";
let user_signed_in = false;

const URL_Production = "https://turbograding-api-ae8e0a55a59d.herokuapp.com";

//Function to detect the part of URL and perform action
function checkURL(url, tabId) {
  // Check if URL contains 'example.com'
  console.log(" i am in checkURL, the url is ==> ", url);
  if (url.includes("/d2l/le/activities/iterator")) {
    // Create turboGrading for assignments page
    //createButton("assignment");
    chrome.tabs.executeScript(tabId, { file: "turbograding.js" });
  } else if (url.includes("/Grade")) {
    // Create turboGrading for quiz page

    //For Manifest V3:
    /*chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['turbograding.js']
    });*/
    console.log("Go to turbograding.js");
    chrome.tabs.executeScript(tabId, { file: "./turbograding.js" });

    // createButton("quiz");
  }
}

//! APIs handling functions

//Login Function
const flip_user_status = (signIn, user_info) => {
  if (signIn) {
    return fetch(`${URL_Production}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user_info.loginEmail,
        password: user_info.loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        return new Promise((resolve) => {
          resolve(res);

          // chrome.storage.local.set({ token: res.token });
        });
      })
      .catch((err) => console.log(err));
  }
};

//Profile Info (user info) Function
const get_user_info = () => {
  // Wrap the fetch operation in a promise
  return new Promise((resolve, reject) => {
    // Retrieve the token from local storage
    chrome.storage.local.get("token", function (result) {
      const storedToken = result.token;
      if (!storedToken) {
        // Handle the case where the token is not found
        reject("No token stored");
        return;
      }

      // Make the fetch request with the retrieved token
      fetch(`${URL_Production}/api/profile/get-personal-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//
const sendUserInfo = (data) => {
  console.log("send user info function");
  console.log("sendUserInfo received info ===> ");
  console.log(data);

  // Wrap the fetch operation in a promise
  return new Promise((resolve, reject) => {
    // Retrieve the token from local storage
    chrome.storage.local.get("token", function (result) {
      const storedToken = result.token;
      if (!storedToken) {
        // Handle the case where the token is not found
        reject("No token stored");
        return;
      }

      // Make the fetch request with the retrieved token
      fetch(`${URL_Production}/api/user/grading-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//Signout Function
const signout = () => {
  // Wrap the fetch operation in a promise
  return new Promise((resolve, reject) => {
    // Retrieve the token from local storage
    chrome.storage.local.get("token", function (result) {
      const storedToken = result.token;
      if (!storedToken) {
        // Handle the case where the token is not found
        reject("No token stored");
        return;
      }

      // Make the fetch request with the retrieved token
      fetch(`${URL_Production}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//User subscriptions Function
const subscriptionsLog = () => {
  // Wrap the fetch operation in a promise
  return new Promise((resolve, reject) => {
    // Retrieve the token from local storage
    chrome.storage.local.get("token", function (result) {
      const storedToken = result.token;
      if (!storedToken) {
        // Handle the case where the token is not found
        reject("No token stored");
        return;
      }

      // Make the fetch request with the retrieved token
      fetch(`${URL_Production}/api/profile/get-user-subscriptions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//Update username Function
const updateUsername = (username) => {
  // Wrap the fetch operation in a promise
  return new Promise((resolve, reject) => {
    // Retrieve the token from local storage
    chrome.storage.local.get("token", function (result) {
      const storedToken = result.token;
      if (!storedToken) {
        // Handle the case where the token is not found
        reject("No token stored");
        return;
      }
      console.log("update username payload");
      console.log(username);

      // Make the fetch request with the retrieved token
      fetch(`${URL_Production}/api/profile/update-username`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          firstName: username.firstName,
          lastName: username.lastName,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

//Update password Function
const updatePassword = (passwordInputs) => {
  // Wrap the fetch operation in a promise
  return new Promise((resolve, reject) => {
    // Retrieve the token from local storage
    chrome.storage.local.get("token", function (result) {
      const storedToken = result.token;
      if (!storedToken) {
        // Handle the case where the token is not found
        reject("No token stored");
        return;
      }
      console.log("update username payload");
      console.log(passwordInputs);

      // Make the fetch request with the retrieved token
      fetch(`${URL_Production}/api/profile/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          password: passwordInputs.password,
          confirmPassword: passwordInputs.confirmPassword,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "signup") {
    // Replace 'https://www.yourwebsite.com/signup' with the actual URL of your signup page
    chrome.tabs.create({ url: "http://localhost:3000/register-1" });
  }
  if (request.action === "forgetpassword") {
    // Replace 'https://www.yourwebsite.com/signup' with the actual URL of your signup page
    chrome.tabs.create({ url: "http://localhost:3000/forget-pass" });
  }

  if (request.action === "signin") {
    console.log("request.payload ===> ", request.payload);
    flip_user_status(true, request.payload)
      .then((res) => {
        if (res.status == "success") {
          chrome.storage.local.set({ token: res.token }, function () {
            if (chrome.runtime.lastError) {
              console.error(
                "Error setting local storage:",
                chrome.runtime.lastError
              );
            } else {
              console.log("Token successfully set in local storage", res.token);
              chrome.browserAction.setPopup({ popup: "./profile.html" });
            }
          });
        }
        console.log("response in background ===> ");

        console.log(res);
        return sendResponse(res);
      })
      .catch((error) => console.error(error));

    return true;
  } else if (request.action === "signout") {
    signout()
      .then((res) => {
        if (res.status == "success") {
          chrome.storage.local.remove("token", function () {
            if (chrome.runtime.lastError) {
              console.error(
                "Error removing token from local storage:",
                chrome.runtime.lastError
              );
            } else {
              console.log("Token removed from local storage");
              chrome.browserAction.setPopup({ popup: "./signin.html" });
            }
          });
        } else if (
          res.data.title == "you recently logout. please login again."
        ) {
          chrome.browserAction.setPopup({ popup: "./signin.html" });
        }
        return sendResponse(res);
      })
      .catch((err) => console.log(err));
    return true;
  } else if (request.action === "subscriptionsLog") {
    subscriptionsLog()
      .then((res) => {
        if (res.status == "success") {
          chrome.browserAction.setPopup({ popup: "./subscriptionsLog.html" });
          console.log("subscriptions log (background) ===> ", res);
        }
        return sendResponse(res);
      })
      .catch((err) => console.log(err));
    return true;
  } else if (request.action === "userInfo") {
    get_user_info()
      .then((res) => {
        console.log("response of user info in background ===> ");

        console.log(res);
        return sendResponse(res);
      })
      .catch((error) => console.error(error));

    return true;
  } else if (request.action === "sendUserInfo") {
    console.log("send user info to back-end");
    console.log("payload received ===> ", request.payload);
    sendUserInfo(request.payload)
      .then((res) => {
        console.log("response of send user info in background ===> ");

        console.log(res);
        return sendResponse(res);
      })
      .catch((error) => console.error(error));

    return true;
  }
  //! Navigation Routes
  else if (request.action == "navigateToSubscriptionsLogPage") {
    chrome.browserAction.setPopup({ popup: "./subscriptionsLog.html" });
  } else if (request.action == "navigateToProfilePage") {
    chrome.browserAction.setPopup({ popup: "./profile.html" });
  } else if (request.action == "navigateToSettingPage") {
    chrome.browserAction.setPopup({ popup: "./setting.html" });
  } else if (request.action == "updateUsername") {
    updateUsername(request.payload)
      .then((res) => {
        console.log("update username response (backend)....");
        console.log(res);

        return sendResponse(res);
      })
      .catch((error) => console.error(error));

    return true;
  } else if (request.action == "updatePassword") {
    console.log("update password (background)...");
    console.log(request.payload);

    updatePassword(request.payload)
      .then((res) => {
        console.log("update password response (backend)....");
        console.log(res);

        return sendResponse(res);
      })
      .catch((error) => console.error(error));

    return true;
  } else if (request.action == "subscriptionsLog") {
    subscriptionsLog()
      .then((res) => {
        return sendResponse(res);
      })
      .catch((error) => console.error(error));

    return true;
  }
  sendBodyToExtension();
});

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
    checkURL(tab.url, activeInfo.tabId);
  });
}

// Function to call when the content of a tab is updated
function onTabUpdated(tabId, changeInfo, tab) {
  // Checking if the tab is fully loaded
  if (changeInfo.status === "complete") {
    console.log("Updated Tab:", tabId);

    // Call the function
    checkURL(tab.url, tabId);
  }
}

// Listen for when a tab is activated (switched to)
chrome.tabs.onActivated.addListener(onTabActivated);

// Listen for when the content of a tab is updated
chrome.tabs.onUpdated.addListener(onTabUpdated);
