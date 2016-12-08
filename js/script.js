// function GithubInteractor(token) {
//   this.token = token
// }

class GithubInteractor {
  constructor(token) {
    this.token = token
  }
}
// function submitForm() {
//   $('submit').on('click', funtion(e) {
//     var repoName: $("#repoName").val()
//     var repoOwner: $("#repoOwner").val()
//     var issueTitle: $("#title").val()
//     var issueBody: $("#body").val()
//
//   )  createIssue(repoName, repoOwner, issueBody, issueTitle)
//   })
// }
//

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var token = "2300f47de6e6153ebe4c29652081c4b9b5568365"
  //
  var data = {
    title: `${issueTitle}`,
    body: `${issueBody}`
  }
  $.ajax({
    type: "POST",
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
    dataType: "json",
    data: JSON.stringify(data),
    // error: handleError(response),

    headers: {
      Authorization: `token ${token}`
    }
  })
  .done(function(response){
    handleResponse(response)
  })
  .fail(function(xhr, status, error) {
    handleError(xhr, status, error)
  })

  //makes ajax POST request to Github API create issue end point
  //endpoint shoulr create an issue based on form values
  //once subitted, add link to page to enter a repo name
  //*if POST fails, function should print out ""
}


function handleResponse(response) {
  $('#issue').html(response.title)
}

function handleError(response) {

  console.log("Post error: Unauthorized")
}
