// send message to background.js to forward user to registration page in main website
document.getElementById("signup").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "signup" });
});
// send message to background.js to forward user to forget pass page in main website
document
  .getElementById("forgetpassword")
  .addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "forgetpassword" });
  });

document.getElementById("signin").addEventListener("click", function (event) {
  event.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;
  console.log("login clicked", loginEmail, loginPassword);

  if (loginEmail && loginPassword) {
    //Send a message to the background script to trigger the API request
    chrome.runtime.sendMessage(
      {
        action: "signin",
        payload: {
          loginEmail: loginEmail,
          loginPassword: loginPassword,
        },
      },
      function (response) {
        console.log('response received ....');
        console.log(response.status);
        if(response.status=='success'){
            window.location.href = "./profile.html";

        }
        else if (response.status == "fail" || response.status == "error") {
           
            let errorDiv = document.getElementById("error");
            errorDiv.style.display="block"
            errorDiv.innerHTML = response.data.title;
      
        }
        
      }
    );
  }else{
    let errorDiv = document.getElementById("error");
            errorDiv.style.display="block"
            errorDiv.innerHTML = 'Please enter password and email.';
  }
});
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("sign in js");

//   document.getElementById("signin").addEventListener("click", function () {
//     const loginEmail = document.getElementById("loginEmail").value;
//     const loginPassword = document.getElementById("loginPassword").value;
//     console.log("login clicked",loginEmail,loginPassword)

//     if (loginEmail && loginPassword) {
//       //Send a message to the background script to trigger the API request
//       chrome.runtime.sendMessage(
//         {
//           action: "signin",
//           payload: {
//             loginEmail: loginEmail,
//             loginPassword: loginPassword,
//           },
//         },
//         function (response) {
//           console.log("sign in success");
//           let myDiv = document.querySelector("#myDiv");
//           myDiv.innerHTML = "<p>byeee</p>";
//         }
//       );
//     }
//   });
//});

/**

       document.querySelector("#loginEmail").placeholder = "Enter an email.";
        document.querySelector("#loginPassword").placeholder =
          "Enter a password.";
        document.querySelector("#loginEmail").style.backgroundColor = "red";
        document.querySelector("#loginPassword").style.backgroundColor = "red";
        document
          .querySelector("#loginEmail")
          .classList.add("white_placeholder");
        document
          .querySelector("#loginPassword")
          .classList.add("white_placeholder");
       */
