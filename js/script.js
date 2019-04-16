function GithubInteractor(token) {
  this.token = token;
}


function createIssue(name, owner, title, body) {
  var issue = {
    'title': title,
    'body': body
  };
  $.ajax({
    url: 'https://api.github.com/repos/' + owner + '/' + name + '/issues',
    type: 'POST',
    headers: {
      Authorization: "cf77ee050679aba9e3110d91a5fd59bb93dbc4a6"
    },
    data: JSON.stringify(issue)
  }).done(function(response) {
    handleResponse(response);
  }).fail(function(error) {
    handleError(error);
  })
}

function handleResponse(response) {
  $('#issue').text(response.title);
}

function handleError(j, text, error) {
  console.log("Post error: " + error);
}

function submitForm(){
  $('form').on('submit', function(event){
    // take data below and turn into object with properties
    var repoName = $('#repoName').val();
    var repoOwner = $('#repoOwner').val();
    var title = $('#title').val();
    var body = $('#body').val();
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}
