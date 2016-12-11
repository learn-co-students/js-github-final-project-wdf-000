
class GithubInteractor {
  constructor(token) {
    this.token = token
  }
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var token = "d6aceca79a52a02272844872fac8b518b3e98a01"
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

}

function handleResponse(data) {
  $('#issue').text(data.title)
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown)
}


$(document).ready(function(){
  $('form').on('submit', submitForm);
});
