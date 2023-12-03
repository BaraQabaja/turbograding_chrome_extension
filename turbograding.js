// const URL_Production = "https://turbograding-api-ae8e0a55a59d.herokuapp.com";
//FUNCTION TO ESCAPE TEXT FROM HTML TAGS
// document.addEventListener("DOMContentLoaded", function () {
  let buttonClicked = false;

function escapeHtml(html) {
  const element = document.createElement("div");
  element.textContent = html;
  return element.innerHTML;
}

function is_user_signed_in() {
  return new Promise((resolve,reject) => {
    chrome.storage.local.get("token", function (response) {
        const storedToken= response.token;
        if (!storedToken ) {
            // Handle the case where the token is not found
            reject("No token stored");
            return;
          }
    
          resolve(storedToken);

    });
  });
}

function sendQuestionToTurboGrading(data) {
    console.log("sendQuestionToTurboGrading data input ===> ",data)
    console.log("message sent background")
    chrome.storage.local.get("token", function (result) {
        const storedToken = result.token;
        if (!storedToken) {
          // Handle the case where the token is not found
          reject("No token stored");
          return;
        }
  console.log("stored token in turbograding.js ===> ")
  console.log(storedToken)
console.log("sent data to background ===> ")
console.log(data)

      });
    chrome.runtime.sendMessage({ action: "sendUserInfo",payload:data }, function (response) 
    {

      console.log("response in turbograding.js ===> ", response)

    })
//   is_user_signed_in()
//     .then((res) => {
//         alert(res.storedToken)
//       const token = res.storedToken;

//       fetch(`https://turbograding-api-ae8e0a55a59d.herokuapp.com/api/user/grading-exam`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           data: {
//             course_code:data.course_code,
//             course_name:data.course_name,
//             class_code:data.class_code,
//             university_name:data.university_name,
//             exam_name:data.exam_name,
//             semester:data.semester,
//             studentFirstName:data.studentFirstName,
//             studentLastName:data.studentLastName,
//             studentId:data.studentId,

//           },
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
          // var feedback = "";
          // console.log("DATA");
          // console.log(data);
          // data.map((obj, i) => {
          //     if (obj) {
          //         console.log("obj");
          //         console.log(obj);
          //         var inputElement = document.getElementsByClassName("d2l-input-number-wc");
          //         inputElement[obj.id].setAttribute('value', obj.score);
          //         inputElement[obj.id].nextElementSibling.setAttribute('value', obj.score);
          //         feedback += 'Question ID: ' + obj.id + '<br>' +
          //             'Explanation: ' + obj.explanation + '<br><br>';
          //         console.log("Done!!!!.....");
          //     }
          // });
          // var elements2 = document.querySelectorAll('.d2l-hpg-opener');
          // elements2.forEach(function (element2) {
          //     element2.click();
          // });
          // var parentElement = document.querySelector('.d2l-editable');
          // if (parentElement) {
          //     var firstElement = parentElement.querySelectorAll('d2l-html-block')[0];
          //     firstElement.setAttribute('html', escapeHtml(feedback));
          // }
          // document.getElementById("aComment_data").value = escapeHtml(feedback);
          // // RESET THE TOTAL MARK VALUE
          // const element = document.querySelector('[title="Clear the final score and recalculate"]');
          // // Trigger a click event on the element
          // if (element) {
          //     element.click();
          // }
          // //*****AUTO MODE******
          // const saveButton = document.getElementById('z_a');
          // const nextButton = document.querySelector("#d2l_form > div > d2l-navigation-immersive > d2l-navigation-iterator").shadowRoot.querySelector("d2l-navigation-button-icon:nth-child(3)").shadowRoot.querySelector("button");
          // if (saveButton) {
          //    //******** PLEASE UNCOMMENT THE NEXT LINE TO MAKE THE EXTENTION SAVE THE GRADE AUTO
          //     // saveButton.click();
          //     // Wait for a specified amount of time (e.g., 2 seconds) before clicking the next button
          //     setTimeout(() => {
          //        // alert("next")
          //         if (nextButton) {
          //             //******** PLEASE UNCOMMENT THE NEXT LINE TO MAKE THE EXTENTION SAVE THE GRADE AUTO
          //             //nextButton.click();
          //         }
          //     }, 3000); // 2000 milliseconds = 2 seconds
          // }
   //     });
      // .catch(error => console.error(error));
 //   })
  //  .catch((err) => console.log(err));
}

function sendBodyToExtension() {
  // console.log("Start:");

  // const bodyContent = document.body.innerHTML;
  // const tempElement = document.createElement('div');
  // tempElement.innerHTML = bodyContent;

  // const bodyContentImages = tempElement.querySelectorAll('img');
  // bodyContentImages.forEach(image => {
  //     image.remove();
  // });
  // const modifiedBodyContent = tempElement.innerHTML;

  console.log("The page has been submitted");

  // Assuming you have access to the HTML element containing the data
  const titleElement = document.querySelector("title");
  const exam_header_Element = document.querySelector("h1.d2l-body-standard");
  const titleAttributeValue = exam_header_Element.getAttribute("title");
  //   const student_content = document.querySelector("td.d_tl.d_tm.d_tn");

  // Check if the element exists
  if (titleElement && titleAttributeValue) {
    // Extract the text content of the <title> element
    const titleText = titleElement.textContent;
    // const student_info = student_content.textContent;
    const student_info = "StudentFirstName StudentLastName (Id: 8884337)";
    const words = student_info.split(" ");
    const studentFirstName = words[0];
    const studentLastName = words[1];
    const studentId = /\(Id: (\d+)\)/.exec(student_info);
    // alert(titleAttributeValue)

    // Use regular expressions to extract the desired part
    const course_code = /Grade Attempt - ([A-Za-z0-9-]+)-\d+/i.exec(titleText);
    const semester =
      /Grade Attempt - [A-Za-z0-9-]+-([A-Za-z0-9-]+)-[A-Za-z0-9-]+-([^]+)$/i.exec(
        titleText
      );
    const course_name =
      /Grade Attempt - [A-Za-z0-9-]+-[A-Za-z0-9-]+-(.+)- [A-Za-z0-9-]+/i.exec(
        titleText
      );
    const class_code =
      /Grade Attempt - [A-Za-z0-9-]+-[A-Za-z0-9-]+-([A-Za-z0-9-]+)-([^]+)$/i.exec(
        titleText
      );
    const university_name = /Grade Attempt - [^]+-[^]+-[^]+-[^]+-([^]+)/i.exec(
      titleText
    );
    const exam_name = /([A-Za-z0-9\s]+) Exam/i.exec(titleAttributeValue);

    // Check if a match is found
    if (
      course_code &&
      course_code.length > 1 &&
      semester &&
      semester.length > 1 &&
      course_name &&
      course_name.length > 1 &&
      class_code &&
      class_code.length > 1 &&
      university_name &&
      university_name.length > 1 &&
      exam_name &&
      exam_name.length > 1 &&
      studentId &&
      studentId.length > 1
    ) {
      // The desired part is captured in the first capturing group
      const course_code_value = course_code[1];
      const course_name_value = course_name[1];

      const class_code_value = class_code[1];

      const university_name_value = university_name[1];

      const exam_name_value = exam_name[1];

      const semester_value = semester[1];
const studentId_value=studentId[1]
      //   alert(course_code_value); // Output: P2220
      //   alert(semester_value); // Output: F23
      //   alert(course_name_value); // Output: Database: SQL
      //   alert(class_code_value); // Output: Sec3
      //   alert(university_name_value); // Output: hytham...
      //   alert(exam_name_value); // Output: midterm
      //   alert(studentFirstName); // Output: studentFirstName...
      //   alert(studentLastName); // Output: studentLastName
      //   alert(studentId); // Output: id
console.log("message sent to sendQuest funciton")
      sendQuestionToTurboGrading({
        course_code: course_code_value,
        course_name: course_name_value,
        class_code: class_code_value,
        university_name: university_name_value,
        exam_name: exam_name_value,
        semester: semester_value,
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
        studentId: studentId_value,
      });
    } else {
      alert("Match not found");
    }
  }

  // const course_code=document.getElementById

  //   sendQuestionToTurboGrading(modifiedBodyContent);

  console.log("The End");
}

function createButton(assessmentType) {
  alert("assessmentType");
  if (assessmentType == "assignment") {
    var firstChildId = document.body.children[0].id;
    console.log(firstChildId);
    var scriptElement = document.createElement("script");
    scriptElement.textContent = `
       
      window.onload = function() {
        var downloadLinksArray=[];
        // Assignment Button
      const button = $("<d2l-button>").text("Run TurboGrading!");
      button.addClass("d2l-label-text");
      button.on("click", function () {
        console.log('Button clicked');
       
         var dataLinks;
       downloadLinksArray.map(function(e) {
          if(e.dataExtension=='py'){
            dataLinks= e;
          }else if(e.dataExtension=='pdf'){
            dataLinks= e;
            console.log('pdf');
          }           
      });
      console.log(dataLinks);
        // Fetch the file from the URL
        fetch(dataLinks.url)
          .then(response => response.blob())
          .then(blob => {
            // Create a FormData instance to hold the file
            let formData = new FormData();
            formData.append('file', blob, 'myfile'+dataLinks.dataExtension);
          
            // Send the file to the API
            fetch('http://localhost:8080/api/assignment', {
              method: 'POST',
              body: formData
            })
            .then(response => response.json())
            .then(data => {
            
  
              data.map((response, i) => {
   
               document.querySelector("#${firstChildId}").shadowRoot.querySelector("d2l-consistent-evaluation-page").shadowRoot.querySelector("#evaluation-template > div:nth-child(3) > consistent-evaluation-right-panel").shadowRoot.querySelector("div > consistent-evaluation-right-panel-evaluation").shadowRoot.querySelector("div > d2l-consistent-evaluation-right-panel-grade-result").shadowRoot.querySelector("d2l-consistent-evaluation-right-panel-block > d2l-labs-d2l-grade-result-presentational").shadowRoot.querySelector("div.d2l-grade-result-presentational-container > d2l-grade-result-numeric-score").shadowRoot.querySelector("#grade-input").setAttribute('value', response.score);
   
   
          
  
  
               document.querySelector("#${firstChildId}").shadowRoot.querySelector("d2l-consistent-evaluation-page").shadowRoot.querySelector("#evaluation-template > div:nth-child(3) > consistent-evaluation-right-panel").shadowRoot.querySelector("div > consistent-evaluation-right-panel-evaluation").shadowRoot.querySelector("div > d2l-consistent-evaluation-right-panel-feedback").shadowRoot.querySelector("d2l-consistent-evaluation-right-panel-block > d2l-htmleditor").setAttribute('html', response.explanation);
  
  
             if (response) {
                console.log('File uploaded successfully');
              } else {
                console.error('File upload failed:', response.statusText);
              }
  
            });  
            })
            .catch(error => console.error('Error:', error));
          })
          .catch(error => console.error('Error:', error));
  
          
  
  
  
   
       
      });
        setTimeout(function() {
                var element1 = document.querySelector("#${firstChildId}");
              if (element1 && element1.shadowRoot) {
                  var element2 = element1.shadowRoot.querySelector("d2l-consistent-evaluation-page");
                  if (element2 && element2.shadowRoot) {
                      var element3 = element2.shadowRoot.querySelector("#evaluation-template > div:nth-child(4) > d2l-consistent-evaluation-footer");
                      if (element3 && element3.shadowRoot) {
                          var targetElement = element3.shadowRoot.querySelector("#footer-container");
                          targetElement.prepend(button[0]);
  
                        
  
                       let downloadLinnks=  element2.shadowRoot.querySelector("#evaluation-template > div.d2l-consistent-evaluation-page-primary-slot > d2l-consistent-evaluation-left-panel").shadowRoot.querySelector("d2l-consistent-evaluation-evidence-assignment").shadowRoot.querySelector("d2l-consistent-evaluation-assignments-submissions-page").shadowRoot.querySelector("div.d2l-consistent-evaluation-submission-list-view > d2l-list > d2l-consistent-evaluation-assignments-submission-item").shadowRoot.querySelectorAll('d2l-menu-item[text="download"]');
   
                      downloadLinksArray = Array.from(downloadLinnks).map(function(element) {
                        return {
                          url:element.getAttribute('data-href'),
                          dataExtension:element.getAttribute('data-extension')
                        };
                    });
                    console.log(downloadLinksArray);
  
  
                      } else {
                          //console.log('No element or shadow root found for d2l-consistent-evaluation-footer');
                      }
                  } else {
                     // console.log('No element or shadow root found for d2l-consistent-evaluation-page');
                  }
              } else {
                 // console.log('No element or shadow root found for #${firstChildId}');
              }
       }, 4000); // wait for 3 seconds
     };
    `;
    (document.head || document.documentElement).appendChild(scriptElement);
    // scriptElement.remove();
  } else if (assessmentType == "quiz") {
    // Quiz Button
    console.log("Quiz Button Created!");
    if (!document.getElementById("turboGradingButton")) {
      const button = document.createElement("button");
      button.id = "turboGradingButton";
      button.textContent = "Run the TurboGrading!";
      button.classList.add("d2l-button");

      // Append the button to your desired location
      // document.body.appendChild(button);
      button.addEventListener("click", function () {
        console.log("Button clicked");
        sendBodyToExtension();
      });
      let e = document.querySelector("div.float_r");

      if (e) e.appendChild(button);
    } else {
      document
        .getElementById("turboGradingButton")
        .addEventListener("click", function () {
          sendBodyToExtension();
        });
    }
  }
}

createButton("quiz");
//})