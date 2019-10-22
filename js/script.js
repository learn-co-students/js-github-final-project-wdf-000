
function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  $.ajax({
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues",
    type: "POST",
    dataType: "json",
    data: JSON.stringify({
      title: issueTitle,
      body: issueBody
    }),
    headers: {
      Authorization: "token " + token
    }
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    handleError(jqXHR, textStatus, errorThrown);
  });
}

function handleResponse(response) {
  $('#issue').text(response['title'])
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log('Post error: ' + errorThrown)
}

var submitForm = function() {
  $('form').on('submit', function(event) {
    var repoName = $('#repoName').val(), repoOwner = $('#repoOwner').val(), issueTitle = $('#title').val(), issueBody = $('#body').val();
    createIssue(repoName, repoOwner, issueTitle, issueBody);
    event.preventDefault();
  });
}

$(document).ready(function() {
  submitForm()
});
