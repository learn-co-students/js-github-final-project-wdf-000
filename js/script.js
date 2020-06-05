$(document).ready(function(){
  $('form').on('submit', submitForm);
});

function submitForm(ev) {
  let repoName = $('#repoName').val();
  let repoOwner = $('#repoOwner').val();
  let title = $('#title').val();
  let body = $('#body').val();
  let token = new GithubInteractor('github token goes here').token;
  
  createIssue(repoName, repoOwner, title, body, token);

  ev.preventDefault();
}

class GithubInteractor {
  constructor(token) {
    this.token = token;
  }
}

function handleResponse(issue) {
  $('#issue ul').append(`<li><a href="${issue.html_url}">${issue.title}</a></li>`);
}

function handleError(jqXHR, textStatus, errorThrown){
  console.log('Post error: ' + errorThrown);
}

function createIssue(repoName, repoOwner, title, body, token) {
  let url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
  let issueData = {
    'title': title,
    'body': body
  };

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    headers: {
      Authorization: 'token ' + token,
    },
    data: JSON.stringify(issueData),
    success: handleResponse,
    error: handleError
  });
}
