console.log("profile.js page");
chrome.runtime.sendMessage({ action: "userInfo" }, function (response) {
  console.log("user info response received ....");
  console.log(response);

  if (response.status == "success") {
    const userInfo = response.data.profile;
    /*
planName
planNumberOfAssignmentsLimit
planNumberOfExamsLimit
planNumberOfQuestionsLimit
remaining_assignments
remaining_exams
remaining_questions
subscriptionEndDate
subscriptionStartDate
subscriptionStatus
userBio
userEmail
userFirstName
userImg
userJoinDate
userLastName
*/
    const userNameElement = document.querySelector("#username");
    const userEmailElement = document.querySelector("#email");
    const planType = document.querySelector("#planType");

    const examsLimit = document.querySelector("#examsLimit");
    const examsRemain = document.querySelector("#examsRemain");

    const assignmentsLimit = document.querySelector("#assignmentsLimit");
    const assignmentsRemain = document.querySelector("#assignmentsRemain");

    const questionsLimit = document.querySelector("#questionsLimit");
    const questionsRemain = document.querySelector("#questionsRemain");

    const subscriptionEnd = document.querySelector("#subscriptionEnd");
    const subscriptionStart = document.querySelector("#subscriptionStart");
    const subscriptionStatus = document.querySelector("#subscriptionStatus");
    // Add more elements as needed

    // Update the content
    userNameElement.textContent = `${userInfo.userFirstName} ${userInfo.userLastName}`;
    userEmailElement.textContent = userInfo.userEmail;

    planType.textContent = userInfo.planName;

    examsLimit.textContent = userInfo.planNumberOfExamsLimit;
    examsRemain.textContent = userInfo.remaining_exams;

    assignmentsLimit.textContent = userInfo.planNumberOfAssignmentsLimit;
    assignmentsRemain.textContent = userInfo.remaining_assignments;

    questionsLimit.textContent = userInfo.planNumberOfQuestionsLimit;
    questionsRemain.textContent = userInfo.remaining_questions;

    subscriptionEnd.textContent = userInfo.subscriptionEndDate;
    subscriptionStart.textContent = userInfo.subscriptionStartDate;
    subscriptionStatus.innerHTML = ` <strong>Subscription Status: </strong>
    <span class='badge ${
      userInfo.subscriptionStatus == "active" ? "bg-success" : "bg-danger"
    }' 
      >${userInfo.subscriptionStatus}
    </span>`;
    //
  } else {
    let errorDiv = document.getElementById("error");
    errorDiv.style.display = "block";
    errorDiv.innerHTML = response.data.title;
  }
});

document.getElementById("subscriptionsLog").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "navigateToSubscriptionsLogPage" }, function (response) {

    window.location.href = "./subscriptionsLog.html";


  });
});
document.getElementById("navigateToProfilePage").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "navigateToProfilePage" }, function (response) {

    window.location.href = "./profile.html";


  });
});
document.getElementById("navigateToSettingPage").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "navigateToSettingPage" }, function (response) {

    window.location.href = "./setting.html";


  });
});

document.getElementById("signout").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "signout" }, function (response) {
    console.log("profile page, logout response");
    console.log(response);
    if (response.status == "success") {
      window.location.href = "./signin.html";
    }
  });
});

document
  .getElementById("subscriptionsLog")
  .addEventListener("click", function () {
    chrome.runtime.sendMessage(
      { action: "subscriptionsLog" },
      function (response) {
        console.log("profile page, subscriptions Log response");
        console.log(response);
      }
    );
  });
