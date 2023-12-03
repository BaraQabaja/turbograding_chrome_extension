document.addEventListener("DOMContentLoaded", function () {
  const updateUsernameButton = document.getElementById("updateUsernameButton");
  const updateUsernameForm = document.getElementById("updateUsernameForm");
  const cancelUpdateUsername = document.getElementById("cancelUpdateUsername");
  const updateUsernameMessage = document.getElementById(
    "updateUsernameMessage"
  );

  const updatePasswordButton = document.getElementById("updatePasswordButton");
  const updatePasswordForm = document.getElementById("updatePasswordForm");
  const cancelUpdatePassword = document.getElementById("cancelUpdatePassword");
  const updatePasswordMessage = document.getElementById(
    "updatePasswordMessage"
  );

  updateUsernameButton.addEventListener("click", function () {
    updateUsernameForm.style.display = "block";
    updatePasswordForm.style.display = "none";
  });

  cancelUpdateUsername.addEventListener("click", function () {
    updateUsernameForm.style.display = "none";
  });

  updatePasswordButton.addEventListener("click", function () {
    updatePasswordForm.style.display = "block";
    updateUsernameForm.style.display = "none";
  });

  cancelUpdatePassword.addEventListener("click", function () {
    updatePasswordForm.style.display = "none";
  });

  updateUsernameForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;

    if (firstName.trim() !== "" && lastName.trim() !== "") {
      //Sending a message to the background script to trigger the API request
      chrome.runtime.sendMessage(
        {
          action: "updateUsername",
          payload: {
            firstName: firstName,
            lastName: lastName,
          },
        },
        function (response) {
          console.log("update username response received (setting.js)....");
          console.log(response);
          if (response.status == "success") {
            updateUsernameMessage.className = "alert alert-success";
            updateUsernameMessage.textContent = response.data.title;
            setTimeout(() => {
                updateUsernameMessage.className = "";
            updateUsernameMessage.textContent = "";
            }, 8000);

          } else if (response.status == "fail" || response.status == "error") {
            updateUsernameMessage.className = "alert alert-danger";
            updateUsernameMessage.textContent = response.data.title;
            setTimeout(() => {
                updateUsernameMessage.className = "";
            updateUsernameMessage.textContent = "";
            }, 8000);
          }
        }
      );
    } else {
      updateUsernameMessage.className = "alert alert-danger";
      updateUsernameMessage.textContent =
        "Please fill in both first and last name.";
        setTimeout(() => {
            updateUsernameMessage.className = "";
            updateUsernameMessage.textContent =
              "";
        }, 8000);
    }

    //   updateUsernameMessage.style.display = "block";
    //   updateUsernameMessage.textContent = "Username updated successfully.";
  });

  updatePasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.trim() !== "" && confirmPassword.trim() !== "") {
      //Sending a message to the background script to trigger the API request
      chrome.runtime.sendMessage(
        {
          action: "updatePassword",
          payload: {
            password: newPassword,
            confirmPassword: confirmPassword,
          },
        },
        function (response) {
          console.log("update password response received (setting.js)....");
          console.log(response);
          if (response.status == "success") {
            updatePasswordMessage.className = "alert alert-success";
            updatePasswordMessage.textContent = response.data.title;
            setTimeout(() => {
                updatePasswordMessage.className = "";
            updatePasswordMessage.textContent = "";
            }, 8000);

          } else if (response.status == "fail" || response.status == "error") {
            updatePasswordMessage.className = "alert alert-danger";
            updatePasswordMessage.textContent = response.data.title;
            setTimeout(() => {
                updatePasswordMessage.className = "";
            updatePasswordMessage.textContent = "";
            }, 8000);
          }
        }
      );
    } else {
      updatePasswordMessage.className = "alert alert-danger";
      updatePasswordMessage.textContent =
        "Please fill in both new and confirmation password.";
        setTimeout(() => {
            updatePasswordMessage.className = "";
            updatePasswordMessage.textContent =
              "";
        }, 8000);
    }

  });

  //Navigation
  //navigate to setting page
  document
    .getElementById("navigateToSettingPage")
    .addEventListener("click", function () {
      chrome.runtime.sendMessage(
        { action: "navigateToSettingPage" },
        function (response) {
          window.location.href = "./setting.html";
        }
      );
    });

  //navigate to profile page
  document
    .getElementById("navigateToProfilePage")
    .addEventListener("click", function () {
      chrome.runtime.sendMessage(
        { action: "navigateToProfilePage" },
        function (response) {
          window.location.href = "./profile.html";
        }
      );
    });
});
