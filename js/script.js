class GithubInteractor {
  constructor(token) {
    this.token = token;
  }
}

function submitIssue() {
  $('#issue-form').on('submit', function(event) {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function createIssue(repoName,repoOwner , title, body, token) {
  $.ajax({
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues',
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: "token " + token
    },
    data: JSON.stringify({
      title: title,
      body: body
    }),
    success: function(result) {
      return handleResponse(result);
    },
    error: function(jqXHR, textStatus, error) {
      return handleError(jqXHR, textStatus, error);
    }
  });
}

function handleResponse(response) {
  document.getElementById('issue').innerHTML = response.title;
  return JSON.stringify(response)
}

function handleError (jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}

$(document).ready(function() {
  submitIssue();
});
