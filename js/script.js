$(document).ready(function() {
 submitClick();
});

class GithubInteractor {
  constructor(token){
    this.token = token;
  }
}
function submitClick() {
  $('form').on('submit', function(){
    submitForm(event);
  });
}

function submitForm(event) {
  let repo = $('#repoName').val();
  let owner = $('#repoOwner').val();
  let title = $('#title').val();
  let body = $('#body').val();
  
  event.preventDefault();
  createIssue(repo, owner, title, body);
};

 var key = new GithubInteractor("YOUR KEY");
function createIssue(repo, owner, title, body) {
  let urlBase = 'https://api.github.com/repos/';
  let sourceData = {
    title: title, 
    body: body
  };
  // post request to /repos/:owner/:repo/issues
  let url = urlBase + owner + '/' + repo + '/issues';
  
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(sourceData),
    headers: {
      Authorization: "token " + key.token
    },
    success: function(response) {
    handleResponse(response);
    },
    error: function(jqXHR, textStatus, error) {
      handleError(jqXHR, textStatus, error);
    }
  });
}
  function handleResponse(response) {
    let item = `<a href=${response.url}>${response.title}</a>`;
    $('#issue').append(item);
  }
  function handleError(jqXHR, textStatus, error) {
    console.log("Post error: " + error);
  } 
