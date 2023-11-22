
document.addEventListener('DOMContentLoaded', function () {
// console.log("ext loaded test")
console.log("i am in popup.js")
chrome.runtime.sendMessage({ action: 'setPopup', popup: 'signin.html' });


});