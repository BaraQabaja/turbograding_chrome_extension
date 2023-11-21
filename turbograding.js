
//FUNCTION TO ESCAPE TEXT FROM HTML TAGS 
function escapeHtml(html) {
    const element = document.createElement('div');
    element.textContent = html;
    return element.innerHTML;
}

function is_user_signed_in() {
    return new Promise(resolve => {
        chrome.storage.local.get(['token', 'userStatus', 'user_info'],
            function (response) {

                resolve(response.userStatus === undefined ?
                    { userStatus: false, user_info: {}, token: "" } :
                    {
                        userStatus: response.userStatus,
                        user_info: response.user_info,
                        token: response.token
                    }
                )
            });
    });
}



function sendQuestionToTurboGrading(data) {
    is_user_signed_in()
        .then(res => {

            const token = res.token;


            fetch('http://localhost:8080/users/exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'data': data
                })
            })
                .then(response => response.json())
                .then(data => {



                    var feedback = "";

                    console.log("DATA");
                    console.log(data);
                    data.map((obj, i) => {
                        if (obj) {
                            console.log("obj");
                            console.log(obj);

                            var inputElement = document.getElementsByClassName("d2l-input-number-wc");
                            inputElement[obj.id].setAttribute('value', obj.score);

                            inputElement[obj.id].nextElementSibling.setAttribute('value', obj.score);

                            feedback += 'Question ID: ' + obj.id + '<br>' +
                                'Explanation: ' + obj.explanation + '<br><br>';

                            console.log("Done!!!!.....");

                        }
                    });

                    var elements2 = document.querySelectorAll('.d2l-hpg-opener');
                    elements2.forEach(function (element2) {
                        element2.click();
                    });

                    var parentElement = document.querySelector('.d2l-editable');
                    if (parentElement) {
                        var firstElement = parentElement.querySelectorAll('d2l-html-block')[0];
                        firstElement.setAttribute('html', escapeHtml(feedback));
                    }

                    document.getElementById("aComment_data").value = escapeHtml(feedback);


                    // RESET THE TOTAL MARK VALUE
                    const element = document.querySelector('[title="Clear the final score and recalculate"]');

                    // Trigger a click event on the element
                    if (element) {
                        element.click();
                    }
                    //*****AUTO MODE******
                    const saveButton = document.getElementById('z_a');
                    const nextButton = document.querySelector("#d2l_form > div > d2l-navigation-immersive > d2l-navigation-iterator").shadowRoot.querySelector("d2l-navigation-button-icon:nth-child(3)").shadowRoot.querySelector("button");

                    if (saveButton) {
                       //******** PLEASE UNCOMMENT THE NEXT LINE TO MAKE THE EXTENTION SAVE THE GRADE AUTO
                        // saveButton.click();

                        // Wait for a specified amount of time (e.g., 2 seconds) before clicking the next button
                        setTimeout(() => {
                           // alert("next")
                            if (nextButton) {
                                //******** PLEASE UNCOMMENT THE NEXT LINE TO MAKE THE EXTENTION SAVE THE GRADE AUTO
                                //nextButton.click();
                            }
                        }, 3000); // 2000 milliseconds = 2 seconds
                    }



                })
            // .catch(error => console.error(error));
        })
        .catch(err => console.log(err));




}

function sendBodyToExtension() {

    console.log("Start:");

    const bodyContent = document.body.innerHTML;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = bodyContent;

    const bodyContentImages = tempElement.querySelectorAll('img');
    bodyContentImages.forEach(image => {
        image.remove();
    });
    const modifiedBodyContent = tempElement.innerHTML;

    console.log("The page has been submitted");

    sendQuestionToTurboGrading(modifiedBodyContent);

    console.log("The End");

}

function createButton(assessmentType) {

      if (assessmentType == "assignment") {
        var firstChildId = document.body.children[0].id;
        console.log(firstChildId);
        var scriptElement = document.createElement('script');
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
        if (!document.getElementById('turboGradingButton')) {

            const button = document.createElement('button');
            button.id = 'turboGradingButton';
            button.textContent = 'Run TurboGrading!';
            button.classList.add('d2l-button');

            // Append the button to your desired location
            // document.body.appendChild(button);
            button.addEventListener("click", function () {
                console.log('Button clicked');
                sendBodyToExtension();
            });
            let e = document.querySelector("div.float_r");

            if (e)
                e.appendChild(button);

        }


    }
    //  });
}

createButton("quiz");