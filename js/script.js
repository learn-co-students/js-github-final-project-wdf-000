class GithubInteractor {
  constructor(token) {
    this.token = token
  }
}

function createIssue(repoName, repoOwner, issueTitle, issueBody) {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/issues";
  var data = {title: issueTitle, body: issueBody}
  var JSONdata = JSON.stringify(data);
  $.ajax({
    url: url,
    data: JSONdata,
    type: 'POST',
    success: handleResponse,
    error: handleError //response and error objects automatically passed along
  });
}

function submitForm() {
  $('form').on('submit', function(e) {
    var name = $('#repoName').val();
    var owner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(name, owner, title, body);
    e.preventDefault();
  });
}

function handleResponse(response) {
  $('#issue').append("<a href=" + response.html_url + ">" + response.title + "</a>")
}

function handleError(jqXHR, textStatus, error) { //
  console.log('Post error: ' + error)
}

$(document).ready(submitForm);
