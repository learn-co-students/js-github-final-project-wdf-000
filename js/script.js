var baseUrl = 'https://api.github.com/repos/'

function GithubInteractor(token) {
  this.token = token;
}

function createIssue(repo, owner, title, body) {
  data = {}
  data['title'] = title;
  data['body'] = body;
  $.ajax({
    url: baseUrl + owner + '/' + repo + '/issues',
    type: 'POST',
    data: JSON.stringify(data)
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(response) {
    handleError(response, response.responseText, response.statusText)
  });
}

function handleResponse(response) {
  $('#issue').append(response['title']);
}

function handleError(response, statusText, error) {
  console.log("Post error: " + error)
}
