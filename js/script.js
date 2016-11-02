class GithubInteractor {
  constructor(token) {
    this.token = token;
  }
}

function handleResponse(data) {
  var link = $('<a>').attr('href', data.issueURL).text(data.title);
  $('#issue').append(link);
  console.log(data);
}

function handleError(jqXHR, textStatus, error) {
  console.log("Post error: " + error);
}



function submitForm() {
  $('form').on('submit', (event) => {
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();

    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body) {
  // /repos/:owner/:repo/issues
  const url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/issues';
  const data = {
    title: title,
    body: body
  };
  // 
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + 'toke here');
    },
    data: JSON.stringify(data)
  }).done(function(data) {
    return handleResponse(data);
  }).fail(function(jqXHR, textStatus, error) {
      return handleError(jqXHR, textStatus, error);
  });
}


$(document).ready(function(){
  submitForm();
});
