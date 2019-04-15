function GithubInteractor(token) {
  this.token = token;
}

var mytoken = new GithubInteractor("token");


function createIssue(repoName, repoOwner, issueTitle, issueBody) {

  var newIssue = {
    "title": issueTitle,
    "body": issueBody
  }

  var apiUrl = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues'

  $.ajax({
    url: apiUrl,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + mytoken.token
    },
    data: JSON.stringify(newIssue)
  }).done(handleResponse).fail(handleError);
}

function handleResponse(response) {
  var issueLink = response.html_url;
  var title = response.title;
  var html = '<a href="' + issueLink + '">' + title + '<\/a>'
  $("#issue").append(html);
}

function handleError(error, textStatus, errorThrown) {
  console.log("Post error: " + errorThrown);
}

function submitForm() {
  $("form").submit(function(event) {
    event.preventDefault();
    var repoName = $("#repoName").val();
    var repoOwner = $("#repoOwner").val();
    var issueTitle = $("#title").val();
    var issueBody = $("#body").val();

    createIssue(repoName, repoOwner, issueTitle, issueBody);
  });
}

$(document).ready(function() {
  submitForm();
});
